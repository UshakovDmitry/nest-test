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

// Начало изменений для соответствия новому формату ArrayChronologies
@Schema()
class Chronology {
  @Prop()
  TypeOperation: string;

  @Prop({ type: [String] })
  statuses: string[];
}

@Schema({ versionKey: false })
class ArrayChronologies {
  @Prop()
  PPO: string;

  @Prop({ type: [Chronology] })
  Chronology: Chronology[];
}
// Конец изменений

@Schema({ versionKey: false })
export class Message {
  @Prop()
  Number: string;
  @Prop()
  Date: string;
  @Prop()
  City: string;
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
  DriverIIN: string;
  @Prop()
  PhoneDriver: string;
  @Prop()
  ISR: string;
  @Prop()
  NumberPPO: string;
  @Prop()
  TypePayment: string;
  @Prop()
  loanAgreementStatus: string;
  @Prop()
  IdYandex: string;
  @Prop()
  distribution: boolean;
  @Prop()
  Informal_Document: string;
  @Prop()
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
  @Prop()
  CompletedDelivery: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

