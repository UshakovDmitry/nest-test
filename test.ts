// message.schema.ts
import { Document, Schema } from 'mongoose';

const ArrayStringSchema = new Schema({
  Shipping_Point: String,
  Goods: String,
  Quantity: String,
  Item_Status: String,
  Pickup_Point: String,
  Delivery_Point: String,
  Pickup_Latitude: String,
  Pickup_Longitude: String,
  Delivery_Latitude: String,
  Delivery_Longitude: String,
  Pickup_Time: String,
  Delivery_Time: String
});

const ContactInformationSchema = new Schema({
  City: String,
  Delivery_Condition: String,
  Date_Time_delivery: String,
  Time_Window: String,
  Latitude: String,
  Longitude: String,
  Street: String,
  Home: String,
  Phone: String,
  Apartment: String,
  Contractor: String
});

export const MessageSchema = new Schema({
  Number: String,
  Date: String,
  Organization: String,
  DocumentStatus: String,
  Driver: String,
  ISR: String,
  Informal_Document: String,
  SKU_Weight: String,
  ArrayStrings: [ArrayStringSchema],
  ContactInformation: ContactInformationSchema
});

export interface Message extends Document {
  Number: string;
  Date: string;
  Organization: string;
  DocumentStatus: string;
  Driver: string;
  ISR: string;
  Informal_Document: string;
  SKU_Weight: string;
  ArrayStrings: typeof ArrayStringSchema[];
  ContactInformation: typeof ContactInformationSchema;
}



// message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async create(messageDto: any): Promise<Message> {
    const createdMessage = new this.messageModel(messageDto);
    return createdMessage.save();
  }
}





// app.module.ts
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  ...
})


  PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/app.module.ts:5:31 - error TS2307: Cannot find module './message/message.schema' or its corresponding type decla
rations.

5 import { MessageSchema } from './message/message.schema';
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~
src/message/message.service.ts:4:25 - error TS2307: Cannot find module './message.schema' or its corresponding type
declarations.

4 import { Message } from './message.schema';
                          ~~~~~~~~~~~~~~~~~~

Found 2 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
  
