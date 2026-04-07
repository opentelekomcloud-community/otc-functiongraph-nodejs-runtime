# DMS for Kafka producer sample

This is a very simple sample on how to send messages to a Kafka instance using
the `dependency-kafka`.

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

will produce deployment zip file `dependency-kafka-sample-producer.zip`

## Create FunctionGraph

Create FunctionGraph event function using:

* Create from Scratch
* Type: Event Function
* Name: SampleKafkaProducer
* Runtime: Node.js20.15
* Agency: Choose Agency (see Prerequisites)
* Region: Same Region as Kafka Instance

Upload deployment zip `dependency-kafka-sample-consumer.zip`

In `Code` section -> `Dependencies`

* add dependency from `dependecy-kafka` project

In `Basic Settings`:

* Handler name: index.handler

In `Permissions`:

* check for correct agency (see Prerequisites)

In `Network`:

* enable `VPC Access`
* As `VPC`, select same VPC as Kafka instance
* As `Subnect`, select same Subnet as Kafka instance

In `Environment Variables` add following variables:

| Key            | Value
|-----           | ----- |
| KAFKA_TOPIC    | topic for Kafka instance
| KAFKA_BROKER   | "IP:PORT" of Kafka instance
| KAFKA_CLIENTID | ClientID to use, e.g. "my-App"

In `Logs`:

* enable `Collect Logs`
* select/create Log Group
* select/create Log Stream

In `Lifecyle`:
* enable `Initialization`
* Function Initializer: `index.initializer`

## Create test event

Create a sample test event with following event data:
```json
{
  "key": "test",
  "message": "Hello T Cloud Public"
}
```
Click on `Test`

and in `DMS for Kafka` console for your Instance, select `Message Query` and `Search` for
new messages to find the created message.
