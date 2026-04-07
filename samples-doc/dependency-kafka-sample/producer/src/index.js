const { Kafka } = require("kafkajs");

class KafkaMessageData {
  constructor(event) {
    this._event = event || {};
  }

  getKey() {
    return this._event.key || "";
  }
  getMessage() {
    return this._event.message || "";
  }
}

let kafka;

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("initializing kafka client...:");

  let err = null;

  try {
    kafka = new Kafka({
      clientId: context.getUserData("KAFKA_CLIENTID"),
      brokers: [context.getUserData("KAFKA_BROKER")],
    });
  } catch (error) {
    logger.error("Error initializing Kafka client:", error);
    err = error;
  }

  callback(err, "");
};

exports.handler = async (event, context) => {
  const logger = context.getLogger();

  const kafkaMessageData = new KafkaMessageData(event);

  const topic = context.getUserData("KAFKA_TOPIC");
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      {
        key: kafkaMessageData.getKey(),
        value: kafkaMessageData.getMessage(),
      },
    ],
  });
  logger.info(`Message sent to Kafka topic ${topic}:`, {
    key: kafkaMessageData.getKey(),
    message: kafkaMessageData.getMessage(),
  });

  await producer.disconnect();

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify({
      key: kafkaMessageData.getKey(),
      message: kafkaMessageData.getMessage(),
    }),
  };
  return output;
};
