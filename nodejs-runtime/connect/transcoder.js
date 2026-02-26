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

const { Message } = require('./message'),
  headerLen = 47,
  packetIDLen = 36,
  byteLen = 1,
  uint32Len = 4;

exports.encode = function (msg) {
  let offset = 0;
  const buffer = Buffer.alloc(headerLen + msg.metadataLen + msg.payloadLen);
  buffer.writeUInt8(msg.magicNumber, offset, offset + byteLen);
  offset += byteLen;
  buffer.writeUInt8(msg.version, offset, offset + byteLen);
  offset += byteLen;
  buffer.writeUInt8(msg.packetType, offset, offset + byteLen);
  offset += byteLen;
  buffer.writeUInt32BE(msg.metadataLen, offset, offset + uint32Len);
  offset += uint32Len;
  buffer.writeUInt32BE(msg.payloadLen, offset, offset + uint32Len);

  offset += uint32Len;
  buffer.write(msg.packetID, offset, offset + packetIDLen);

  if (msg.metadataLen) {
    msg.metadata.copy(buffer, headerLen, 0, msg.metadataLen);
  }
  if (msg.payloadLen) {
    msg.payload.copy(buffer, headerLen + msg.metadataLen, 0, msg.payloadLen);
  }

  return buffer;
};

exports.decodeHeader = function (data) {
  let offset = 0;
  const magicNumber = data.readInt8(offset);
  offset += byteLen;
  const version = data.readInt8(offset);
  offset += byteLen;
  const packetType = data.readInt8(offset);
  offset += byteLen;
  const metadataLen = data.readUInt32BE(offset);
  offset += uint32Len;
  const payloadLen = data.readUInt32BE(offset);
  offset += uint32Len;
  const packetID = data.slice(offset, offset + packetIDLen).toString();

  return new Message({
    magicNumber,
    version,
    packetType,
    metadataLen,
    payloadLen,
    packetID,
  });
};
