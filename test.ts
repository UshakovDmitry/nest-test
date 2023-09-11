import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get('read')
  async readFromQueue() {
    return await this.rabbitMQService.readFromQueue();
  }
}



import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller'; // <-- Новый импорт
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  controllers: [RabbitMQController], // <-- Добавьте контроллер здесь
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})
export class RabbitMQModule {}



http://localhost:3000/rabbitmq/read
