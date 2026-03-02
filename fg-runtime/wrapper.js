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

const Server = require('./server.js'),
  rpcMessage = require('./pb/rpc_pb.js'),
  { logger } = require('./connect/message'),
  { loadFunction, processInvoke, initializeFunction, initRuntimeHandler } = require('./runtimeHandler'),
  NUMBER_SLICE = 2,
  // args is ['node', '.../wrapper.js', 'listenAddress']
  args = process.argv.slice(NUMBER_SLICE),
  address = args[0].split(':');

let rpcServer = null;

function checkHealth(callback) {
  const res = new rpcMessage.HealthResponse();
  res.setStatus('OK');
  callback(res);
}

function start(host, port) {
  rpcServer = new Server.RPCServer();
  rpcServer.addService({
    checkHeath: checkHealth,
    loadFunction: loadFunction,
    processInvoke: processInvoke,
    initializeFunction: initializeFunction,
  });

  rpcServer.bind(host, port);
  rpcServer.start();
  logger.info('the rpc server had been started');
  initRuntimeHandler(rpcServer);
}

logger.info('warm start nodejs runtime');
// Address may be 'ip:port' or 'port'
if (address.length > 1) {
  // '1' is site of port in address
  start(address[0], address[1]);
} else {
  start('127.0.0.1', address[0]);
}
