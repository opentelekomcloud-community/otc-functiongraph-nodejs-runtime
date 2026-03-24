"use strict";

/*******************************************************************
 * Copyright 2026 T-Systems International GmbH
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ********************************************************************
 *
 * Filename: getPublicFGDependencies.js
 * 
 * Description: This script retrieves the list of public functiongraph dependencies
 * using Node.js built-in fetch API.
 *
 * Following environment variables are required for this script:
 * - OTC_SDK_REGION: The region where your FunctionGraph service is hosted (default is "eu-de").
 * - OTC_SDK_PROJECT_ID: Your 'T Cloud Public' project ID.
 * - OTC_SDK_AK: Your 'T Cloud Public' Access Key.
 * - OTC_SDK_SK: Your 'T Cloud Public' Secret Key.
 *
 * see: https://docs.otc.t-systems.com/function-graph/api-ref/api/dependencies/querying_dependencies.html
 *******************************************************************/

const { URL, URLSearchParams } = require("url");
const { Signer, HttpRequest } = require("otc-api-sign-sdk-nodejs");

const region = process.env.OTC_SDK_REGION || "eu-de";

const fgEndpoint = `https://functiongraph.${region}.otc.t-systems.com`;
const projectId = process.env.OTC_SDK_PROJECT_ID;
const ak = process.env.OTC_SDK_AK;
const sk = process.env.OTC_SDK_SK;

async function getDependencies(marker, maxItems) {
  const invokeURI = `${fgEndpoint}/v2/${projectId}/fgs/dependencies`;

  const body = {};
  const method = "GET";

  const headers = {
    "Content-Type": "application/json;charset=utf8",
    "X-Project-Id": projectId,
  };

  let invokeURIwithQuery = invokeURI;
  if (marker !== undefined && maxItems !== undefined) {
    const url = new URL(invokeURI);
    url.search = new URLSearchParams({
      marker: marker,
      maxitems: maxItems,
    }).toString();
    invokeURIwithQuery = url.toString();
  }

  const request = new HttpRequest(
    method,
    invokeURIwithQuery,
    headers,
    JSON.stringify(body),
  );

  // Sign the request using ak and sk
  const signer = new Signer();
  signer.Key = ak;
  signer.Secret = sk;

  const signedRequest = signer.Sign(request);

  const response = await fetch(invokeURIwithQuery, {
    method: signedRequest.method || method,
    headers: signedRequest.headers || headers,
  });

  return response.text();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  let data;
  try {
    let marker = 0;
    let maxItems = 100;
    let count = 0;

    const tableData = [];

    do {
      data = await getDependencies(marker, maxItems);
      const result = JSON.parse(data);

      marker = result.next_marker;
      count = result.count;

      for (const dep of result.dependencies) {
        if (
          dep.runtime.toLowerCase().startsWith("node") &&
          dep.owner.toLowerCase() === "public"
        ) {
          tableData.push({
            Runtime: dep.runtime,
            Name: dep.name,
            Version: dep.version,
            Link: dep.link,
          });
        }
      }

      // Sleep for a short time before the next request to avoid hitting rate limits
      await sleep(500);
    } while (marker !== count);

    console.table(tableData);
  } catch (error) {
    console.log("data: ", data);
    console.error("Error getting dependencies: ", error);
  }
}

main();
