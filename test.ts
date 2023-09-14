@EventPattern('get_message')
async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
  const channel = context.getChannelRef();
  const originalMsg = context.getMessage();
  console.log('Received message:', data);
  try {
    await this.messageService.create(data);
    console.log('Message saved successfully');
    channel.ack(originalMsg);
  } catch (error) {
    console.error('Error saving message:', error);
  }
}
