import { Schema } from 'mongoose';

const ArrayStringsSchema = new Schema({
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
  Delivery_Time: String,
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
  Contractor: String,
});

export const MessageSchema = new Schema(
  {
    Number: String,
    Date: Date,
    Organization: String,
    DocumentStatus: String,
    Driver: String,
    ISR: String,
    Informal_Document: String,
    SKU_Weight: String,
    ArrayStrings: [ArrayStringsSchema],
    ContactInformation: ContactInformationSchema,
  },
  { versionKey: false },
);

вот пример сообщения из очереди
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
]
[
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
] messageData!
Сохранено в базу данных: [
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
]
[
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
