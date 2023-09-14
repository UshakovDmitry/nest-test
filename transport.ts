@EventPattern()
async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Получено сообщение:', originalMsg);

    try {
        if (data && data.data) {
            console.log('Сообщение получено:', data.data);
            await this.messageService.create(data.data);
            console.log('Сообщение сохранено');

            console.log('Отправка подтверждения для сообщения:', originalMsg);
            channel.ack(originalMsg);
            console.log('Подтверждение отправлено.');
        } else {
            console.error('Некорректный формат сообщения');
        }
    } catch (error) {
        console.error('Ошибка при сохранении', error);
    }
}
