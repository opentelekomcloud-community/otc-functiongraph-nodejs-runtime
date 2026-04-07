.. _devguide_event_function_scratch_index:

Building FunctionGraph Event Functions with Node.js from scratch
==========================================================================

Following chapter describes how to build FunctionGraph event functions
using Node.js from scratch:

.. toctree::
   :hidden:

   Project <project.rst>
   Context <context.rst>
   Initializer <initializer.rst>

Introduction
------------

For general details about creating event functions from scratch and
executing an event function,
see :otc_docs:`Creating a Function from Scratch and Executing the Function <function-graph/umn/creating_a_function/creating_a_function_from_scratch/creating_an_event_function.html>`
in the user manual.

Function Development Overview
------------------------------

Node.js 6.10
^^^^^^^^^^^^

.. code-block:: javascript

  exports.handler = function(event, context, callback) {
    // Your code here
    callback(err, data);
  };

* **handler**:
  Name of the function that FunctionGraph invokes to execute your code.

  The name must be consistent with that you define when creating a function
  in FunctionGraph.

* **event**:
  Event parameter defined for the function. The parameter is in **JSON** format.

* **context**:
  Runtime information provided for executing the function.
  See :ref:`context` for details.

* **callback**:
  Used to return the defined **err** and **data** information
  to the frontend. The general syntax is **callback(err, data)**.

  You can define the error or data content, for example, a character string.

  If the value of **err** is **not null**, the function will fail
  and the error message object is returned.

  If the value of **err** is **null**, the function will succeed and return
  the value of **data**.


Node.js 8.10 and later
^^^^^^^^^^^^^^^^^^^^^^^^

Node.js 8.10 and later
^^^^^^^^^^^^^^^^^^^^^^^^

Node.js 8.10 and later are compatible with the APIs of Node.js 6.10,
and supports an **async** handler.

.. code-block:: javascript

  exports.handler = async (event, context, callback [optional]) => {
    // Your code her
    return data;
  }

* **handler**:
  Name of the function that FunctionGraph invokes to execute your code.

  The name must be consistent with that you define when creating a function
  in FunctionGraph.

* **event**:
  Event parameter defined for the function. The parameter is in **JSON** format.

* **context**:
  Runtime information provided for executing the function.
  See :ref:`context` for details.

Responses are output through **return**.

If function throws an exception, the function execution is
considered failed and the error message object is returned.


.. _index_handler:

Handler
^^^^^^^^^^^^^^^^^^^^

The handler of a Node.js function is in the format of
**[file name].[function name]**.
You can configure the handler on the FunctionGraph console.

For example, if you set the handler to **index.handler** in your function,
FunctionGraph will load the **handler** function defined in the **index.js**
file.

Return value using "callback"
"""""""""""""""""""""""""""""

The return value of the function output:

* **Successful execution**: The defined function output information is returned.
* **Failed execution**: A error message JSON object containing **errorMessage**
  and **errorType** is returned.

  The format is as follows:

  .. code-block:: json

    {
      "errorMessage": "error message",
      "errorType": "error type"
    }

  where **errorMessage** is the error message returned by the runtime and
  **errorType** is the error type.

  In general the error response is like:

  .. code-block:: json

    {
      "errorMessage": "function entry exception, error: [errorText]",
      "errorType": "[errorType]"
    }

  where **errorText** is the `message` of the error and **errorType** is the `type` of the error.

  E.g if you define the error as follows:

  .. code-block:: javascript

    err = new Error("message");

  Then the returned error message will be:

  .. code-block:: json

    {
      "errorMessage": "function entry exception, error: message",
      "errorType": "Error"
    }

Return value using "return"
"""""""""""""""""""""""""""

The return value of the function output:

* **Successful execution**: The defined function output information is returned.

* **Failed execution**: Due to an thrown exception (errorType(message)),
  a error message JSON object containing
  **errorMessage**, **errorType** and **stackTrace** is returned.

  The format is as follows:

  .. code-block:: json

    {
      "errorMessage": "function invocation exception, error: [message]",
      "errorType": "[errorType]",
      "stackTrace": [
         "stack trace"
      ]
    }

  where **errorMessage** is the error message returned by the runtime and
  **errorType** is the error type.


.. _index_initializer:

Initializer
^^^^^^^^^^^^^^^^^^^^

For details about the initializer, see :ref:`initializer`.

The initializer is in the format of **[File name].[Initializer name]**.

For example, if the initializer is named **index.initializer**, FunctionGraph
loads the initializer function defined in the **index.js** file.

To use Node.js to build initialization logic, define a Node.js function as the
initializer.

The following is a simple initializer:

.. code-block:: javascript

  exports.initializer = function (context, callback) {
    const logger = context.getLogger();
    logger.info("Initializing:", context.getFunctionName());

    callback(null, "");
  };

* **Function name**:
  The function name **exports.initializer** must be the initializer function
  name specified for a function.

  For example, if the initializer is named **index.initializer**, FunctionGraph
  loads the initializer function defined in the **index.js** file.

* **context**:
  The **context** parameter contains the runtime information about a function.
  For example, request ID, temporary AK, and function metadata.
  See :ref:`context` for details.

* **callback**:
  The **callback** parameter is used to return the invocation result.
  The signature of this parameter is **function(err, data)**, which is the same
  as that of the common **callback** parameter used in Node.js.

  In this case, the value of **data** is irrelevant because no value will
  be returned for function initialization.

  You can set the **data** parameter to **null** by referring to the
  previous example.


  If the value of **err** is **null**, the function initialization is successful.

  If the value of **err** is **not null**, the function will fail with:

  .. code-block:: json

    {
      "errorMessage": "function initialization exception: [errorText]",
      "errorType": "[errorType]"
    }

  where **errorText** is the `message` of the error and **errorType** is the `type` of the error.
