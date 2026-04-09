DDS Event Source (offline soon)
===============================

For the use of DDS triggers, please refer to
:docs_otc:`Using a DDS Trigger <function-graph/umn/creating_triggers/using_a_dds_trigger.html>`.

DDS example event
-----------------

.. literalinclude:: /../../fg-events/dds/resources/dds_event.json
    :language: json
    :caption: :github_repo_master:`dds_event.json <fg-events/dds/resources/dds_event.json>`


Parameter description
---------------------


.. list-table::
   :header-rows: 1
   :widths: 20 15 40

   * - Parameter
     - Type
     - Description

   * - event_source
     - String
     - 

   * - event_name
     - String
     - 
     
   * - region
     - String
     - 

   * - event_version
     - String
     - 

   * - size_bytes
     - String
     - 

   * - token
     - JSON String
     - 

   * - full_document
     - JSON String
     - 

   * - ns
     - JSON String
     - 

   * - event_source_id
     - String
     - 
   

For full description of all parameters see
:docs_otc:`DDS Event Reference <cloud-trace-service/umn/trace_references/trace_structure.html#id1>`.

Example
-------

.. literalinclude:: /../../samples-doc/scratch-event-dds/src/index.js
    :language: javascript
    :caption: :github_repo_master:`index.js <samples-doc/scratch-event-dds/src/index.js>`
