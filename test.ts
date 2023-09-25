export interface IContactInformation {
  city: string;
  deliveryCondition: string;
  dateTimeDelivery: string;
  timeWindow: string;
  latitude: string;
  longitude: string;
  street: string;
  home: string;
  phone: string;
  apartment: string;
  contractor: string;
  id: string;
}

import { type IOrder } from './order.interface';

export interface IDriver {
  id: number;
  status: string;
  fullName: string;
  phone: string;
  car_model: string;
  car_number: string;
  all_orders: number | string;
  completed_orders: number | string;
  delayed_orders: number | string;
  orders_on_time: number | string;
  current_order: string;
  current_location: string;
  isActive?: boolean;
  orders: IOrder[];
}

export interface ILoader {
  fullName: string;
  warehouseNumber: string;
  schedule: string;
  carNumber: string;
  isActive: boolean;
}
export interface IOrder {
  shippingPoint: string;
  goods: string;
  quantity: string;
  itemStatus: string;
  pickupPoint: string;
  deliveryPoint: string;
  pickupLatitude: string;
  pickupLongitude: string;
  deliveryLatitude: string;
  deliveryLongitude: string;
  pickupTime: string;
  deliveryTime: string;
}

export interface ITransport {
  model: number | string;
  number: number | string;
  type: string;
  volume: string;
  loadCapacity: number | string;
  city: number | string;
  isActive: boolean;
  hasDriver: boolean;
  schedule: string;
}

import { type IContactInformation } from './contactInformation.interface';
import { type IOrder } from './order.interface';

export interface ITransportRequest {
  id: string;
  number: string;
  date: string;
  organization: string;
  documentStatus: string;
  driver: string;
  ISR: string;
  informalDocument: string;
  skuWeight: string;
  orders: IOrder[];
  contactInformation: IContactInformation;
}




{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./",
    "paths": {
      "@interfaces/*": ["src/domain/interfaces/*"],
      "@entities/*": ["src/domain/entities/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "src/**/*.vue.js"],
  "references": [{ "path": "./tsconfig.node.json" }]
}





import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@interfaces': path.resolve(__dirname, 'src/domain/interfaces/'),
      '@entities': path.resolve(__dirname, 'src/domain/entities/')
    }
  }
});

