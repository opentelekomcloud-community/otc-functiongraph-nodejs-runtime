.. _devguide_event_function_trigger_events_index:

Overview of Trigger Events
==============================

Following is a list of event triggers that can be used for
FunctionGraph event functions:

.. toctree::
   :maxdepth: 1

   APIG Event <trigger_apig_event>
   CTS Event <trigger_cts_event>
   DDS Event <trigger_dds_event>
   DMS Kafka Event <trigger_dms4kafka_event>
   DMS RocketMQ Event <trigger_dms4rocketmq_event>
   Kafka (Open-Source) Event <trigger_kafkaopensource_event>
   LTS Event <trigger_lts_event>
   OBS Event <trigger_obs_event>
   SMN Event <trigger_smn_event>
   Timer Event <trigger_timer_event>


npm packages for trigger events are located in the ``fg-events`` directory of the repository.
Each trigger event has its own package, which can be installed and imported separately.

For example, to use the Timer Event trigger, you can install the package using npm:

.. code-block:: bash

   npm install @opentelekomcloud-community/fg-timer-event

Then, you can import the Timer Event class in your code:

.. code-block:: javascript

   const { TimerEvent } = require('@opentelekomcloud-community/fg-timer-event');

Each trigger event package includes documentation and examples on how to use the event trigger
in your FunctionGraph event functions.

Additional to single trigger event packages, there is also a meta package that includes all trigger events:

.. code-block:: bash

   npm install @opentelekomcloud-community/fg-events

To import the Timer Event class from the meta package, you can use the following code snippet:

.. code-block:: javascript

   const { TimerEvent } = require('@opentelekomcloud-community/fg-events');


.. note::
  All npm packages are hosted on GitHub Packages.
  
  To install the packages, you need to authenticate with GitHub Packages
  using a personal access token (PAT) with the appropriate scopes.

  For further information on how to authenticate with GitHub Packages, please refer to the GitHub documentation:
  `Working with the npm registry <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>`_.
  