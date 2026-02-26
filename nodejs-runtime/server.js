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

const TinyServer = require('./connect/server.js'),
  RPCMessage = require('./pb/rpc_pb.js'),
  { logger } = require('./connect/message'),

  messageType = {
    undefinedType: 0,
    invokeRequestType: 1,
    invokeResponseType: 2,
    loadRequestType: 3,
    loadResponseType: 4,
    healthRequestType: 5,
    healthResponseType: 6,
    callRequestType: 7,
    callResponseType: 8,
    functionLogType: 9,
    metricsType: 10,
    initializerRequestType: 13,
    initializerResponseType: 14,
  };

class MetaData{
  constructor(msgType) {
    this.messageType = msgType;
  }

  serializeBinary(){
    const buf = Buffer.alloc(1);
    buf[0] = this.messageType;
    return buf;
  }

  deserializeBinary(buf){
    return buf[0];
  }
}

class Handler {

  constructor(service, conn) {
    this.service = service
    this.conn = conn
  }

  handleHealthRequest(callback) {
    try {
      this.service.checkHeath((healthResponse) => {
        const response = healthResponse.serializeBinary();
        callback(null, null, response);
      });
    } catch (e) {
      callback(e.message);
    }
  }

  handleLoadRequest(request, callback) {
    logger.debug('start load request');
    try {
      this.conn.load();
      const loadRequest = new RPCMessage.LoadRequest.deserializeBinary(request);
      this.service.loadFunction((loadResponse) => {
        const response = loadResponse.serializeBinary();
        callback(null, null, response);
      }, loadRequest);
    } catch (e) {
      callback(e.message);
    }
    logger.debug('finish load request');
  }

  handleInitializerRequest(request, callback) {
    try {
      this.service.initializeFunction((initializerResponse) => {
        const response = initializerResponse.serializeBinary();
        callback(null, null, response);
      }, new RPCMessage.InitializerRequest.deserializeBinary(request));
    } catch (e) {
      callback(e.message);
    }
  }

  handleInvokeRequest(request, callback) {
    logger.debug('start invoke request');
    try {
      const invokeRequest = new RPCMessage.InvokeRequest.deserializeBinary(request);
      this.service.processInvoke((invokeResponse) => {
        const response = invokeResponse.serializeBinary();
        callback(null, null, response);
      }, invokeRequest);
    } catch (e) {
      callback(e.message);
    }
    logger.debug('finish invoke request');
  }

  handleRequest (callback, meta, request) {
    const type = new MetaData().deserializeBinary(meta);
    switch (type) {
      case messageType.healthRequestType: {
        this.handleHealthRequest(callback);
        break;
      }
      case messageType.loadRequestType: {
        this.handleLoadRequest(request, callback);
        break;
      }
      case messageType.initializerRequestType: {
        this.handleInitializerRequest(request, callback);
        break;
      }
      case messageType.invokeRequestType: {
        this.handleInvokeRequest(request, callback);
        break;
      }
      default: {
        logger.warn('unknown request message type {}', type);
      }
    }
  }
}

class RPCServer {
  constructor() {
    this.service = {
      checkHeath: null,
      loadFunction: null,
      initializeFunction: null,
      processInvoke: null,
    };
    this.port = null;
    this.host = null;
    this.conn = null;
  }

  addService (service) {
    this.service.checkHeath = service.checkHeath;
    this.service.loadFunction = service.loadFunction;
    this.service.initializeFunction = service.initializeFunction;
    this.service.processInvoke = service.processInvoke;
    return this;
  }

  bind(host, port){
    this.port = port;
    this.host = host;
    return this;
  }

  start () {
    this.conn = new TinyServer();
    this.conn.addHandler(new Handler(this.service, this.conn));
    this.conn.start(this.host, this.port);
    this.conn.listenExitEvent();
  }

  // "callback(error:str, callResponse:CallResponse)"
  processCall (callback, callRequest) {
    let request = null;
    const callMeta = new MetaData(messageType.callRequestType).serializeBinary();
    try {
      request = callRequest.serializeBinary();
    } catch (e) {
      callback(e.message, null);
      return;
    }

    this.conn.send((error, meta, response) => {
      if (error) {
        logger.error(`failed to send the request, error: ${error}`);
        callback(error, null);
        return;
      }
      try {
        const callResponse = new RPCMessage.CallResponse.deserializeBinary(response);
        callback(null, callResponse);
      } catch (e) {
        logger.error(`failed to deserialize the call response, error: ${e.message}`);
        callback(e.message, null);
      }
    }, callMeta, request);
  }

  processLog (functionLog) {
    try {
      const message = functionLog.serializeBinary(),
        logMeta = new MetaData(messageType.functionLogType).serializeBinary();
      this.conn.send(null, logMeta, message);
    } catch (e) {
      logger.warn(`failed to serialize the function log, error: ${e.message}`);
    }
  }
}

module.exports = {
  RPCServer,
  Handler,
};