import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';
import { MessageController } from './message.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
  сontrollers: [MessageController],
})
export class MessageModule {}


Argument of type '{ imports: DynamicModule[]; providers: (typeof MessageService)[]; exports: (typeof MessageService)[]; сontrollers: (typeof MessageController)[]; }' is not assignable to parameter of type 'ModuleMetadata'.
  Object literal may only specify known properties, but 'сontrollers' does not exist in type 'ModuleMetadata'. Did you mean to write 'controllers'?ts(2345)
(property) сontrollers: (typeof MessageController)[]
