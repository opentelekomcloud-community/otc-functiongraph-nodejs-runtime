Invoking FunctionGraph Functions
================================


Following pages demonstrate how to call a FunctionGraph implemented in
Node.js:

.. toctree::
   :maxdepth: 1

   API calls <invoke_api>
   curl <invoke_curl>
   From FunctionGraph <invoke_fg>


For details on function invocation, see 

* :docs_otc:`Function Invocation <function-graph/api-ref/api/function_invocation/index.html>`
  
in `FunctionGraph API reference`.

.. _ref_invoke-prerequisites:

Prerequisites
-------------

Environment Variables
^^^^^^^^^^^^^^^^^^^^^^^^^

Following environment variables need to be set:

.. list-table:: Environment Variables
   :widths: 25 25
   :header-rows: 1

   * - Name
     - Description
   * - OTC_SDK_PROJECTID
     - Project ID
   * - OTC_SDK_REGION
     - Region, e.g. "eu-de"
   * - OTC_SDK_AK 
     - Access Key (*)
   * - OTC_SDK_SK
     - Secret Key
   * - OTC_USER_NAME
     - User name (*)
   * - OTC_USER_PASSWORD
     - User password
   * - OTC_DOMAIN_NAME
     - Domain name
   * - OTC_IAM_ENDPOINT
     - IAM Endpoint, e.g. https://iam.eu-de.otc.t-systems.com/v3

(* User needs to have permission to invoke FunctionGraph)

Deployed FunctionGraph Event Function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use following settings to create the FunctionGraph event function using the FunctionGraph console:

* **Project** : as specified in the environment variable ``OTC_SDK_PROJECT_ID``
* **Region**: as specified in the environment variable ``OTC_SDK_REGION``
* **Name**: ``nodejs-sample-invoke-function``
* **Runtime**: ``Node.js 20.15``
* **Version**: ``latest``
* **Application**: ``default``

* **Function code**: Use the following sample code for the function code.

  .. literalinclude:: ../../../../samples-doc/invoke-fg/src-fg/index.js
     :language: javascript
     :caption: :github_repo_master:`samples-doc/invoke-fg/src-fg/index.js <samples-doc/invoke-fg/src-fg/index.js>`

* **Handler name**: ``index.handler``

Permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Make sure that your user has the necessary permissions to invoke the
function.