NodeJS FunctionGraph samples
============================

Following samples are provided to demonstrate how to use
FunctionGraph with NodeJS:

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



Event Functions from scratch
------------------------------

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`scratch-event-async<scratch-event-async/_index>`
     - A sample event function that demonstrates how to use async/await in NodeJS functions.

   * - :doc:`scratch-event-sync<scratch-event-sync/_index>`
     - A sample event function that demonstrates how to write synchronous code in NodeJS functions.

   * - :doc:`scratch-event-timer<scratch-event-timer/_index>`
     - A sample event function that demonstrates how to use timer trigger in NodeJS functions.

   * - :doc:`scratch-http<scratch-http/_index>`
     - A sample HTTP function that demonstrates how to use Koa framework in NodeJS functions.

   * - :doc:`event-obss3-thumbnail<event-obss3-thumbnail/_index>`
     - A sample event function that listens for OBS S3 events and generates thumbnail images for the uploaded objects.

   * - :doc:`event-sdk-obs<event-sdk-obs/_index>`
     - A sample event function that demonstrates how to use FunctionGraph SDK for OBS in NodeJS functions.

Event Functions using container image
-------------------------------------

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`container-event-express<container-event/container-event-express/_index>`
     - A sample event function that uses NodeJS and express framework deployed as container image.
     
   * - :doc:`container-event-koa<container-event/container-event-koa/_index>`
     - - A sample event function that uses NodeJS and Koa framework deployed as container image.


HTTP Functions from scratch
--------------------------------

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`scratch-http<scratch-http/_index>`
     - A sample HTTP function using Koa framework in NodeJS functions deployed from scratch.

HTTP Functions using container image
-------------------------------------

.. list-table::
   :header-rows: 1

   * - Sample
     - Description

   * - :doc:`container-http-koa<container-http/container-http-koa/_index>`
     - A sample HTTP function using Koa framework in NodeJS functions deployed as container image.

