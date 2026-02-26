// ####################################################################
// This sample code demonstrates how to upload a file to an OBS bucket
// using the esdk-obs-nodejs SDK.
//
// This sample parses the destination bucket name
// from the Terraform output.
//
// Before running the code, make sure to set the following
// environment variables with your OTC account credentials:
// - OTC_SDK_AK: Your Access Key ID
// - OTC_SDK_SK: Your Secret Access Key
//
// You can run the code using the following command:
// node upload.js <path_to_terraform_folder> <terraform_output_variable_name> <path_to_file_to_upload>
//
// For example:
// node upload.js ./terraform INPUT_BUCKET ./resources/otc.jpg
//
// Note: The path to the Terraform folder should contain the Terraform
// configuration that creates the OBS bucket and outputs its
// name as INPUT_BUCKET.
// ####################################################################

// Set proxy for all requests using global-agent
const globalAgent = require("global-agent");
if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
  process.env.GLOBAL_AGENT_HTTP_PROXY =
    process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "";
}
process.env.GLOBAL_AGENT_FORCE_GLOBAL_AGENT = "true";
globalAgent.bootstrap();

const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const execFileAsync = promisify(execFile);

// parse terraform output for tf_output_name
async function getTerraformOutput(tfFolder, tf_output_name) {
  const { stdout } = await execFileAsync("terraform", [
    "-chdir=" + tfFolder,
    "output",
    "-raw",
    tf_output_name,
  ]);

  return stdout.trim();
}

// Upload a file to the specified bucket with the specified key.
const ObsClient = require("esdk-obs-nodejs");
const path = require("node:path");

// Create an instance of ObsClient.
const obsClient = new ObsClient({
  access_key_id: process.env.OTC_SDK_AK,
  secret_access_key: process.env.OTC_SDK_SK,
  server: "https://obs.otc.t-systems.com",
});

async function putObject(bucket_name, local_file, key) {
  try {
    const params = {
      // Specify the bucket name.
      Bucket: bucket_name,
      // Specify the object.
      Key: key,
      // local_file indicates the path of the local file to be uploaded,
      // which must include the file name.
      SourceFile: local_file,
    };
    // Upload the file.
    const result = await obsClient.putObject(params);
    if (result.CommonMsg.Status <= 300) {
      console.log("Put bucket (%s), file (%s) successful!", params.Bucket, key);
      console.log("RequestId: %s", result.CommonMsg.RequestId);
      return;
    }
    console.log(
      "An ObsError was found, which means your request sent to OBS was rejected with an error response.",
    );
    console.log("Status: %d", result.CommonMsg.Status);
    console.log("Code: %s", result.CommonMsg.Code);
    console.log("Message: %s", result.CommonMsg.Message);
    console.log("RequestId: %s", result.CommonMsg.RequestId);
  } catch (error) {
    console.log(
      "An Exception was found, which means the client encountered an internal problem when attempting to communicate with OBS, for example, the client was unable to access the network.",
    );
    console.log(error);
  }
}

// arg1: folder of terraform 
let tfFolder= process.argv[2];  

// arg2: name of output variable in terraform
let TF_OUTPUT_BUCKET_NAME= process.argv[3];  

// arg3: path of file to upload
let filePath = process.argv[4];

if (!filePath) {
  console.error("Please provide the path to the file to be uploaded.");
  process.exit(1);
}

let bucket = getTerraformOutput(tfFolder, TF_OUTPUT_BUCKET_NAME);

bucket
  .then((bucketName) => {
    console.log("Bucket name: %s", bucketName);
    putObject(
      bucketName,
      filePath,
      // "otc_upload_" + new Date().getTime() + ".jpg",
      path.basename(filePath),
    );
  })
  .catch((error) => {
    console.error("Error getting bucket name from Terraform:", error);
  });
