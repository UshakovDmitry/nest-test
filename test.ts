@RabbitSubscribe({
  exchange: 'TmsExchange',
  routingKey: 'tms1c',
  queue: 'TmsQueue',
})
public async handleMessage(message: any) {
  console.log('Received full message:', JSON.stringify(message));
  this.logger.log(`Received message: ${JSON.stringify(message)}`);
}
