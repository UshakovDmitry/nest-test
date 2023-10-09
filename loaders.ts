import router from '../../router';
import { useGetApi } from '../../domain/services/getHTTP.service';
// import { IDashboardDriver } from '../../domain/interfaces/dashboard.interface';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';
import { type CouriersModel } from './couriers.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';
export interface ICourier {
  courierFullName: string;
  carNumber: string;
  type: string;
  schedule: string;
  hardWindow: string;
  returnToWarehouse: string;
  city: string;
  // phoneNumber: string;
  // isActive: string;
}

export class CouriersViewModel {
  model: CouriersModel;

  constructor(model: CouriersModel) {
    this.model = model;
    this.getCouriers();
  }

  // getCouriers(): void {
  async getCouriers(): Promise<void> {
    try {
      const response = await useGetApi('getCouriers');
      console.log(response, 'response');
      const courier: ICourier = {}
      response.forEach((item: ICourier) => {
        courier.courierFullName = item.Drivers;
        courier.carNumber = item.carNumber;
        courier.type = item.TypeHiring;
        courier.schedule = item.Schedule;
        courier.hardWindow = item.HardTimeWindow;
        courier.returnToWarehouse = item.ReturnWarehouse;
        courier.city = item.City;
        // courier.phoneNumber = item.PhoneNumber;
        // courier.isActive = item.IsActive;
      }
      );

      // this.model.couriers = response;
    } catch (error) {
      throw error;
    }
  }


Type '{}' is missing the following properties from type 'ICourier': courierFullName, carNumber, type, schedule, and 3 more.ts(2740)
Property 'Drivers' does not exist on type 'ICourier'.ts(2339)
Property 'Schedule' does not exist on type 'ICourier'. Did you mean 'schedule'?ts(2551)


