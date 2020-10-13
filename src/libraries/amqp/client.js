const log = require("debug")("express:amqp");
const amqp = require("amqplib");

async function sendToQueue(message) {
  const connection = await amqp.connect(process.env.AMQP_HOST);
  if (!connection) {
    throw new Error("impossible to create AMQP connection");
  }
  const channel = await connection.createChannel();
  if (!channel) {
    throw new Error("impossible to create AMQP channel");
  }

  const jsonData = JSON.stringify(message);
  log(`data to send to queue: ${jsonData}`);
  return await channel.sendToQueue("tasks", Buffer.from(jsonData));
}
module.exports = {
  sendToQueue,
};
