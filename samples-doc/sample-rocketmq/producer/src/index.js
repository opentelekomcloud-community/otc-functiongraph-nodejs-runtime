const { Producer } = require("rocketmq-client-nodejs");

class RocketMQMessageDataEvent {
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

/**
 * 
 * @param {RocketMQMessageDataEvent} event 
 * @returns {Promise<Object>}
 */
exports.handler = async (event, context) => {
  const logger = context.getLogger();

  const rocketMQMessageData = new RocketMQMessageDataEvent(event);

  const topic = context.getUserData("ROCKETMQ_TOPIC");

  logger.info("Producer configure...");
  const producer = new Producer({
      sslEnabled: false,
      // :8080 for gRPC Connection Address IPv4
      endpoints: context.getUserData("ROCKETMQ_ENDPOINT")+":8080",
      logger: console,
    });

  logger.info("Producer startup...");
  await producer.startup();

  logger.info("Sending message...");
  const receipt = await producer.send({
    topic: topic,
    tag: "nodejs-demo",
    body: Buffer.from(
      JSON.stringify({
        hello: "rocketmq-client-nodejs world",
        now: Date(),
      }),
    ),
  });
  logger.info("Closing producer...");

  await producer.shutdown();

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    // body: JSON.stringify({
    //   key: rocketMQMessageData.getKey(),
    //   message: rocketMQMessageData.getMessage(),
    // }),
    body: "Hello RocketMQ - Producer",
  };
  return output;
};
