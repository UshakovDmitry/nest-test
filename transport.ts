я хочу при добавлении в базу данных проверять существует ли в ней уже экземпляр с таким номером (Number1С)
если нет тогда записывать в бд
если сущеествует то заменять 

вот  db.service.ts где метод saveMessage записывает в бд
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class DBService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
        // TODO - Создание поля DateCreated для дальнейшей сортировки по дате
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      const createdMessage = new this.messageModel(parsedData);
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }
}

исправь
и сделай так чтобы в консле лог я видел когда перезаписалось а когда просто добавилось



в таком виде записываются сообщения в бд монго
_id
65154daa03b9687f105042a2
Number
"№№00015684"
Date
"27.09.2023 11:03:39"
DateCreated
"28-9-2023"
Organization
"TOO Gulser Computers (Гулсер Компьютерс)"
DocumentStatus
"Доставляется"
Driver
"Чунаев Марат Чакенович"
ISR
"240783461"
NuberPPO
"8149234"
TypePayment
"Кредит"
loanAgreementStatus
"ОПЛАЧЕН"
Informal_Document
"Заказ покупателя ППО"
FilterContractor
"Alser"

ArrayStrings
Array (1)

ContactInformation
Object

StructureQuantities
Object

ArrayChronologies
Array (1)
Array (1)
