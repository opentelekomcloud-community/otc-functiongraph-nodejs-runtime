/*
 * Copyright (c) 2021 Huawei Technologies Co., Ltd
 *
 * This software is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 * http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

const net = require('net'),
  transcoder = require('./transcoder'),
  { Message } = require('./message'),
  { logger } = require('./message'),
  uuid = require('uuid'),

  headerLength = 47,

  defaultMagicNumber = 0x01,
  defaultVersion = 0x01,

  requestType = 0,
  responseType = 1,
  errorType = 2,
  postType = 3,

  namespace = '00000000-0000-0000-0000-000000000000',
  nodeVersion = process.env.NODE_VERSION || '10';

class CallMsg {
  constructor(options = {}) {
    this.message = options.message;
    this.callback = options.callback;
  }
}

class ChunkMsg {
  constructor() {
    this.isFinished = true;
    this.header = null;
    this.bodyLength = Number.MAX_SAFE_INTEGER;
  }

  reset() {
    this.isFinished = true;
    this.header = null;
    this.bodyLength = Number.MAX_SAFE_INTEGER;
    return this;
  }
}

let overageBuffer = null;
const callMsgMap = new Map(),
  chunkMsg = new ChunkMsg();

// TinyServer a tiny server based on socket
class TinyServer {
  constructor() {
    this.handler = null;
    this.socket = null;
    this.server = null;
    this.loaded = false;
  }

  load() {
    this.loaded = true;
    return this;
  }

  dealHeader(msg) {
    const header = msg;
    switch (header.packetType) {
      case requestType: {
        const that = this;
        this.handler.handleRequest((err, metadata, payload) => {
          let response = '';
          if (err) {
            header.packetType = errorType;
            response = Buffer.from(err);
          } else {
            header.packetType = responseType;
            response = Buffer.from(payload);
          }
          header.payload = response;
          header.payloadLen = response.length;
          that.socket.write(transcoder.encode(header));
        }, header.metadata, header.payload);
        break;
      }
      case responseType: {
        const callMsg = callMsgMap.get(header.packetID);
        callMsgMap.delete(header.packetID);
        callMsg.callback(null, header.metadata, header.payload);
        break;
      }
      default: {
        logger.warn('unknown packetType:', header.packetType);
        break;
      }
    }
  }

  dealMsg(msg) {
    let data = msg;
    if (overageBuffer) {
      data = Buffer.concat([overageBuffer, msg]);
    }
    while (data.length > headerLength) {
      if (chunkMsg.isFinished) {
        chunkMsg.header = transcoder.decodeHeader(data);
        chunkMsg.bodyLength =
          headerLength + chunkMsg.header.payloadLen + chunkMsg.header.metadataLen;
        chunkMsg.isFinished = false;
      }
      if (data.length < chunkMsg.bodyLength) {
        break;
      }
      chunkMsg.header.metadata =
        data.slice(headerLength, headerLength + chunkMsg.header.metadataLen);
      chunkMsg.header.payload =
        data.slice(headerLength + chunkMsg.header.metadataLen, chunkMsg.bodyLength);
      // delete decoded data
      data = data.slice(chunkMsg.bodyLength);
      // async call dealHeader method
      this.dealHeader(chunkMsg.header);
      chunkMsg.reset();
    }
    overageBuffer = data;
  }

  receiveMsg(socket) {
    socket.setNoDelay(true);
    // create socket server
    logger.info('rpc client connected to the server successfully');
    this.socket = socket;
    // receive data
    this.socket.on('data', (data) => this.dealMsg(data));
    // error data event
    this.socket.on('error', (exception) => {
      logger.warn('socket received error:', exception);
      socket.end();
    });
    // client closed event
    const that = this;
    this.socket.on('close', () => {
      logger.warn('client closed!');
      that.exitRuntime();
    });
  }

  /**
   * add a handler
   * @param handler
   */
  addHandler(handler) {
    this.handler = handler;
    return this;
  }

  start(host, listenPort) {
    this.server = net.createServer((socket) => this.receiveMsg(socket)).listen({
      port: listenPort,
      host: host,
    });
    // socket server listening event
    this.server.on('listening', () => {
      logger.info('the server started listening');
    });
    // socket server error
    this.server.on('error', (exception) => {
      logger.warn('the server received error:', exception);
    });
  }

  listenExitEvent() {
    process.once('SIGINT', this.exit.bind(this, 'SIGINT'));
    process.once('SIGQUIT', this.exit.bind(this, 'SIGQUIT'));
    process.once('SIGTERM', this.exit.bind(this, 'SIGTERM'));
  }

  exit(signal) {
    logger.warn(`runtime received exit signal: ${signal},closing now...`);
    if (this.loaded) {
      return;
    }
    this.exitRuntime();
  }

  /**
   * exit runtime
   */
  exitRuntime() {
    this.server.keepAliveTimeout = 1;
    this.server.close(() => {
      logger.warn('runtime exit now.');
      process.exit(0);
    });
  }

  /**
   * socket server send message to client
   * @param callback callback function
   * @param metadata body metadata
   * @param payload body payload
   */
  send(callback, metadata, payload) {
    let genUUID = 'default';
    if (nodeVersion === '6') {
      const name = Math.random().toString();
      genUUID = uuid.v3(name, namespace);
    } else {
      genUUID = uuid.v4();
    }
    const response = Buffer.from(payload),
      msg = new Message({
        magicNumber: defaultMagicNumber,
        version: defaultVersion,
        metadataLen: metadata.length,
        payloadLen: response.length,
        packetID: genUUID,
        metadata: metadata,
        payload: response,
      });
    if (callback) {
      msg.packetType = requestType;
      const callMsg = new CallMsg({
        message: msg,
        callback: callback,
      });
      callMsgMap.set(msg.packetID, callMsg);
    } else {
      msg.packetType = postType;
    }
    this.socket.write(transcoder.encode(msg));
  }
}

module.exports = TinyServer;