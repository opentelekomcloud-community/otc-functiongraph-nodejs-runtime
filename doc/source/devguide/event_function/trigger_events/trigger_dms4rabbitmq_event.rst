.. _devguide_event_function_trigger_events_dms4rabbitmq:

DMS for RabbitMQ Event Source
=======================================

.. note::
    coming soon...

DMS for RabbitMQ is a message queuing service that provides RabbitMQ premium
instances. If you create a RabbitMQ trigger for a function, when a message is sent
to a RabbitMQ instance topic, FunctionGraph will retrieve the message and trigger
the function to perform other operations.

For the use of RabbitMQ triggers, please refer to
:docs_otc:`Using a RabbitMQ Trigger <function-graph/umn/creating_triggers/using_a_rabbitmq_trigger.html>`.

RabbitMQ example event
----------------------

.. literalinclude:: /../../fg-events/dms4rabbitmq/resources/rabbitmq_event.json
    :language: json
    :caption: :github_repo_master:`rabbitmq_event.json <fg-events/dms4rabbitmq/resources/rabbitmq_event.json>`


Parameter description
---------------------


.. list-table::
   :header-rows: 1
   :widths: 20 15 40

   * - Parameter
     - Type
     - Description
   * - event_version
     - String
     - Event version
   * - event_time
     - String
     - Time when an event occurs
   * - trigger_type
     - String
     - Event type: **RABBITMQ**
   * - region
     - String
     - Region where a RabbitMQ instance resides
   * - instance_id
     - String
     - RabbitMQ instance ID
   * - messages
     - String[]
     - Message content
   * - exchange
     - String
     - Exchange identifier

Example
-------

.. literalinclude:: /../../samples-doc/scratch-event-dms4rabbitmq/src/index.js
    :language: javascript
    :caption: :github_repo_master:`index.js <samples-doc/scratch-event-dms4rabbitmq/src/index.js>`
