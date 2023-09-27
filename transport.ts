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
class Chronology {
  @Prop()
  PPO: string;
 
}


@Schema({ versionKey: false })
class ArrayChronologies {
  @Prop()
  PPO: string;
  @Prop()
  Chronology: Chronology[];
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
  Informal_Document: string;
  @Prop()
  SKU_Weight: string;
  @Prop({ type: mongoose.Schema.Types.Array })
  ArrayStrings: ArrayStrings[];
  @Prop()
  ContactInformation: ContactInformation;
  StructureQuantities: StructureQuantities;
  ArrayChronologies: ArrayChronologies[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
