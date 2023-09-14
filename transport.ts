import { Injectable, Controller, EventPattern, Payload, Ctx, RmqContext } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Injectable()
@Controller()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @EventPattern('название_вашего_события') // Укажите соответствующий паттерн или оставьте пустым, чтобы слушать все события
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (data && data.data) {
        console.log('Сообщение получено:', data.data);
        await this.messageService.create(data.data);
        console.log('Сообщение сохранено');
        channel.ack(originalMsg);
      } else {
        console.error('Некорректный формат сообщения');
      }
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  }
}
