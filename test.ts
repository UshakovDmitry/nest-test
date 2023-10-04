У меня есть метод сохранения в базу данных который смотрит по ключу и либо обновляет либо добавляет новую запись
вот его код
async saveMessage(messageData) {
        try {
            const parsedData = typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
            const currentDate = new Date();
            parsedData.DateCreated = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            const existingMessage = await this.messageModel
                .findOne({ Number: parsedData.Number })
                .exec();
            if (existingMessage) {
                const updatedMessage = await this.messageModel
                    .findOneAndUpdate({ Number: parsedData.Number }, parsedData, {
                    new: true,
                })
                    .exec();
                console.log('Обновил сообщение:', updatedMessage.Number);
                return updatedMessage;
            }
            else {
                const createdMessage = new this.messageModel(parsedData);
                console.log('Новое сообщение в бд:', createdMessage.Number);
                return createdMessage.save();
            }
        }
        catch (error) {
            console.error('Ошибка сохранения в бд:', error);
            throw error;
        }
    }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = Document & Message;

Вот схема по которой он записывает сообщения в бд
@Schema()
class ArrayStrings {
  @Prop()
  Shipping_Point: string;
  @Prop()
  Goods: string;
  @Prop()
  Quantity: string;
  @Prop()
  Item_Status: string;
  @Prop()
  Pickup_Point: string;
  @Prop()
  Delivery_Point: string;
  @Prop()
  Pickup_Latitude: string;
  @Prop()
  Pickup_Longitude: string;
  @Prop()
  Delivery_Latitude: string;
  @Prop()
  Delivery_Longitude: string;
  @Prop()
  Pickup_Time: string;
  @Prop()
  Delivery_Time: string;
}

@Schema()
class ContactInformation {
  @Prop()
  City: string;
  @Prop()
  Delivery_Condition: string;
  @Prop()
  Date_Time_delivery: string;
  @Prop()
  Time_Window: string;
  @Prop()
  Latitude: string;
  @Prop()
  Longitude: string;
  @Prop()
  Street: string;
  @Prop()
  Home: string;
  @Prop()
  Phone: string;
  @Prop()
  Apartment: string;
  @Prop()
  Contractor: string;
}

@Schema({ versionKey: false })
class StructureQuantities {
  @Prop()
  TotalWeight: string;
  @Prop()
  TotalAmount: string;
}

@Schema({ versionKey: false })
class ArrayChronologies {
  @Prop()
  PPO: string;

  @Prop([String])
  Chronology: string[];
}

@Schema({ versionKey: false })
export class Message {
  @Prop()
  Number: string;
  @Prop()
  Date: string;
  @Prop()
  DateCreated: string;
  @Prop()
  Organization: string;
  @Prop()
  DocumentStatus: string;
  @Prop()
  CarModel: string;
  @Prop()
  NumberCar: string;
  @Prop()
  Driver: string;
  @Prop()
  ISR: string;
  @Prop()
  NumberPPO: string;
  @Prop()
  TypePayment: string;
  @Prop()
  loanAgreementStatus: string;
  @Prop()
  Informal_Document: string;
  @Prop()
  FilterContractor: string;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayStrings: ArrayStrings[];
  @Prop()
  ContactInformation: ContactInformation;
  @Prop()
  StructureQuantities: StructureQuantities;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayChronologies: ArrayChronologies[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);

Я хочу реализовать еще один функционал при сохранении или обновлении в бд
У меня в ContactInformation есть поле City с городом но оно приходит иногда неправильно насанным 
поэтому перед запись я хочу отправлять его по этому url черз get запрос и от туда вытаскивать валидный город

GET https://geocode-maps.yandex.ru/1.x/?format=json&apikey=06c9301e-6663-4182-b060-81da5969b5f3&geocode=Устькаменогорск,

из response.GeoObjectCollection.featureMember[0].GeoObject.name
взять это название города и присвоить в сообщение для записи или обновления на уровень выше 

@Schema({ versionKey: false })
export class Message {
  @Prop()
  Number: string;

ВОТ ТУТ ДОБАВИТЬ CITY изаписать это значение
  @Prop()
  Date: string;
  @Prop()
  DateCreated: string;
  @Prop()
  Organization: string;
  @Prop()
  DocumentStatus: string;
  @Prop()
  CarModel: string;
  @Prop()
  NumberCar: string;
  @Prop()
  Driver: string;
  @Prop()
  ISR: string;
  @Prop()
  NumberPPO: string;
  @Prop()
  TypePayment: string;
  @Prop()
  loanAgreementStatus: string;
  @Prop()
  Informal_Document: string;
  @Prop()
  FilterContractor: string;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayStrings: ArrayStrings[];
  @Prop()
  ContactInformation: ContactInformation;
  @Prop()
  StructureQuantities: StructureQuantities;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayChronologies: ArrayChronologies[];
}


