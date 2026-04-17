.. _devguide_bestpractices_packaging_node:

Packaging Node.js functions created from scratch
===============================================================

.. toctree::
   :hidden:


FunctionGraph supports packaging Node.js functions as zip files.

This packaging method is suitable for both event and HTTP functions created from scratch.

To package your Node.js function as a zip file, you can use npm scripts to automate the packaging process.

To do so adapt your package.json file to include a postpack script that
creates a zip file containing your function code and its dependencies.

Then you can use the

.. code-block:: bash

   npm pack
   
command to create a tarball of your package, which will trigger the postpack script to create the zip file.

Package.json
-----------------

Adapt your package.json file to include the necessary scripts and dependencies for packaging your Node.js function as a zip file.

.. code-block:: 
   :caption: package.json for packaging Node.js as zip

    {
      ...
      "scripts": {
        "postpack": ".\postpack.cmd", // for Windows
        "postpack": "bash ./postpack.sh" // for Linux
        },

      "dependencies": {
         // add here dependencies of your function
      },
      "devDependencies": {
        // add here dev dependencies of your function
      },
      "bundleDependencies": [
         // add here bundle dependencies if needed
         // these are dependencies from "dependencies" that will be included in the zip package
      ],
      "files": [
        // add here files to be included in the bundle, e.g.:
        "*.js",
        "src/**/*",
        "bootstrap" // for http functions    
      ]
      ...
    }

Next to the files included in the "files" section of your package.json,
the package will also contain "README.md", "package*.json", and "node_modules"
folder with the dependencies specified in "bundleDependencies".

For details, see `package.json <https://docs.npmjs.com/cli/v10/configuring-npm/package-json>`_ documentation.


Postpack script for Linux
--------------------------

Copy following file content to a file named postpack.sh in the same folder as
your package.json and make it executable.


.. literalinclude:: ../../../../npm-scripts/postpack.sh
   :caption: postpack.sh for Linux
   :language: bash

To make it executable run following command in the terminal:

.. code-block:: bash

   chmod +x postpack.sh


Postpack script for Windows
---------------------------

Copy following file content to a file named postpack.cmd in the same folder as
your package.json

.. literalinclude:: ../../../../npm-scripts/postpack.cmd
   :caption: postpack.cmd for Windows
   :language: winbatch

