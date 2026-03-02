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

module.exports = {
  FUNCTION_ENTRY_EXCEPTION: {
    code: 4001,
    message: 'function entry exception, error: ',
  },
  USER_FUNCTION_EXCEPTION: {
    code: 4002,
    message: 'function invocation exception, error: ',
  },
  USER_STATE_TOO_LARGE: {
    code: 4003,
    message: 'state content is too large',
  },
  USER_RETURN_VALUE_TOO_LARGE: {
    code: 4004,
    message: 'the return value of the function exceeds the maximum allowed limit',
  },
  USER_STATE_UNDEFINED: {
    code: 4005,
    message: 'init state function invocation exception, error: ',
  },
  SYSTEM_CONVERT_JSON: {
    code: 4007,
    message: 'function result is invalid, error: ',
  },
  USER_INITIALIZATION_FUNCTION_EXCEPTION: {
    code: 4009,
    message: 'function initialization exception, error: ',
  },
};
