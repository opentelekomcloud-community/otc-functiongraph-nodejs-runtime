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

module.exports.initState = function (event, context) {
  const state = { counter: 0 };
  // context.state = state
};

module.exports.handler = async (event, context) => {
  let temp = context;
  if (temp.state !== undefined && temp.state !== null) {
    if (temp.state.counter !== undefined) {
      temp.state.counter++;
      return temp.state.counter;
    }
    return "counter is not defined in the state";
  }
  return "stateless invocation, please invoke with stateKey";
};