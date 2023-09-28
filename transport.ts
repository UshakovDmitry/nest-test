я хочу добавить логику которая будет добавлять в обьект записи поле "created" в которое я буду записывать текущую дату  
функция записи в бд
async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const createdMessage = new this.messageModel(parsedData);
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  
схема записи
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = Document & Message;

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
  Organization: string;
  @Prop()
  DocumentStatus: string;
  @Prop()
  Driver: string;
  @Prop()
  ISR: string;
  @Prop()
  NuberPPO: string;
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




const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`; // Форматирование даты


export const MessageSchema = SchemaFactory.createForClass(Message);
