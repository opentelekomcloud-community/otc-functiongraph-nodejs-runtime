.. _devguide_http_function_scratch_index:

Building FunctionGraph HTTP Functions with Node.js from scratch
==========================================================================

.. toctree::
   :hidden:

   Project <project>


Following chapter describes in short how to build FunctionGraph HTTP functions
using Node.js from scratch.

Introduction
------------

For general details about creating HTTP functions from scratch and
executing an HTTP function,
see :otc_docs:`Creating a Function from Scratch and Executing the Function <function-graph/umn/creating_a_function/creating_a_function_from_scratch/creating_an_http_function.html#functiongraph-01-1442>`
in the user manual.

Function Development Overview
------------------------------

See also :ref:`General Constraints for HTTP Functions <general_constraints_http>`

Step 1: Create a function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In FunctionGraph console, create a function with the following parameters:

- **Create with**: Create from scratch
- **Function Type**: HTTP Function
- **Region**: select the region where you want to create the function 
- **Function Name**: http-function-scratch

leave the other parameters with default values, and click **Create Function** to create the function.

Step 2: Write code for the function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For HTTP functions, the code is expected to listen for HTTP requests and send responses.
You can use any Node.js web framework or library to implement the function code.

The following is a sample code using Node.js built-in HTTP module.

In the code editor, replace the default code for file `index.js` with the following
code, and click **Deploy** to save the code.


.. code-block:: javascript
   :caption: index.js 

    const http = require('http'); // Import Node.js core module

    var server = http.createServer(function (req, res) {   //create web server
      if (req.url.startsWith("/apig-event-template")) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><h2>This is http function.</h2></body></html>');
        res.end();
      } else {
        res.end('Invalid Request!');
      }
    });

    server.listen(8000, '127.0.0.1'); // listen for any incoming requests on port 8000

    console.log('Node.js web server at port 8000 is running..')

Step 3: Configure the bootstrap file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A file named `bootstrap` is used to start the function runtime and execute the function code.

The following is the code to be added in the `bootstrap` file for Node.js runtime.
It starts the Node.js runtime and executes the `index.js` file.


.. code-block:: bash
   :caption: bootstrap

   /opt/function/runtime/[NODEJS_RUNTIME]/rtsp/nodejs/bin/node $RUNTIME_CODE_ROOT/[FUNCTION_FILENAME]

where

* **[NODEJS_RUNTIME]** is the Node.js runtime to use (see :ref:`Supported Node.js Runtimes <SupportedNodeJSRuntimes>`).
* **$RUNTIME_CODE_ROOT** is the environment variable that points to the root directory of your function code
  (/opt/function/code).
* **[FUNCTION_FILENAME]** is the name of the file that contains your function code (e.g., `index.js`).

In the code editor, replace the default code for file `bootstrap` with the following
code, and click **Deploy** to save the code.

.. code-block:: bash
   :caption: bootstrap
  
    /opt/function/runtime/nodejs20.15/rtsp/nodejs/bin/node $RUNTIME_CODE_ROOT/index.js


Step 4: Create a test event
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Click on **Test** tab, and click **Configure Test Event** to create a test event with the following parameters:

(For HTTP functions only "API Gateway (Dedicated)" event template is supported.)

.. code-block:: json
   :caption: testevent.json

    {
      "body": "",
      "requestContext": {
        "apiId": "bc1dcffd-aa35-474d-897c-d53425a4c08e",
        "requestId": "11cdcdcf33949dc6d722640a13091c77",
        "stage": "RELEASE"
      },
      "queryStringParameters": {
        "responseType": "html"
      },
      "httpMethod": "GET",
      "pathParameters": {},
      "headers": {
        "accept-language": "q=0.5,en-US;q=0.3,en;q=0.2",
        "accept-encoding": "gzip, deflate, br",
        "x-forwarded-port": "443",
        "x-forwarded-for": "103.218.216.98",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "upgrade-insecure-requests": "1",
        "host": "host",
        "x-forwarded-proto": "https",
        "pragma": "no-cache",
        "cache-control": "no-cache",
        "x-real-ip": "103.218.216.98",
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0"
      },
      "path": "/apig-event-template",
      "isBase64Encoded": true
    }

Step 5: Test the function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Click **Test** to execute the function with the test event created in the previous step,
and you should see the following output in the ``Execution Result`` section

.. code-block:: json

    {
      "body": "PGh0bWw+PGJvZHk+PGgyPlRoaXMgaXMgaHR0cCBmdW5jdGlvbi48L2gyPjwvYm9keT48L2h0bWw+",
      "headers": {
        "Content-Type": [
          "text/html"
        ],
        "Date": [
          "Thu, 19 Mar 2026 09:35:51 GMT"
        ]
      },
      "statusCode": 200,
      "isBase64Encoded": true
    }

The body in the output is base64 encoded. After decoding, you should see the following HTML content:

.. code-block:: html

    <html><body><h2>This is http function.</h2></body></html> 
