import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  providers: [MessageService],
  exports: [MessageService, MongooseModule]
})
export class MessageModule {}




import { MessageModule } from './message/message.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    // ... (остальные модули)
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService], // Удалите MessageService, так как он теперь экспортируется из MessageModule
})
export class AppModule {}



