npm install @nestjs/axios axios


import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { HttpModule } from '@nestjs/axios'; // <-- Измененный импорт

@Module({
  imports: [HttpModule.register({})],  // Используйте .register({}), если вам нужна дополнительная конфигурация
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})
export class RabbitMQModule {}







import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // <-- Измененный импорт

@Injectable()
export class RabbitMQService {
  // ... (оставьте как есть)
}
