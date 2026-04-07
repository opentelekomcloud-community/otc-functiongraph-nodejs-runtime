# DMS for Kafka consumer example

This sample will log all incoming kafka messages to LTS.

## Prerequisites

* Kafka Instance created with correct:
  * VPC
  * Subnet
  * Security Group
  * Topic
  
  (see: [Creating a Kafka Instance](https://docs.otc.t-systems.com/distributed-message-service/umn/creating_a_kafka_instance.html) in User Guide)

* Agency with following permissions:
  * `DMS ReadOnly Access`

## Create deployment package

```
# Use node version 20.15.1:
nvm use 20.15.1

npm pack
```

will produce deployment zip file `dependency-kafka-sample-consumer.zip`

## Create FunctionGraph

Create FunctionGraph event function using:

* Create from Scratch
* Type: Event Function
* Name: SampleKafkaTrigger
* Runtime: Node.js20.15
* Agency: Choose Agency (see Prerequisites)
* Region: Same Region as Kafka Instance

Upload deployment zip `dependency-kafka-sample-consumer.zip`

In `Basic Settings`:

* Handler name: index.handler

In `Permissions`:

* check for correct agency (see Prerequisites)

In `Network`:

* enable `VPC Access`
* As `VPC`, select same VPC as Kafka instance
* As `Subnect`, select same Subnet as Kafka instance

In `Logs`:

* enable `Collect Logs`
* select/create Log Group
* select/create Log Stream


In `Triggers`, create a new `DMS (for Kafka)` trigger with
(see: [Using a Kafka Trigger](https://docs.otc.t-systems.com/function-graph/umn/configuring_triggers/using_a_kafka_trigger.html) in User Guide):

* `Instance`: name of your Kafka instance
* `Topic`: name of Kafka topic for instance
* `Batch Size`: 1 (e.g. can be larger)

After trigger creation, `enable` trigger.




