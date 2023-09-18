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
