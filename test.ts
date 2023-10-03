{
    "_id": "65166aa64a53e0d6011408da",
    "Number": "№№00015684",
    "Date": "27.09.2023 11:03:39",
    "DateCreated": "29-9-2023",
    "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
    "DocumentStatus": "Повреждение товара",
    "Driver": "Чунаев Марат Чакенович",
    "ISR": "240783461",
    "NuberPPO": "8149234",
    "TypePayment": "Кредит",
    "loanAgreementStatus": "ОПЛАЧЕН",
    "Informal_Document": "Заказ покупателя ППО",
    "FilterContractor": "Alser",
    "ArrayStrings": [
        {
            "NuberPPO": "8149234",
            "PPOStatus": "Сделка завершена",
            "SKU": "1330426",
            "Goods": "Умная Колонка Яндекс.Станция Лайт, Мята (YNDX-00025 Green)",
            "Count": "1",
            "ShippingAddress": "Almaty, Rayymbeka, 127/147",
            "Brand": "Яндекс",
            "Weight": "0,4",
            "Price": "27 990",
            "Item_Status": "Забран",
            "Pickup_Point": "1",
            "Delivery_Point": "2",
            "Pickup_Latitude": "12",
            "Pickup_Longitude": "15",
            "Delivery_Latitude": "15",
            "Delivery_Longitude": "14",
            "Pickup_Time": "01.01.0001 9:00:00",
            "Delivery_Time": "01.01.0001 15:00:00"
        }
    ],
    "ContactInformation": {
        "City": "Алматы",
        "Delivery_Condition": "Доставка",
        "Date_Time_delivery": "2023-02-03 До 20:00",
        "Time_Window": "нет данных",
        "Latitude": "43,253029",
        "Longitude": "76,938656",
        "Street": "Кайсар Плаза",
        "Home": "115",
        "Phone": "(706)4192015",
        "Apartment": "Кайсар Плаза",
        "Contractor": "Таирова Жанета",
        "_id": "651699e0a26df6599121d3b0"
    },
    "StructureQuantities": {
        "TotalWeight": "0.4",
        "TotalAmount": "27990",
        "_id": "651699e0a26df6599121d3b1"
    },
    "ArrayChronologies": [
        {
            "PPO": "8149234",
            "Chronology": [
                "Оформлен",
                "Доставляется до клиента (на складе отгрузки)",
                "Доставляется",
                "Сделка завершена"
            ]
        }
    ],
    "CarModel": "Gazel",
    "NumberCar": "M121240"
}

import { useGetApi } from '../../domain/services/getHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequests();
  }

  async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    response.forEach((data: any) => {
      console.log(data, 'data');

      const transformedData = this.transformToTransportRequest(data);
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
      this.model.transportRequests.push(transformedDataForTable);
    });
  }

  selectCity(city: string): void {
    console.log(city);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  goToTransportRequestDetail(row: any) {
    router.push({
      name: 'ApplicationDetail',
      params: { id: row.number },
      query: {
        number: row.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NuberPPO),
      organization: String(data.Organization),
      typePayment: String(data.TypePayment),
      loanAgreementStatus: String(data.loanAgreementStatus),
      quantities: data.StructureQuantities,
      chronologies: data.ArrayChronologies,
      contactInformation: data.ContactInformation,
      orders: data.ArrayStrings,
      dataCreated: String(data.DateCreated),
      date: String(data.Date),
      driver: String(data.Driver),
      fiterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    return {
      number: String(data.number),
      status: String(data.status),
      ISR: String(data.ISR),
      document: String(data.document),
      // shippingAddress: {
      //   address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
      //   coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      // },
      recipient: {
        name: String(data.contactInformation.Contractor),
        phone: String(data.contactInformation.Phone),
      },
      deliveryTime: {
        date: String(data.date),
        time: String(data.contactInformation.Date_Time_delivery),
      },
      deliveryAddress: {
        address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
        coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      },
      quantitties: {
        totalPrice: String(data.StructureQuantities.TotalAmount),
        totalWeight: String(data.StructureQuantities.TotalWeight),
      },
    };
  }
}

applications.viewmodel.ts:90 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'TotalAmount')
    at TransportRequestsViewModel.transformToTransportForTable (applications.viewmodel.ts:90:53)
    at applications.viewmodel.ts:21:14
    at Array.forEach (<anonymous>)
    at TransportRequestsViewModel.getTransportRequests (applications.viewmodel.ts:16:14)
