.. _devguide_event_function_scratch_index:

Building FunctionGraph Event Functions with NodeJS from scratch
==========================================================================

Following chapter describe how to build FunctionGraph event functions
using NodeJS from scratch:

.. toctree::
   :hidden:

   Project <project.rst>
   Context <context.rst>
   Initializer <initializer.rst>
   Bundled Libraries <bundledlibraries.rst>

Introduction
------------

For general details about creating event functions from scratch and
executing an event function,
see :otc_docs:`Creating a Function from Scratch and Executing the Function <function-graph/umn/creating_a_function/creating_a_function_from_scratch/creating_an_event_function.html>`
in the user manual.

Function Development Overview
------------------------------

NodeJS 6.10
^^^^^^^^^^^^

.. code-block:: javascript

  exports.handler = function(event, context, callback)

* **handler**: name of the function that FunctionGraph invokes to
  execute your code.
  The name must be consistent with that you define when creating a function
  in FunctionGraph.

* **event**: event parameter defined for the function.
  The parameter is in JSON format.

* **context**: runtime information provided for executing the function.
  See :ref:`context` for details.

* **callback**: used to return the defined **err** and **message** information
  to the frontend. The general syntax is **callback(err, message)**.
  You can define the error or message content, for example, a character string.

NodeJS 8.10 and later
^^^^^^^^^^^^^^^^^^^^^^^^

Node.js 8.10 and later are compatible with the APIs of Node.js 6.10,
and supports an **async** handler. Responses are output through **return**.

.. code-block:: javascript

  exports.handler = async (event, context, callback [optional]) => { return data;}

* **handler**: name of the function that FunctionGraph invokes to
  execute your code.
  The name must be consistent with that you define when creating a function
  in FunctionGraph.

* **event**: event parameter defined for the function.
  The parameter is in JSON format.

* **context**: runtime information provided for executing the function.
  See :ref:`context` for details.

Handler
^^^^^^^^^^^^^^^^^^^^

The handler of a Node.js function is in the format of
**[file name].[function name]**.
You can configure the handler on the FunctionGraph console.
For example, if you set the handler to **index.handler** in your function,
FunctionGraph will load the **handler** function defined in the **index.js**
file.

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
    logger.info("initializing :", context.getFunctionName());

    callback(null, "");
  };

* **Function name**
  The function name **exports.initializer** must be the initializer function
  name specified for a function.

  For example, if the initializer is named **index.initializer**, FunctionGraph
  loads the initializer function defined in the **index.js** file.

* **context**
  The **context** parameter contains the runtime information about a function.
  For example, request ID, temporary AK, and function metadata.
  See :ref:`context` for details.

* **callback**
  The **callback** parameter is used to return the invocation result.
  The signature of this parameter is **function(err, data)**, which is the same
  as that of the common **callback** parameter used in Node.js.
  If the value of **err** is not null, the function will return
  **HandledInitializationError**.
  The value of **data** is invalid because no value will be returned for
  function   initialization. You can set the **data** parameter to **null**
  by referring to the previous example.

