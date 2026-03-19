"use strict";

/***************************************************************
 * Deployed as a function in FunctionGraph,
 *  - Function type: event-function from scratch
 *  - Name: getNodeJSRuntimeInfo
 *  - Runtime: nodejs20.15
 *  - Project: OTC_SDK_PROJECT_ID
 *  - Region: OTC_SDK_REGION
 ***************************************************************/
const fs = require("fs");
const path = require("path");

function readPackageMetadata(packageDir) {
  const packageJsonPath = path.join(packageDir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const repository = packageJson.repository;
  const repositoryUrl =
    typeof repository === "string" ? repository : repository && repository.url;

  return {
    name: packageJson.name,
    version: packageJson.version,
    license: packageJson.license,
    "repository.url": repositoryUrl,
    homepage: packageJson.homepage,
  };
}

function extractNodeModulesPackageMetadata(
  nodeModulesPath = path.join(process.cwd(), "node_modules"),
) {
  if (!fs.existsSync(nodeModulesPath)) {
    throw new Error(`node_modules directory not found: ${nodeModulesPath}`);
  }

  const packageMetadata = [];
  const entries = fs.readdirSync(nodeModulesPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const entryPath = path.join(nodeModulesPath, entry.name);

    const metadata = readPackageMetadata(entryPath);
    if (metadata) {
      packageMetadata.push(metadata);
    }
  }

  return packageMetadata;
}

function getRuntimes() {
  const runtimesPath = "/opt/function/runtime";
  if (!fs.existsSync(runtimesPath)) {
    throw new Error(`Runtimes directory not found: ${runtimesPath}`);
  }

  const runtimes = [];
  const entries = fs.readdirSync(runtimesPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.startsWith("nodejs")) {
      runtimes.push(entry.name);
    }
    
  }

  return runtimes;
}

exports.handler = async (event, context) => {
  const runtime = event.runtime;

  // "/home/snuser/runtime/node_modules"

  let ret = [];

  if (!runtime) {
    // get available runtimes
    ret = getRuntimes();
  } else {
    // get library information for the specified runtime
    ret = extractNodeModulesPackageMetadata(
      `/opt/function/runtime/${runtime}/rtsp/nodejs/node_modules`,
    );
  }

  return JSON.stringify(ret);
};
