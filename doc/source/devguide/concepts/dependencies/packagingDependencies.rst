Dependencies for Node.js functions
====================================

This section describes how to create dependencies for Node.js functions in FunctionGraph.

Example
--------

Before creating a dependency, ensure that Node.js matching the function runtime
has been installed in the environment.

The following uses **Node.js 20.15** as an example to describe how to create a **MySQL** dependency package.

1. Create a directory for your function and navigate to it.

    .. code-block:: bash

      # Create a directory for your function
      mkdir mysql-dependency
      cd mysql-dependency

2. Create a **package.json** file and add dependencies.

    .. literalinclude:: ../../../../../samples-doc/dependency-mysql/package.json
       :language: json
       :tab-width: 2


3. Install the dependencies and create zip.

  .. tabs::

    .. tab:: using ``npm pack`` and provided npm scripts (unix)

      `npm pack <https://docs.npmjs.com/cli/v11/commands/npm-pack>`_ is a command to create a tarball of your package.

      As FunctionGraph supports zip files only, the ``package.json`` provides
      following scripts to install dependencies and convert the tarball to a zip file
      (see: `How npm handles the "scripts" file <https://docs.npmjs.com/cli/v11/using-npm/scripts>`_).

      * ``prepack`` script to install the dependencies and
      * ``postpack`` script to convert the tarball created by ``npm pack`` to a zip.

      .. code-block:: bash

        npm pack

      This will create a zip file named `${npm_package_name}-${npm_package_version}.zip`
      (in our cas: mysql-dependency-1.0.0.zip) in the current directory,
      containing the dependencies specified in the `package.json` file.

    .. tab:: using ``zip``

      .. code-block:: bash

        # Install dependencies
        npm install --save

      .. code-block:: bash

        # Package dependencies into a zip file
        zip -r mysql-dependency.zip node_modules package.json

        # or:
        npm run zip

    .. tab:: using Windows Powershell

      .. code-block:: powershell

        # Install dependencies
        npm install --save

      .. code-block:: powershell

        # Package dependencies into a zip file using provided npm script
        npm run zip:ps1


For more details, see :otc_fg_umn:`Configuring Dependency Packages <configuring_dependencies/configuring_dependency_packages.html#>`
in the FunctionGraph user manual.


Native module dependencies
---------------------------

.. note::
    This section is in draft state and might not be fully accurate or complete.

    Update will follow.

If your Node.js function depends on native modules that require **.dll** or **.so** files,
you can include these files in your dependency package.

You are advised to create function dependencies in **EulerOS**.
If other OSs are used, an error may occur due to underlying dependent libraries.
For example, the dynamic link library cannot be found.

Ensure that the native modules are compatible with the runtime environment of your function.

When packaging your dependencies, make sure to include the **.dll** or **.so** files in the
appropriate directory structure within your zip file.

Setting Up the EulerOS Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**EulerOS** is an enterprise-grade Linux OS based on open-source technology.
It features high security, scalability, and performance, meeting customers' requirements
for IT infrastructure and cloud computing services.

1. Buy a **EulerOS** ECS on `T Cloud Public` by referring to
   `Creating and Logging In to a Linux ECS <https://docs.otc.t-systems.com/elastic-cloud-server/umn/getting_started/index.html>`_.
   On the Configure Basic Settings page, select `Public Image`, 
   and select **EulerOS** and an `image version`.

2. Download the **EulerOS** image, and use virtualization software to set up the **EulerOS** VM on a local PC.
   `EulerOS images <https://otc-image-files.obs-website.eu-de.otc.t-systems.com/?os=euleros>`_

3. Use **openEuler** Docker images to set up a Docker environment on your local PC.




