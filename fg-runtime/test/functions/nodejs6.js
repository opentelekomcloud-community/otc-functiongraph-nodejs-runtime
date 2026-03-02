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

exports.handler = function (event, context, callback) {
    const output = {
        'statusCode': 200,
        'headers':
            {
                'Content-Type': 'application/json'
            },
        'isBase64Encoded': false,
        'body': '{"key":"value"}',
    }
    callback(output);
}

exports.fourArgsError = function (event, context, callback, errorArgs) {
    const output = "123"
    callback(output);
}

exports.initializer = function (context, callback)  {

}