import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = Document & Message;

@Schema()
class ArrayStrings {
  @Prop({ trim: true })
  Shipping_Point: string;
  @Prop({ trim: true })
  Goods: string;
  @Prop({ trim: true })
  Quantity: string;
  @Prop({ trim: true })
  Item_Status: string;
  @Prop({ trim: true })
  Pickup_Point: string;
  @Prop({ trim: true })
  Delivery_Point: string;
  @Prop({ trim: true })
  Pickup_Latitude: string;
  @Prop({ trim: true })
  Pickup_Longitude: string;
  @Prop({ trim: true })
  Delivery_Latitude: string;
  @Prop({ trim: true })
  Delivery_Longitude: string;
  @Prop({ trim: true })
  Pickup_Time: string;
  @Prop({ trim: true })
  Delivery_Time: string;
}

@Schema()
class ContactInformation {
  @Prop({ trim: true })
  City: string;
  @Prop({ trim: true })
  Delivery_Condition: string;
  @Prop({ trim: true })
  Date_Time_delivery: string;
  @Prop({ trim: true })
  Time_Window: string;
  @Prop({ trim: true })
  Latitude: string;
  @Prop({ trim: true })
  Longitude: string;
  @Prop({ trim: true })
  Street: string;
  @Prop({ trim: true })
  Home: string;
  @Prop({ trim: true })
  Phone: string;
  @Prop({ trim: true })
  Apartment: string;
  @Prop({ trim: true })
  Contractor: string;
}

@Schema({ versionKey: false })
class StructureQuantities {
  @Prop({ trim: true })
  TotalWeight: string;
  @Prop({ trim: true })
  TotalAmount: string;
}

@Schema()
class Chronology {
  @Prop({ trim: true })
  TypeOperation: string;
  @Prop({ type: [String], trim: true })
  statuses: string[];
}

@Schema({ versionKey: false })
class ArrayChronologies {
  @Prop({ trim: true })
  PPO: string;
  @Prop({ type: [Chronology] })
  Chronology: Chronology[];
}

@Schema({ versionKey: false })
export class Message {
  @Prop({ trim: true })
  Number: string;
  @Prop({ trim: true })
  Date: string;
  @Prop({ trim: true })
  City: string;
  @Prop({ trim: true })
  DateCreated: string;
  @Prop({ trim: true })
  Organization: string;
  @Prop({ trim: true })
  DocumentStatus: string;
  @Prop({ trim: true })
  CarModel: string;
  @Prop({ trim: true })
  NumberCar: string;
  @Prop({ trim: true })
  Driver: string;
  @Prop({ trim: true })
  DriverIIN: string;
  @Prop({ trim: true })
  PhoneDriver: string;
  @Prop({ trim: true })
  ISR: string;
  @Prop({ trim: true })
  NumberPPO: string;
  @Prop({ trim: true })
  TypePayment: string;
  @Prop({ trim: true })
  loanAgreementStatus: string;
  @Prop({ trim: true })
  IdYandex: string;
  @Prop()
  distribution: boolean;
  @Prop({ trim: true })
  Informal_Document: string;
  @Prop({ trim: true })
  FilterContractor: string;
  @Prop()
  IsDelete: boolean;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayStrings: ArrayStrings[];
  @Prop()
  ContactInformation: ContactInformation;
  @Prop()
  StructureQuantities: StructureQuantities;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayChronologies: ArrayChronologies[];
  @Prop({ trim: true })
  CompletedDelivery: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

