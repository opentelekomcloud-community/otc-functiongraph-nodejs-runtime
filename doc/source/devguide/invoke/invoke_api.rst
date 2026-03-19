Invoking FunctionGraph Event Function using API Calls
======================================================

Prerequisites
-----------------

Following samples assumes that you

* used environment variables are set:

  - ``OTC_SDK_REGION``
  - ``OTC_SDK_PROJECT_ID``

* and have the necessary permissions to invoke the function.
* created a FunctionGraph event function as described in the following section.


Use following settings to create the FunctionGraph event function:

* **Project** : as specified in the environment variable ``OTC_SDK_PROJECT_ID``
* **Region**: as specified in the environment variable ``OTC_SDK_REGION``
* **Name**: ``api-invoke-function``
* **Runtime**: ``Node.js 20.15``
* **Version**: ``latest``
* **Application**: ``default``

* **Function code**: Use the following sample code for the function code.

  .. literalinclude:: ../../../../samples-doc/invoke-fg/src-fg/index.js
     :language: javascript
     :caption: index.js

* **Handler name**: ``index.handler``




Using AK/SK authentication for API calls
-----------------------------------------

Using AK/SK authentication the
requests have to be signed with the AK/SK (or for temporal credentials with SecurityAccessKey/SecurityKey/SecurityToken).


For request signing the :github_otc_community:`otc-api-sign-sdk-nodejs <otc-api-sign-sdk-nodejs>` can be used.

The SDK provides a method to sign the request with AK/SK or SecurityAccessKey/SecurityKey/SecurityToken.


Additional to the environment variables mentioned in the prerequisites,
you also need to set the following environment variables
for AK/SK authentication:

  - OTC_SDK_AK
  - OTC_SDK_SK

Synchronous invocation using AK/SK
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Following sample code demonstrates how to invoke a FunctionGraph event function synchronously using API calls with AK/SK authentication.

See :otc_fg_api:`Executing a Function Synchronously <api/function_invocation/executing_a_function_synchronously.html#functiongraph-06-0125>`
in FunctionGraph API reference for more details about synchronous invocation.

.. literalinclude:: ../../../../samples-doc/invoke-fg/src/invokeSync_AKSK.js
   :language: javascript
   :caption: Synchronous invocation using AK/SK
   :tab-width: 2

To execute the sample code, run the following command in the terminal
in folder ``samples-doc/invoke-fg``:

.. code-block:: bash

   node src/invokeSync_AKSK.js

   # or use npm script:
   npm run invokeSync_AKSK


.. code-block:: bash
   :caption: Sample output of synchronous invocation using AK/SK

   Result:  {"statusCode":200,"headers":{"Content-Type":"application/json"},"isBase64Encoded":false,"body":"{\"key\":\"Hello World\"}"}
   Log:  2026-03-17T10:13:22Z Start invoke request '960d089c-c812-4fe7-9997-a72f773e4bcb', version: latest
   2026-03-17T10:13:22Z 960d089c-c812-4fe7-9997-a72f773e4bcb INFO Function name: api-invoke-function
   2026-03-17T10:13:22Z 960d089c-c812-4fe7-9997-a72f773e4bcb INFO Key value from event: Hello World
   2026-03-17T10:13:22Z Finish invoke request '960d089c-c812-4fe7-9997-a72f773e4bcb', duration: 2.049ms, billing duration: 3ms, memory used: 36.535MB, billing memory: 128MB, cpu used: 0.300U, storage used: 0.039MB


Asynchronous invocation using AK/SK
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Following sample code demonstrates how to invoke a FunctionGraph event function asynchronously using API calls with AK/SK authentication.

See :otc_fg_api:`Executing a Function Asynchronously <api/function_invocation/executing_a_function_asynchronously.html#functiongraph-06-0126>`
in FunctionGraph API reference for more details about asynchronous invocation.

.. literalinclude:: ../../../../samples-doc/invoke-fg/src/invokeASync_AKSK.js
   :language: javascript
   :caption: Asynchronous invocation using AK/SK
   :tab-width: 2

To execute the sample code, run the following command in the terminal
in folder ``samples-doc/invoke-fg``:

.. code-block:: bash

   node src/invokeASync_AKSK.js

   # or use npm script:
   npm run invokeASync_AKSK


.. code-block:: bash
   :caption: Sample output of asynchronous invocation using AK/SK

   Response:  {"request_id": "3d1a4f5a-b4e2-4429-80c8-3d82d2fe8791"}



