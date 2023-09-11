export interface QueueMessage {
  payload_bytes: number;
  redelivered: boolean;
  exchange: string;
  routing_key: string;
  message_count: number;
  properties: MessageProperties;
  payload: Payload;
  payload_encoding: string;
}

export interface MessageProperties {
  headers: {
    [key: string]: any;
  };
}

export interface Payload {
  Number: string;
  Date: string;
  Organization: string;
  DocumentStatus: string;
  Driver: string;
  ISR: string;
  Informal_Document: string;
  SKU_Weight: string;
  ArrayStrings: ArrayString[];
  ContactInformation: ContactInformation;
}

export interface ArrayString {
  Shipping_Point: string;
  Goods: string;
  Quantity: string;
  Item_Status: string;
  Pickup_Point: string;
  Delivery_Point: string;
  Pickup_Latitude: string;
  Pickup_Longitude: string;
  Delivery_Latitude: string;
  Delivery_Longitude: string;
  Pickup_Time: string;
  Delivery_Time: string;
}

export interface ContactInformation {
  City: string;
  Delivery_Condition: string;
  Date_Time_delivery: string;
  Time_Window: string;
  Latitude: string;
  Longitude: string;
  Street: string;
  Home: string;
  Phone: string;
  Apartment: string;
  Contractor: string;
}
