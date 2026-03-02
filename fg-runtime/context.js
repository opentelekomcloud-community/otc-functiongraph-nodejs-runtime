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

function parseJSON(json = {}){
  let result = {};
  try {
    result = JSON.parse(json);
    return result;
  } catch (err) {
    return result;
  }
}

class Context {
  constructor(options = {}) {
    this.functionName = options.funcEnv['RUNTIME_FUNC_NAME'] || '';
    this.package = options.funcEnv['RUNTIME_PACKAGE'] || '';
    this.projectID = options.funcEnv['RUNTIME_PROJECT_ID'] || '';
    this.functionVersion = options.funcEnv['RUNTIME_FUNC_VERSION'] || '';
    this.memory = options.funcEnv['RUNTIME_MEMORY'] || '0';
    this.cpu = options.funcEnv['RUNTIME_CPU'] || '0';
    this.userData = parseJSON(options.funcEnv['RUNTIME_USERDATA']) || {};
    // The default timeout is 3000 ms.
    this.timeout = options.funcEnv['RUNTIME_TIMEOUT'] ? options.funcEnv['RUNTIME_TIMEOUT'] * 1000 : 3000;
    this.startTime = new Date().getTime();
    this.requestID = options.requestID || '';
    this.accessKey = options.accessKey || '';
    this.secretKey = options.secretKey || '';
    this.securityAccessKey = options.securityAccessKey || '';
    this.securitySecretKey = options.securitySecretKey || '';
    this.authToken = options.authToken || '';
    this.securityToken = options.securityToken || '';
    this.logger = options.logger || {};
    this.invokeID = options.invokeID;
    this.invokeProperty = null;
    this.fromTask = false;
    this.instanceID = null;
    this.state = null;
    this.traceID = options.requestID;
    this.alias = options.alias || '';
    // Workflow callback param
    this.workflowID = options.workflowID || '';
    this.workflowRunID = options.workflowRunID || '';
    this.workflowStateID = options.workflowStateID || '';
  }

  getAlias() {
    return this.alias;
  }

  getProjectID() {
    return this.projectID;
  }

  getPackage() {
    return this.package;
  }

  getFunctionName() {
    return this.functionName;
  }

  getVersion() {
    return this.functionVersion;
  }

  getMemorySize() {
    return this.memory;
  }

  getCPUNumber() {
    return this.cpu;
  }

  getRunningTimeInSeconds() {
    return this.timeout;
  }

  getUserData(key) {
    return this.userData[key];
  }

  getRequestID() {
    return this.requestID;
  }

  getRemainingTimeInMilliSeconds() {
    const now = new Date().getTime();
    return (this.timeout + this.startTime - now);
  }

  getAccessKey() {
    return this.accessKey;
  }

  getSecretKey() {
    return this.secretKey;
  }

  getSecurityAccessKey() {
    return this.securityAccessKey;
  }

  getSecuritySecretKey() {
    return this.securitySecretKey;
  }

  getWorkflowID() {
    return this.workflowID;
  }


  getWorkflowRunID() {
    return this.workflowRunID;
  }

  getWorkflowStateID() {
    return this.workflowStateID;
  }

  getToken() {
    return this.authToken;
  }

  getSecurityToken() {
    return this.securityToken;
  }

  getLogger() {
    return this.logger;
  }

}

module.exports = { Context };