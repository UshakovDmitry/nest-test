// src/rabbitmq/rabbitmq.module.ts
import { Module, HttpModule } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [RabbitMQService],
  controllers: [RabbitMQController],
})
export class RabbitMQModule {}
