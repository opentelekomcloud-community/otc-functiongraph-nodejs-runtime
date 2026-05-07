Node.js FunctionGraph samples
==============================

Following samples are provided to demonstrate how to use
FunctionGraph with Node.js:

.. toctree::
   :maxdepth: 2
   :hidden:

   container-event-express <container-event-express/_index>
   container-event-koa <container-event-koa/_index>
   container-http-koa <container-http-koa/_index>
   event-obs-s3-thumbnail <event-obss3-thumbnail/_index.md>
   event-sdk-ecs <event-sdk-ecs/_index.md>
   event-sdk-obs <event-sdk-obs/_index.md>   
   scratch-event-async <scratch-event-async/_index.md>
   scratch-event-sync <scratch-event-sync/_index.md>
   scratch-event-timer <scratch-event-timer/_index.md>
   scratch-http <scratch-http/_index.md>


General notes
------------------------------

.. note::
   All samples are provided for demonstration purposes only.
   They may not cover all edge cases or best practices for production use.
   You can use these samples as a starting point and modify them according to your specific requirements and use cases.

   The dependencies and dev dependencies used in the samples are file dependencies and are working if the
   complete repository is cloned.

   To use the samples separately, you need to install the required dependencies and dev dependencies manually by running
   ``npm install`` in the sample directory.

   For example, to install the dependencies for the scratch-event-apig sample, change
   
   .. code-block:: json
      :caption: package.json

      "dependencies": {
        "@opentelekomcloud-community/fg-apig-event": "file:../../fg-events/fg-apig-event"
      },

  to 
  
   .. code-block:: json
      :caption: package.json

      "devDependencies": {
          "@opentelekomcloud-community/fg-context": "^1.0.0"
      },



Event Functions
------------------------------

Created from scratch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :ref:`scratch-event-async<scratch-event-async>`
     - A sample event function that demonstrates how to use async/await in Node.js functions.
       (Node.js 8.10 and later)

   * - :ref:`scratch-event-sync<scratch-event-sync>`
     - A sample event function that demonstrates how to write synchronous code in Node.js functions.
       (Node.js 6.10 runtime only)

   * - :ref:`scratch-event-timer<scratch-event-timer>`
     - A sample event function that demonstrates how to use timer trigger in Node.js functions.

   * - :ref:`event-obss3-thumbnail<event-obss3-thumbnail>`
     - A sample event function that listens for OBS S3 events and generates thumbnail images for the uploaded objects.       

   * - :ref:`event-sdk-obs<event-sdk-obs>`
     - A sample event function that demonstrates how to use FunctionGraph SDK for OBS in Node.js functions.

   * - :ref:`event-sdk-ecs<event-sdk-ecs>`
     - A sample event function that demonstrates how to use FunctionGraph SDK for ECS in Node.js functions
       together with an Timer Trigger to start/stop the ECS instances on schedule.

Using container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :ref:`container-event-express<container-event-express>`
     - A sample event function that uses Node.js and express framework deployed as container image.
     
   * - :ref:`container-event-koa<container-event-koa>`
     - A sample event function that uses Node.js and Koa framework deployed as container image.


HTTP Functions
--------------

Created from scratch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :ref:`scratch-http<scratch-http>`
     - A sample HTTP function using Koa framework in Node.js functions deployed from scratch.

Using container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :ref:`container-http-koa<container-http-koa>`
     - A sample HTTP function using Koa framework in Node.js functions deployed as container image.
