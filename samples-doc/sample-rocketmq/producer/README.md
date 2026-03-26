# DMS for RocketMQ producer sample

This is a very simple sample on how to send messages to a RocketMQ instance.

## Prerequisites

* RocketMQ Instance created with correct:
  * VPC
  * Subnet
  * Security Group
  * Topic
  
  (see: [Creating a Rocket Instance](https://docs.otc.t-systems.com/distributed-message-service/umn/creating_a_rocketmq_instance.html) in User Guide)

* Agency with following permissions:
  * `DMS ReadOnly Access`

## Create deployment package

```
# Use node version 20.15.1:
nvm use 20.15.1

npm pack
```

will produce deployment zip file `sample-rocketmq-producer.zip`

## Create FunctionGraph

Create FunctionGraph event function using:

* Create from Scratch
* Type: Event Function
* Name: SampleRocketMQProducer
* Runtime: Node.js20.15
* Agency: Choose Agency (see Prerequisites)
* Region: Same Region as RocketMQ Instance

In `Code` Section:

Upload deployment zip `sample-rocketmq-producerr.zip`

In `Basic Settings`:

* Handler name: index.handler

In `Permissions`:

* check for correct agency (see Prerequisites)

In `Network`:

* enable `VPC Access`
* As `VPC`, select same VPC as RocketMQ instance
* As `Subnect`, select same Subnet as RocketMQ instance

In `Environment Variables` add following variables:

| Key               | Value
|-----              | ----- |
| ROCKETMQ_TOPIC    | topic for RocketMQ instance
| ROCKETMQ_ENDPOINT | "IP:PORT" of RocketMQ instance (Port 8080)


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

and in `DMS for RocketMQ` console for your Instance, select `Message Query` and `Search` for
new messages to find the created message.
