Invoke FunctionGraph Function from FunctionGraph
=================================================

.. toctree::
   :maxdepth: 1
   :hidden:


This page demonstrates how to call a FunctionGraph implemented
in Node.js from another FunctionGraph function using API calls and
temporary security credentials (SecurityAccessKey/SecurityKey/SecurityToken)
provided by an agency of `Agency Type` **Cloud Service** 
for `Cloud Service` **FunctionGraph Service** with permission to invoke FunctionGraph.
for authentication.

See: :ref:`invoke_functiongraph_function_api` for more details on
how to use the REST API.


Prerequisites
-----------------

1. URN of Function to be called.
   In this example the code of the function to be called is:

   .. code-block:: javascript

      exports.handler = async (event, context) => {
        const output =
        {
            'statusCode': 200,
            'headers':
            {
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': false,
            'body': JSON.stringify(event),
        }
        return output;
      }
   

2. An agency of `Agency Type` **Cloud Service** for `Cloud Service` **FunctionGraph Service**
   with permission to invoke FunctionGraph.

   The permission policy should contain following policy statement:

   .. code-block:: json

      {
        "Version": "1.1",
        "Statement": [
          {
            "Action": [
              "functiongraph:function:invokeAsync*",
              "functiongraph:function:invoke"
              ],
            "Effect": "Allow"
          }
        ]
      }

   or use an agency with default permission **FunctionGraph CommonOperations**.

   .. note::
      The permissions shown above are for demonstration purpose.
      Please follow the principle of least privilege when creating 
      the permission policy for the agency.

      e.g. to grant permission to invoke only specific functions,
      the policy statement should be like:

      .. code-block:: json

         {
           "Version": "1.1",
           "Statement": [
             {
               "Action": [
                 "functiongraph:function:invokeAsync*",
                 "functiongraph:function:invoke"
                 ],
               "Effect": "Allow",
               "Resource": [
                 "RESOURCE_PATH"           
               ]
             }
           ]
         }

      where **"RESOURCE_PATH"** is in format

      .. code-block:: text

          FunctionGraph:::function:group/function name

      By adding Function name to the end of the generated prefix,
      you can define a specific path.
      
      An asterisk * is allowed to indicate any function.
      
      For example, **FunctionGraph:*:*:function:default/*** indicates
      any function in the **default** group.

      (Remark: changing the permission policy may take some time to take effect.)


Coding
---------------------

package.json
^^^^^^^^^^^^^^^^^^^^^^

Create a package with following content for the
FunctionGraph function that will call another FunctionGraph function.

.. literalinclude:: ../../../../samples-doc/invoke-fg2fg/package.json
   :language: json


index.js
^^^^^^^^^^^^^^^^^^^^^^

Create a function with following content to call another FunctionGraph function:

.. literalinclude:: ../../../../samples-doc/invoke-fg2fg/index.js
   :language: javascript

Deployment
---------------------

Create a deployment package using **npm install** and **npm pack**
and deploy the package to FunctionGraph using the console as 
event function from scratch using Node.JS 20.15.

Configure the function:

- set the handler name as **index.handler**.
- specify an agency with permission to **invoke** FunctionGraph
- and set the URN of the function to be called as Environment variable
  with key **CALL_FG_URN**.
