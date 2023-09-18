import { Schema } from 'mongoose';

const ArrayStringsSchema = new Schema({
  Shipping_Point: { type: String, default: '' },
  Goods: { type: String, default: '' },
  Quantity: { type: String, default: '' },
  Item_Status: { type: String, default: '' },
  Pickup_Point: { type: String, default: '' },
  Delivery_Point: { type: String, default: '' },
  Pickup_Latitude: { type: String, default: '' },
  Pickup_Longitude: { type: String, default: '' },
  Delivery_Latitude: { type: String, default: '' },
  Delivery_Longitude: { type: String, default: '' },
  Pickup_Time: { type: String, default: '' },
  Delivery_Time: { type: String, default: '' },
});

const ContactInformationSchema = new Schema({
  City: { type: String, default: '' },
  Delivery_Condition: { type: String, default: '' },
  Date_Time_delivery: { type: String, default: '' },
  Time_Window: { type: String, default: '' },
  Latitude: { type: String, default: '' },
  Longitude: { type: String, default: '' },
  Street: { type: String, default: 'нет данных' },
  Home: { type: String, default: 'нет данных' },
  Phone: { type: String, default: '' },
  Apartment: { type: String, default: 'нет данных' },
  Contractor: { type: String, default: '' },
});

export const MessageSchema = new Schema(
  {
    Number: { type: String, default: '' },
    Date: { type: Date, default: Date.now },
    Organization: { type: String, default: '' },
    DocumentStatus: { type: String, default: '' },
    Driver: { type: String, default: '' },
    ISR: { type: String, default: '' },
    Informal_Document: { type: String, default: '' },
    SKU_Weight: { type: String, default: '' },
    ArrayStrings: { type: [ArrayStringsSchema], default: [] },
    ContactInformation: { type: ContactInformationSchema, default: {} },
  },
  { versionKey: false },
);
