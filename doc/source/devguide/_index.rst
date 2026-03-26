.. _building_with_nodejs:

Building with Node.js
========================
.. toctree::
   :hidden:
   :maxdepth: 1

   Event Function<event_function/_index>
   HTTP Function<http_function/_index>
   Invoke FunctionGraph <invoke/_index>
   Bundled Libraries <bundled_libraries/_index>

FunctionGraph Types
-------------------

FunctionGraph provides 2 types of functions:

* **Event Functions**

  Event functions can be configured with event triggers and integrate
  a variety of products
  (such as object storage service OBS, distributed messaging service
  RabbitMQ version, cloud log service LTS, etc.).

  See :doc:`Event Function <event_function/_index>`

* **HTTP Functions**

  HTTP functions support mainstream Web application frameworks and can
  be accessed through a browser or called directly by a URL.

  See :doc:`HTTP Functions <http_function/_index>`

Both types of functions can be built either from **scratch** or by
using **container images**.


Building from scratch
----------------------


Supported Node.js Runtimes for building from scratch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

FunctionGraph currently supports the following Node.js runtimes
for building functions from scratch:

.. _SupportedNodeJSRuntimes:

.. list-table:: Supported Node.js runtimes
   :header-rows: 1

   * - Runtime
     - Identifier
     - Node.js compilation environment (http functions)

   * - NodeJS 6.10
     - Node.js6.10
     - /opt/function/runtime/nodejs6.10/rtsp/nodejs/bin/node
     
   * - NodeJS 8.10
     - Node.js8.10
     - /opt/function/runtime/nodejs8.10/rtsp/nodejs/bin/node

   * - NodeJS 10.16
     - Node.js10.16
     - /opt/function/runtime/nodejs10.16/rtsp/nodejs/bin/node

   * - NodeJS 12.13
     - Node.js12.13
     - /opt/function/runtime/nodejs12.13/rtsp/nodejs/bin/node

   * - NodeJS 14.18
     - Node.js14.18
     - /opt/function/runtime/nodejs14.18/rtsp/nodejs/bin/node

   * - NodeJS 16.17
     - Node.js16.17
     - /opt/function/runtime/nodejs16.17/rtsp/nodejs/bin/node

   * - NodeJS 18.20
     - Node.js18.20
     - /opt/function/runtime/nodejs18.20/rtsp/nodejs/bin/node

   * - NodeJS 20.15
     - Node.js20.15
     - /opt/function/runtime/nodejs20.15/rtsp/nodejs/bin/node

Bundled third-party components integrated in the Node.js runtime
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For bundled libraries integrated in the Node.js runtime, 
see :doc:`Bundled Libraries <bundled_libraries/_index>`.


Building using container images
--------------------------------


Supported Node.js Runtimes for building using container images
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For building functions using container images, you can use any
Node.js version that meets the requirements of your custom container image.


Set up development environment
---------------------------------
To build and run the Node.js runtime for FunctionGraph, you need to set up your
development environment by installing the Node.js programming language.


Operating system
^^^^^^^^^^^^^^^^^^^^

This guide assumes that you are using a Unix-like operating system such as

- Windows Subsystem for Linux (WSL)
  see `How to install Linux on Windows with WSL <https://learn.microsoft.com/en-us/windows/wsl/install>`_,
- Linux,
- macOS.

Install Node.js
^^^^^^^^^^^^^^^^^^^^
1. Download the Node.js installation package for your operating system
   from the official `Node.js website <https://nodejs.org/en/download/>`_.
2. Follow the installation instructions provided on the website to
   install Node.js on your system.

.. note::
  This guide assumes that you have installed Node.js and npm (Node Package Manager)
  using nvm (Node Version Manager) to manage your Node.js versions.


Install an IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You can use any text editor or IDE to write Node.js code.

.. note::
   Examples in this documentation were created using:

   - WSL and
   - Visual Studio Code.


Using container images
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To build functions using container images, you need to have
Docker installed on your system.

See `Get Docker <https://docs.docker.com/get-docker/>`_ for instructions
on how to install Docker on your system.
