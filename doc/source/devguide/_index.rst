.. _building_with_nodejs:

Building with NodeJS
========================
.. toctree::
   :hidden:
   :maxdepth: 1

   Event Function<event_function/_index>
   HTTP Function<http_function/_index>

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

Supported NodeJS Runtimes for building from scratch
---------------------------------------------------

FunctionGraph currently supports the following NodeJS runtimes
for building functions from scratch:

.. list-table:: Supported NodeJS runtimes
   :header-rows: 1

   * - Runtime
     - Identifier
   * - NodeJS 6.10
     - Node.js6.10
   * - NodeJS 8.10
     - Node.js8.10
   * - NodeJS 10.16
     - Node.js10.16
   * - NodeJS 12.13
     - Node.js12.13
   * - NodeJS 14.18
     - Node.js14.18
   * - NodeJS 16.17
     - Node.js16.17
   * - NodeJS 18.20
     - Node.js18.20


Supported NodeJS Runtimes for building using container images
--------------------------------------------------------------

For building functions using container images, you can use any
NodeJS version that meets the requirements of your custom container image.


Set up development environment
---------------------------------
To build and run the NodeJS runtime for FunctionGraph, you need to set up your
development environment by installing the NodeJS programming language.


Operating system
^^^^^^^^^^^^^^^^^^^^

This guide assumes that you are using a Unix-like operating system such as

- Windows Subsystem for Linux (WSL)
  see `How to install Linux on Windows with WSL <https://learn.microsoft.com/en-us/windows/wsl/install>`_,
- Linux,
- macOS.

Install NodeJS
^^^^^^^^^^^^^^^^^^^^
1. Download the NodeJS installation package for your operating system
   from the official `NodeJS website <https://nodejs.org/en/download/>`_.
2. Follow the installation instructions provided on the website to
   install NodeJS on your system.

.. note::
  This guide assumes that you have installed NodeJS and npm (Node Package Manager)
  using nvm (Node Version Manager) to manage your NodeJS versions.


Install an IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You can use any text editor or IDE to write NodeJS code.

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
