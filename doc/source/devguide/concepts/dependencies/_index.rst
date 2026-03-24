Dependencies
===========================

.. toctree::
   :hidden: 
   :maxdepth: 1

   Packaging Dependencies <packagingDependencies>


For general information on dependency management in FunctionGraph, see also:

- :otc_fg_umn:`Dependency Management <dependency_management/index.html>`.
- :otc_fg_umn:`Dependency Management FAQs <faqs/dependency_management_faqs/index.html>`

Introduction
----------------

A dependency contains public libraries that support the running of
function code. You can encapsulate the required public libraries into
a dependency for easier management, sharing, and smaller deployment sizes.

You can keep multiple versions of the same dependency for systematic management.

Notes and Constraints
---------------------

* The maximum size of a private dependency is 300 MB, and the maximum number
  of files in a dependency is 30,000.
  For dependencies greater than 300 MB, you need to split and upload them as
  multiple dependencies, and then specify multiple dependencies for a function.

* The name of a file in a dependency cannot end with a tilde (~),
  for example, module~.

* A maximum of 20 dependencies can be specified for a function.

* Dependencies in use cannot be deleted.
 
  