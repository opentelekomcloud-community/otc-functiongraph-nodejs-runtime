module.exports = {
  setupFiles: ["./test/setEnvVars.js"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.config.js",
    "!**/node_modules/**",
    "!**/test/**",
    "!**/coverage/**",
  ],
  globals: {
    NODE_ENV: "test",
  },
  moduleDirectories: ["node_modules"],
  rootDir: process.cwd(),
  testPathIgnorePatterns: ["/node_modules/", "/dist"],
  testRegex: "test/.*\\.test\\.js$",
  testEnvironment: "jsdom",
};
