Node.js FunctionGraph samples
============================

Following samples are provided to demonstrate how to use
FunctionGraph with Node.js:

.. toctree::
   :maxdepth: 2
   :hidden:

   Container-event <container-event/_index>
   Container-http <container-http/_index>
   Event-obs-s3-thumbnail <event-obss3-thumbnail/_index>
   Event-sdk-obs <event-sdk-obs/_index>
   Scratch-event-async <scratch-event-async/_index>
   Scratch-event-sync <scratch-event-sync/_index>
   Scratch-event-timer <scratch-event-timer/_index>
   Scratch-http <scratch-http/_index>


Event Functions
------------------------------

Created from scratch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`scratch-event-async<scratch-event-async/_index>`
     - A sample event function that demonstrates how to use async/await in Node.js functions.

   * - :doc:`scratch-event-sync<scratch-event-sync/_index>`
     - A sample event function that demonstrates how to write synchronous code in Node.js functions.

   * - :doc:`scratch-event-timer<scratch-event-timer/_index>`
     - A sample event function that demonstrates how to use timer trigger in Node.js functions.

   * - :doc:`event-obss3-thumbnail<event-obss3-thumbnail/_index>`
     - A sample event function that listens for OBS S3 events and generates thumbnail images for the uploaded objects.

   * - :doc:`event-sdk-obs<event-sdk-obs/_index>`
     - A sample event function that demonstrates how to use FunctionGraph SDK for OBS in Node.js functions.

Using container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`container-event-express<container-event/container-event-express/_index>`
     - A sample event function that uses Node.js and express framework deployed as container image.
     
   * - :doc:`container-event-koa<container-event/container-event-koa/_index>`
     - - A sample event function that uses Node.js and Koa framework deployed as container image.


HTTP Functions
--------------

Created from scratch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`scratch-http<scratch-http/_index>`
     - A sample HTTP function using Koa framework in Node.js functions deployed from scratch.

Using container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`container-http-koa<container-http/container-http-koa/_index>`
     - A sample HTTP function using Koa framework in Node.js functions deployed as container image.

