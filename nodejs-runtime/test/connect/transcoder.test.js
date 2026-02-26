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

const { Message } = require('../../connect/message');
const transcoder = require('../../connect/transcoder');

const defaultMagicNumber = 0x01;
const defaultVersion = 0x01;

test('test encode and decodeHeader', () => {
    const metadata = Buffer.alloc(1);
    metadata[0] = 1;
    const response = "";
    const msg = new Message({
        magicNumber: defaultMagicNumber,
        version: defaultVersion,
        metadataLen: metadata.length,
        payloadLen: response.length,
        packetID: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
        metadata: metadata,
        payload: response,
        packetType : 1,
    });
    const encodeData = transcoder.encode(msg);
    const expectHeader = new Message({
        magicNumber: msg.magicNumber,
        version: msg.version,
        packetType: msg.packetType,
        metadataLen: msg.metadataLen,
        payloadLen: msg.payloadLen,
        packetID: msg.packetID,
    });
    const actualHeader = transcoder.decodeHeader(encodeData);
    expect(actualHeader).toStrictEqual(expectHeader);
});