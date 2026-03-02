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

const Server = require('../server.js');
const TinyServer = require('../connect/server.js');
const { Handler } = require("../server");
const rpcMessage = require('../pb/rpc_pb.js');

const mockExitRuntime = jest.fn();
const mockAddHandler = jest.fn();
const mockStart = jest.fn();
const mockListenExitEvent = jest.fn();
const mockSend = jest.fn();
const mockLoad = jest.fn();
jest.mock('../connect/server', () => {
  return jest.fn().mockImplementation(() => {
    return {
      exitRuntime: mockExitRuntime,
      addHandler: mockAddHandler,
      start: mockStart,
      listenExitEvent: mockListenExitEvent,
      send: mockSend,
      load: mockLoad
    };
  });
});

beforeEach(() => {
    TinyServer.mockClear();
    mockExitRuntime.mockClear();
    mockAddHandler.mockClear();
    mockStart.mockClear();
    mockListenExitEvent.mockClear();
    mockSend.mockClear();
    mockLoad.mockClear();
});

function checkHealth(callback) {
    callback('OK');
}

test('new and start rpcServer', () => {
    const rpcServer = new Server.RPCServer();
    expect(rpcServer).toBeTruthy();
    rpcServer.addService({
        checkHeath: checkHealth,
    });
    rpcServer.bind('127.0.0.1', '8081');
    rpcServer.start();
    rpcServer.processCall((err) => {
        if (err !== null) { return err}}, '');
    expect(TinyServer).toHaveBeenCalledTimes(1);
});

class TestService {
    checkHeath(){}
    loadFunction(callback, request){
        callback(new rpcMessage.LoadResponse())
    }
    initializeFunction(callback, request){
        callback(new rpcMessage.InitializerResponse())
    }
    processInvoke(callback, request){
        callback(new rpcMessage.InvokeResponse())
    }
}

test('test handle load Request', () => {
    const tinyServer = new TinyServer();
    const service = new TestService()
    const handler = new Handler(service, tinyServer)
    const metadata = Buffer.from([3])
    const loadRequest = new rpcMessage.LoadRequest().serializeBinary();
    const expectResponse = new rpcMessage.LoadResponse().serializeBinary()
    handler.handleRequest((err, metadata, response) => {
        expect(response).toStrictEqual(expectResponse);
    }, metadata, loadRequest)
    expect(mockLoad).toHaveBeenCalledTimes(1);
});

test('test handle invoke Request', () => {
    const tinyServer = new TinyServer();
    const service = new TestService()
    const handler = new Handler(service, tinyServer)
    const metadata = Buffer.from([1])
    const invokeRequest = new rpcMessage.InvokeRequest().serializeBinary();
    const expectResponse = new rpcMessage.InvokeResponse().serializeBinary()
    handler.handleRequest((err, metadata, response) => {
        expect(response).toStrictEqual(expectResponse);
    }, metadata, invokeRequest)
});

test('test handle Initializer Request', () => {
    const tinyServer = new TinyServer();
    const service = new TestService()
    const handler = new Handler(service, tinyServer)
    const metadata = Buffer.from([13])
    const initializerRequest = new rpcMessage.InitializerRequest().serializeBinary();
    const expectResponse = new rpcMessage.InitializerResponse().serializeBinary()
    handler.handleRequest((err, metadata, response) => {
        expect(response).toStrictEqual(expectResponse);
    }, metadata, initializerRequest)
});