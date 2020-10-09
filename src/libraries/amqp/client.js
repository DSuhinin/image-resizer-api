const log = require("debug")("express:amqp");
const amqp = require("amqplib");

async function sendToQueue(message) {
  const connection = await amqp.connect(process.env.AMQP_HOST);
  const channel = await connection.createChannel();
  channel.assertQueue("tasks", {
    durable: false,
  });

  const jsonData = JSON.stringify(message);
  log(`data to send to queue: ${jsonData}`);
  return await channel.sendToQueue("tasks", Buffer.from(jsonData));
}
module.exports = {
  sendToQueue,
};
