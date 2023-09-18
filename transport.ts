transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      shipping_point: {
        address: String(data.ArrayStrings[0].Shipping_Point),
        coordinates: `${data.ArrayStrings[0].Pickup_Latitude}, ${data.ArrayStrings[0].Pickup_Longitude}`,
      },
      contractor: {
        name: String(data.ContactInformation.Contractor),
        phone: String(data.ContactInformation.Phone),
      },
      delivery_time: String(data.ContactInformation.Date_Time_delivery),
      delivery_point: {
        address: `${data.ContactInformation.City}, ${data.ContactInformation.Street}, ${data.ContactInformation.Home}, ${data.ContactInformation.Apartment}}`,
        coordinates: `${data.ContactInformation.Latitude}, ${data.ContactInformation.Longitude}`,
      },
      sku_weight: Number(data.SKU_Weight),
    };
  }

  getData(): void {
    fetch('http://localhost:4000/messages', {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.ok) {
          console.log('Данные получены');
          return await response.json();
        } else {
          throw new Error('Возникла ошибка при получении данных');
        }
      })
      .then((data) => {
        const transformedData = this.transformToTransportRequest(data);
        console.log(transformedData, 'transformedData');
        this.model.transportRequests.push(transformedData,"vvv");
      })
      .catch((error) => {
        console.error(error);
      });
  }


applications.viewmodel.ts:52 TypeError: Cannot read properties of undefined (reading '0')
    at TransportRequestsViewModel.transformToTransportRequest (applications.viewmodel.ts:18:30)
    at applications.viewmodel.ts:47:38
(anonymous)	@	applications.viewmodel.ts:52
Promise.catch (async)		
getData	@	applications.viewmodel.ts:51
TransportRequestsViewModel	@	applications.viewmodel.ts:9
setup	@	applications.component.vue:30
Promise.then (async)		
(anonymous)	@	applications.component.vue:14
Show 22 more frames










[
    {
        "_id": "6507e259791fee739b362af5",
        "Number": "№№00015934",
        "Date": "14.08.2023 15:53:04",
        "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
        "DocumentStatus": "Оформлена",
        "Driver": "",
        "ISR": "(747)2667569",
        "Informal_Document": "Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12",
        "SKU_Weight": "",
        "ArrayStrings": [
            {
                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                "Goods": "",
                "Quantity": "1",
                "Item_Status": "",
                "Pickup_Point": "0",
                "Delivery_Point": "0",
                "Pickup_Latitude": "0",
                "Pickup_Longitude": "0",
                "Delivery_Latitude": "0",
                "Delivery_Longitude": "0",
                "Pickup_Time": "01.01.0001 0:00:00",
                "Delivery_Time": "01.01.0001 0:00:00"
            },
            {
                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                "Goods": "",
                "Quantity": "1",
                "Item_Status": "",
                "Pickup_Point": "0",
                "Delivery_Point": "0",
                "Pickup_Latitude": "0",
                "Pickup_Longitude": "0",
                "Delivery_Latitude": "0",
                "Delivery_Longitude": "0",
                "Pickup_Time": "01.01.0001 0:00:00",
                "Delivery_Time": "01.01.0001 0:00:00"
            }
        ],
        "ContactInformation": {
            "City": "Алматы",
            "Delivery_Condition": "Доставка",
            "Date_Time_delivery": "2023-08-16 К До 20:00",
            "Time_Window": "15:00-18:00",
            "Latitude": "43,3189165",
            "Longitude": "76,93994950000001",
            "Street": "нет данных",
            "Home": "74",
            "Phone": "(747)2667569",
            "Apartment": "нет данных",
            "Contractor": "АЛЕКСЕЙ ТРУНКИН",
            "_id": "6507e259791fee739b362af6"
        }
    },
    {
        "_id": "6507e259791fee739b362af7",
        "Number": "№№00015934",
        "Date": "14.08.2023 15:53:04",
        "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
        "DocumentStatus": "Оформлена",
        "Driver": "",
        "ISR": "(747)2667569",
        "Informal_Document": "Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12",
        "SKU_Weight": "",
        "ArrayStrings": [
            {
                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                "Goods": "",
                "Quantity": "1",
                "Item_Status": "",
                "Pickup_Point": "0",
                "Delivery_Point": "0",
                "Pickup_Latitude": "0",
                "Pickup_Longitude": "0",
                "Delivery_Latitude": "0",
                "Delivery_Longitude": "0",
                "Pickup_Time": "01.01.0001 0:00:00",
                "Delivery_Time": "01.01.0001 0:00:00"
            },
            {
                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                "Goods": "",
                "Quantity": "1",
                "Item_Status": "",
                "Pickup_Point": "0",
                "Delivery_Point": "0",
                "Pickup_Latitude": "0",
                "Pickup_Longitude": "0",
                "Delivery_Latitude": "0",
                "Delivery_Longitude": "0",
                "Pickup_Time": "01.01.0001 0:00:00",
                "Delivery_Time": "01.01.0001 0:00:00"
            }
        ],
        "ContactInformation": {
            "City": "Алматы",
            "Delivery_Condition": "Доставка",
            "Date_Time_delivery": "2023-08-16 К До 20:00",
            "Time_Window": "15:00-18:00",
            "Latitude": "43,3189165",
            "Longitude": "76,93994950000001",
            "Street": "нет данных",
            "Home": "74",
            "Phone": "(747)2667569",
            "Apartment": "нет данных",
            "Contractor": "АЛЕКСЕЙ ТРУНКИН",
            "_id": "6507e259791fee739b362af8"
        }
    }
]
