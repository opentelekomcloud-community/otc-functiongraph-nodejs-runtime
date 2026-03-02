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

const childProcess = require('child_process');

childProcess.execSync('mkdir -p /home/snuser/log');
childProcess.execSync('mkdir -p /home/snuser/config');
childProcess.execSync('cp ../../build/Dockerfile/nodejs-runtime-log.json /home/snuser/config/');

module.exports = {
  setupFiles: ['./test/setEnvVars.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.config.js',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/coverage/**',
    '!**/pb/**',
  ],
  globals: {
    NODE_ENV: 'test',
  },
  moduleDirectories: [
    'node_modules',
  ],
  rootDir: process.cwd(),
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: 'test/.*\\.test\\.js$',
};