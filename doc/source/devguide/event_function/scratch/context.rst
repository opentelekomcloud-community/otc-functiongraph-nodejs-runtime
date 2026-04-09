.. _context:

Using the FunctionGraph context
================================

When FunctionGraph runs your function, it passes a context object to the
handler.
This object provides methods and properties that provide information about
the invocation, function, and execution environment.

Context interface
-----------------

.. list-table:: **Table 1** Context interface methods
    :widths: 10 25
    :header-rows: 1

    * - Method
      - Description

    * -  getRequestID()
      - Obtains a request ID.

    * - getRemainingTimeInMilliSeconds ()
      - Obtains the remaining time in milliseconds.

    * - getAccessKey()
      - Obtains the AK (valid for 24 hours) with an agency.
        If you use this method, you need to configure an **agency** for the function.

        .. note::
          FunctionGraph has stopped maintaining the getAccessKey API in the Runtime SDK.
          You cannot use this API to obtain a temporary AK.

    * - getSecretKey()
      - Obtains the SK (valid for 24 hours) with an agency.
        If you use this method, you need to configure an **agency** for the function.

        .. note::
          FunctionGraph has stopped maintaining the getSecretKey API in the Runtime SDK.
          You cannot use this API to obtain a temporary SK.

    * - getSecurityAccessKey()
      - Obtains the SecurityAccessKey (valid for 24 hours) with an agency.
        The cache duration is 10 minutes. That is, the same content is returned
        within 10 minutes.
        To use this method, you need to configure an **agency** for the  function.

    * - getSecuritySecretKey()
      - Obtains the SecuritySecretKey (valid for 24 hours) with an agency.
        The cache duration is 10 minutes. That is, the same content is returned
        within 10 minutes.
        To use this method, you need to configure an **agency** for the function.

    * - getSecurityToken()
      - Obtains the SecurityToken (valid for 24 hours) with an agency.
        The cache duration is 10 minutes. That is, the same content is returned
        within 10 minutes.
        To use this method, you need to configure an **agency** for the function.

    * - getUserData(string key)
      - Uses keys to obtain the values passed by environment variables.

    * - getFunctionName()
      - Obtains the name of a function.

    * - getRunningTimeInSeconds ()
      - Obtains the timeout of a function.

    * - getVersion()
      - Obtains the version of a function.

    * - getMemorySize()
      - Obtains the allocated memory.

    * - getCPUNumber()
      - Obtains CPU usage of a function.

    * - getPackage()
      - Obtains a function group.

    * - getToken()
      - Obtains the token (valid for 24 hours) with an agency.
        If you use this method, you need to configure an **agency** for the function.

    * - getLogger()
      - Obtains the **logger** method provided by the context and returns a log
        output class. Logs are output in the format of Time-Request ID-Content
        by using the **info** method.
        For example, use the info method to output logs:

        .. code-block:: javascript

          const logg = context.getLogger();

          logg.info("hello");

    * - getAlias()
      - Obtains function alias.

For context.js, see :github_repo_master:`context.js <fg-runtime/src/context.js>`.

To work with the context object in development environment,
you can import the Context class from the npm package as dev dependency and create an instance of it.

 .. code-block:: bash

    npm install @opentelekomcloud-community/fg-runtime --save-dev
    # or
    npm install @opentelekomcloud-community/fg-context -D

.. note::
  All npm packages are hosted on GitHub Packages.
  
  To install the packages, you need to authenticate with GitHub Packages
  using a personal access token (PAT) with the appropriate scopes.

  For further information on how to authenticate with GitHub Packages, please refer to the GitHub documentation:
  `Working with the npm registry <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>`_.


.. code-block:: javascript

    const { Context } = require('@opentelekomcloud-community/fg-context');


.. warning::  
  All classes in the fg-runtime package are intended for use in the development environment only.

  The FunctionGraph service provides the context object when your function is
  invoked in the production environment.
