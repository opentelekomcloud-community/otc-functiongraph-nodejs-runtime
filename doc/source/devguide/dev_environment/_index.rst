Set up development environment
===============================

.. toctree::
   :hidden:

To build and run the Node.js runtime for FunctionGraph, you need to set up your
development environment by installing the Node.js programming language.

Operating system
---------------------------------

As FunctionGraph is built on Linux, it is recommended to use a Linux-based operating system for development,
like:

- Windows Subsystem for Linux (WSL)
  see `How to install Linux on Windows with WSL <https://learn.microsoft.com/en-us/windows/wsl/install>`_,
- Linux

Windows can also be used for development, but you might encounter some issues if dependencies
of the Node.js runtime do not support Windows.

Install Node.js
---------------------------------

Best practices for installing Node.js recommend using a version manager such as nvm (Node Version Manager)
to manage multiple Node.js versions on your system.

Installing Node.js using nvm on a Unix-like operating system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an example on how to install nvm version 0.40.4 and Node.JS version 20.15.1 on Linux.

For details see `nvm installation guide <https://github.com/nvm-sh/nvm#installing-and-updating>`_.

1. Install nvm

    .. code-block:: bash

      # install curl if not available:
      sudo apt install curl

      # remove old versions of nodejs and npm
      sudo apt remove nodejs npm

      # get install scripts and install
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
      
      # load nvm to be present in current session
      source \~/.nvm/nvm.sh

2. Install Node.JS version 20.15.1 using nvm

    .. code-block:: bash

      # install Node.JS version 20.15.1 using nvm
      nvm install 20.15.1

      # select version 20.15.1 for usage
      nvm use 20.15.1

      # check version of node
      node -v
      # check version of npm
      npm -v
      ```


Installing Node.js using nvm on a Windows operating system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install Node.JS on Windows, follow following steps:

1. Install nvm as described in `NVM Install <https://www.nvmnode.com/guide/installation.html>`_.

2. After installation open a command shell and execute following:

  .. code-block:: shell

      # install Node.JS version 20.15.1 using nvm
      nvm install 20.15.1

      # select version 20.15.1 for usage
      nvm use 20.15.1

      # check version of node
      node -v
      # check version of npm
      npm -v

Proxy configurations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In case you are behind a proxy, set proxy as follows:

.. code-block:: shell

    # set proxy for nvm
    nvm proxy http://PROXY-HOST:PROXY-PORT

    # set proxy for npm
    npm config set proxy http://PROXY-HOST:PROXY-PORT

Setup GitHub package registry for opentelekomcloud-community packages
---------------------------------------------------------------------------------------------------


1. To access the GitHub package registry for opentelekomcloud-community packages, you need
   to create a personal access token (PAT) with the appropriate permissions and configure
   npm to use this token for authentication.

   For details on how to create a personal access token and configure npm,
   see `GitHub documentation <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>`_.

3. After setting up the GitHub package registry access, you can install the dependencies of the Node.js runtime
   using npm, which will pull the packages from the GitHub package registry.

   To use the GitHub package registry, you need to add the following configuration to your .npmrc file
   (located in the same (or any parent) folder as your package.json, or in your user home directory):

    .. code-block:: bash
  
        @opentelekomcloud-community:registry=https://npm.pkg.github.com
        //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN

.. tip::
     For creating deployment packages and bundle dependencies, see :ref:`devguide_bestpractices_packaging_node`.

Install an IDE
---------------------------------
You can use any text editor or IDE to write Node.js code.

.. note::
   Examples in this documentation were created using:

   - WSL and
   - Visual Studio Code.


Using container images
---------------------------------

To build functions using container images, you need to have
Docker installed on your system.

See `Get Docker <https://docs.docker.com/get-docker/>`_ for instructions
on how to install Docker on your system.
