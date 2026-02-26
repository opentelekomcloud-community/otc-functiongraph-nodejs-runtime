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

const TinyServer = require('../../connect/server.js');
const net = require('net');
const {Handler} = require("../../server");

test('new and invoke TinyServer', () => {
    const tinyServer = new TinyServer();
    tinyServer.load();
    const buf = Buffer.from([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,
        3,4,5,6,7,8,9,0]);
    const msg = {
        packetType: 0,
        metadata : buf,
        payload : '1',
        metadataLen : 50,
        packetID : '2',
    };
    tinyServer.socket = new net.Socket();
    tinyServer.addHandler(new Handler());
    tinyServer.dealMsg(buf);
    tinyServer.listenExitEvent();
    tinyServer.receiveMsg(new net.Socket());
    tinyServer.exit(1);
    tinyServer.start('127.0.0.1', '8081');
    expect(tinyServer.loaded).toBe(true);
});

test('invoke TinyServer with no socket', () => {
    const tinyServer = new TinyServer();
    tinyServer.addHandler(new Handler());
    expect(() => {
        tinyServer.send({},'','2');
    }).toThrow();
    const buf = Buffer.from([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,
        3,4,5,6,7,8,9,0]);
    const msg = {
        packetType: 0,
        metadata : buf,
        payload : '1',
        metadataLen : 50,
        packetID : '2',
    };
    expect(() => {
        tinyServer.dealHeader(msg);
    }).toThrow();
    msg.packetType = 1
    expect(() => {
        tinyServer.dealHeader(msg);
    }).toThrow();
});

test('new and invoke TinyServer by nodejs6', () => {
    process.env.NODE_VERSION = '6';
    const tinyServer = new TinyServer();
    tinyServer.load();
    const buf = Buffer.from([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,
        3,4,5,6,7,8,9,0]);
    const msg = {
        packetType: 0,
        metadata : buf,
        payload : '1',
        metadataLen : 50,
        packetID : '2',
    };
    tinyServer.socket = new net.Socket();
    tinyServer.addHandler(new Handler());
    tinyServer.dealMsg(buf);
    tinyServer.listenExitEvent();
    tinyServer.receiveMsg(new net.Socket());
    tinyServer.exit(0);
    tinyServer.start('127.0.0.1', '8081');
    expect(tinyServer.loaded).toBe(true);
});

test('new and health TinyServer', () => {
    const tinyServer = new TinyServer();
    const buf = Buffer.from([5,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,
        3,4,5,6,7,8,9,0]);
    const msg = {
        packetType: 0,
        metadata : buf,
        payload : '1',
        metadataLen : 50,
        packetID : '2',
    };
    tinyServer.socket = new net.Socket();
    tinyServer.addHandler(new Handler());
    tinyServer.dealMsg(buf);
    tinyServer.listenExitEvent();
    tinyServer.receiveMsg(new net.Socket());
    tinyServer.start('127.0.0.1', '8081');
    expect(tinyServer.loaded).toBe(false);
});

test('unknown packetType', () => {
    const tinyServer = new TinyServer();
    tinyServer.load();
    const buf = Buffer.from([0]);
    const msg = {packetType: -1, metadata : buf, payload : '1', metadataLen : 1, packetID : '2'};
    tinyServer.dealHeader(msg)
    expect(tinyServer.loaded).toBe(true);
});

test('test exit', () => {
    const mockExit = jest.spyOn(process, 'exit')
        .mockImplementation((number) => { throw new Error('process.exit: ' + number); });
    const tinyServer = new TinyServer();
    expect(() => {
        tinyServer.exit();
    }).toThrow();
    mockExit.mockRestore();
});