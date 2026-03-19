Setting up the NodeJS project for HTTP functions
==========================================================

.. toctree::
   :hidden:

The following examples assumes that you have NodeJS 20.15.1 installed
you are using npm as the package manager and linux.

Project structure
^^^^^^^^^^^^^^^^^^^^^^^^

A minimal NodeJS FunctionGraph project is typically structured as follows:

.. code-block:: bash
  :caption: Project structure

  /project-root
   ├─ src
   |  └─ index.js
   └─ package.json

Step 1: Initialize the project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This project will use Koa, a popular NodeJS web framework, 
to implement the HTTP function.

1. Run the following command to create a project folder.

   .. code-block:: bash

      mkdir -p scratch-http-simple/src
      cd scratch-http-simple

2. Run the following commands to initialize the Node.js project and download the koa framework.

    .. code-block:: bash
  
        npm init -y
        npm i koa
  
    This will create following **package.json** file in the project root directory.

    .. code-block:: json
       :caption: package.json

        {
          "name": "scratch-http-simple",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "type": "commonjs",
          "dependencies": {
            "koa": "^3.1.2"
          }
        }


Step 2: Sample code
^^^^^^^^^^^^^^^^^^^^^^^^

in the src folder, create a file named **index.js** and add the following code.
For details about how to use this framework, see `Koa's guide <https://koajs.com/#introduction>`_ .

Sample code:

.. literalinclude:: ../../../../../samples-doc/scratch-http-simple/src/index.js
    :language: javascript
    :caption: src/index.js
    :tab-width: 2

Step 2a: Test the function locally

To test the function locally, run the following command in the project root directory:

.. code-block:: bash

   node src/index.js

Then send a HTTP request to the function with the following command:

.. code-block:: bash

   curl -X POST localhost:8000
   # Result: Hello World!

   curl -X POST localhost:8000/koa
   # Result: Hello World, user!


Step 3: Create the bootstrap file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create a file named **bootstrap** in the project root directory and add the following code.

.. literalinclude:: ../../../../../samples-doc/scratch-http-simple/bootstrap
    :language: bash
    :caption: bootstrap
    :tab-width: 2

Step 4: Enhance package.json and build the zip package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To deploy the function to FunctionGraph, you need to create a zip package of the project.
The Zip package should have following structure:

.. code-block:: bash
  :caption: deployment zip file structure

  /filename.zip
   ├─ node_modules           # NPM third-party dependencies (optional)
   |  └─ ...
   ├─ src
   |  └─ index.js            # main function code file (mandatory)
   ├─ bootstrap              # bootstrap file to start the function runtime (mandatory)
   └─ package.json           # NPM project management file (optional but recommended)

To create the zip package, you can enhance the **package.json** file as 
follows to include the necessary fields for FunctionGraph deployment.

.. literalinclude:: ../../../../../samples-doc/scratch-http-simple/package.json
    :language: json
    :caption: package.json
    :tab-width: 2

To create the zip package, run the following command in the project root directory:

.. code-block:: bash

   npm pack

`npm pack` will create a tarball package of the project with the name in the format of 
**[package-name]-[version].tgz** (e.g., `scratch-http-simple-1.0.0.tgz`) and includes files
specified in the `files` field of **package.json** and the dependencies specified
in the `bundleDependencies` field of **package.json**.

FunctionGraph requires the package to be in zip format, so you need to convert the tarball package to zip format.
The **package.json** includes a `postpack` command to handle this conversion.


Step 5: Deploy to FunctionGraph
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In FunctionGraph console, create a function with the following parameters:

- **Create with**: Create from scratch
- **Function Type**: HTTP Function
- **Region**: select the region where you want to create the function 
- **Function Name**: scratch-http-simple

leave the other parameters with default values, and click **Create Function** to create the function.

In the **Code** tab of the created function, click **Upload** -> **local Zip**
to upload the generated zip package (e.g., `scratch-http-simple.zip`) to FunctionGraph.


Step 6: Test the Function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
 Create a test event with the following parameters:

- **Event Name**: test-event
- **Event Template**: API Gateway (Dedicated)

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

Click **Test** to execute the function and you should see the following output in the ``Execution Result`` section:

.. code-block:: json

  {
    "body": "SGVsbG8gV29ybGQh",
    "headers": {
      "Content-Length": [
        "12"
      ],
      "Content-Type": [
        "application/json; charset=utf-8"
      ],
      "Date": [
        "Thu, 19 Mar 2026 11:03:46 GMT"
      ]
    },
    "statusCode": 200,
    "isBase64Encoded": true
  }

The response body is Base64-encoded. After decoding, you will get the string "Hello World!".
