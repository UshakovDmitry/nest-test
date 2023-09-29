{
    "_id": "651683d0d7b61857e85423be",
    "Number": "№№00146416",
    "Date": "28.09.2023 19:41:09",
    "DateCreated": "29-9-2023",
    "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
    "DocumentStatus": "Доставлено",
    "CarModel": "",
    "NumberCar": "",
    "Driver": "Джунусов Нурбол Еркинович",
    "ISR": "(707)7539770",
    "NuberPPO": "8768764",
    "TypePayment": "KASPI QR",
    "loanAgreementStatus": "",
    "Informal_Document": "Заказ покупателя ППО",
    "FilterContractor": "Alser",
    "ArrayStrings": [
        {
            "NuberPPO": "8768763",
            "PPOStatus": "Доставляется",
            "SKU": "1382130",
            "Goods": "F2J3NS0W/ Стиральная машина LG",
            "Count": "1",
            "ShippingAddress": "Almaty, Kabdolova, 1/4",
            "Brand": "lg",
            "Weight": "64",
            "Price": "180 490",
            "Item_Status": "Доставлено",
            "Pickup_Point": "0",
            "Delivery_Point": "0",
            "Pickup_Latitude": "43,366674",
            "Pickup_Longitude": "76,970839",
            "Delivery_Latitude": "0",
            "Delivery_Longitude": "0",
            "Pickup_Time": "01.01.0001 0:00:00",
            "Delivery_Time": "01.01.0001 0:00:00"
        },
        {
            "NuberPPO": "8768764",
            "PPOStatus": "Доставляется",
            "SKU": "1318776",
            "Goods": "RB33A32N0SA/WT/Холодильник Samsung",
            "Count": "1",
            "ShippingAddress": "Almaty, Kabdolova, 1/4",
            "Brand": "samsung",
            "Weight": "71",
            "Price": "261 240",
            "Item_Status": "Доставлено",
            "Pickup_Point": "0",
            "Delivery_Point": "0",
            "Pickup_Latitude": "43,366674",
            "Pickup_Longitude": "76,970839",
            "Delivery_Latitude": "0",
            "Delivery_Longitude": "0",
            "Pickup_Time": "01.01.0001 0:00:00",
            "Delivery_Time": "01.01.0001 0:00:00"
        }
    ],
    "ContactInformation": {
        "City": "Алматы",
        "Delivery_Condition": "Доставка",
        "Date_Time_delivery": "2023093000  До 20:00",
        "Time_Window": "18:00-20:00",
        "Latitude": "1.0",
        "Longitude": "1.0",
        "Street": "214",
        "Home": "1/18",
        "Phone": "(707)7539770",
        "Apartment": "214",
        "Contractor": "ДАРХАН НУРГАЛИЕВ",
        "_id": "65169a1c48d994325fef4b0e"
    },
    "StructureQuantities": {
        "TotalWeight": "135",
        "TotalAmount": "441730",
        "_id": "65169a1c48d994325fef4b0f"
    },
    "ArrayChronologies": [
        {
            "PPO": "8768763",
            "Chronology": [
                "Оформлен",
                "Доставляется до клиента (на складе отгрузки)",
                "Доставляется"
            ]
        },
        {
            "PPO": "8768764",
            "Chronology": [
                "Оформлен",
                "Доставляется до клиента (на складе отгрузки)",
                "Доставляется"
            ]
        }
    ]
}


мне приходят вот такие данные с бекенда
мне нужно преобразовать их
я пишу функцию которая это делает
мне нужно получить массив SKU из каждого элеманта массива ArrayStrings, я никогда не знаю сколько придет там элементов

допиши логику 
  async getTransportRequestByNumber() {
    try {
      const response = await fetch(
        'http://localhost:4000/api/getTransportRequests/byNumber',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: router.currentRoute.value.query.number,
          }),
        },
      );

      if (!response.ok) {
        console.error('Сетевой ответ не был ok.', response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data, 'data');
      const transportRequestDeliveryItem = this.setDataDelivery(data);
      const transportRequestRecipientItem = this.setDataRecipient(data);
      this.model.transportRequestDelivery.push(transportRequestDeliveryItem);
      this.model.transportRequestRecipient.push(transportRequestRecipientItem);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
  setDataDelivery(data: any) {
    return {
      numberPPO: data.NuberPPO,
      number1C: data.Number,
      ISR: data.ISR,
      status: data.DocumentStatus,
      courier: {
        name: data.Driver,
        phone: data.FilterContractor,
      },
      delivery: {
        date: data.Date,
        time: data.Date,
      },
    };
  }
  setDataRecipient(data: any) {
    return {
      recipient: {
        name: data.ContactInformation.Contractor,
        phone: data.ContactInformation.Phone,
      },
      recipientAddress: {
        address: `${data.ContactInformation.City}, ${data.ContactInformation.Street} ${data.ContactInformation.House} ${data.ContactInformation.Apartment} `,
        coordinates: `${data.ContactInformation.Latitude}, ${data.ContactInformation.Longitude}`,
      },
    };
  }

  setDataOrder(data: any) {
    return {
      numberPPO: data.NumberPPO,
      loanAgreementStatus: data.LoanAgreementStatus,
ВОТ ЗДЕСЬ НУЖНО ДОПИСАТЬ
    };
  }
