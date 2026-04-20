Invoke FunctionGraph Function from FunctionGraph
=================================================

.. toctree::
   :maxdepth: 1
   :hidden:


This page demonstrates how to call a FunctionGraph implemented
in Node.js from another FunctionGraph function.


Prerequisites
-----------------

1. URN of Function to be called.
2. An agency with permission to invoke FunctionGraph and its access key/secret key,
   the permission policy should contain following permissions:

   .. code-block:: json

      {
        "Version": "1.1",
        "Statement": [
          {
            "Action": [
              "functiongraph:*:get*",
              "functiongraph:*:list*",
              "functiongraph:function:invoke*",
              ],
            "Effect": "Allow"
          }
        ]
      }

   or use an agency with default permission `FunctionGraph CommonOperations`.


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
and deploy the package to FunctionGraph using the console as event function.

Configure the function:

- set the handler name as **index.handler**.
- specify an agency with permission to **invoke** FunctionGraph
- and set the URN of the function to be called as user data with key **CALL_FG_URN**.

.
