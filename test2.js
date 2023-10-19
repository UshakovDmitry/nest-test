  async getNotPredictedTransportRequestsByDate(date): Promise<any[]> {
   const requestsByDate = await this.dbService.getTransportRequestsByDate(date);
    return requestsByDate;
  }
Мне нужно вернуть новый массив не распределенных заявок 
это заявки у которых поля Driver NumberCar CarModel равняются пустой строке 


вот как выглядит элемент в массиве requestsByDate
    {
        "_id": "652cb4ce08f40f3ace022c59",
        "Number": "№№00153722",
        "Date": "14.10.2023 10:56:51",
        "DateCreated": "19-10-2023",
        "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
        "DocumentStatus": "Доставлено",
        " ": "",
        "NumberCar": "",
        "Driver": "Ибраев Абылайхан Нургожаулы",
        "ISR": "0003946930-1",
        "TypePayment": "Безналичный расчет",
        "loanAgreementStatus": "ПРИНЯТ НАМИ",
        "IdYandex": "",
        "distribution": false,
        "Informal_Document": "Заказ покупателя ППО",
        "FilterContractor": "BS",
        "ArrayStrings": [
            {
                "NuberPPO": "8808497",
                "PPOStatus": "Доставляется",
                "SKU": "1375371",
                "Goods": "WMD-1280NDV-WH/Стиральная машина Dauscher",
                "Count": "1",
                "ShippingAddress": "SHymkent, mkr. Kyzylzhar, ul. ZHidelibaysyn (virt.sklad), 92",
                "Brand": "DAUSCHER",
                "Weight": "68,3",
                "Price": "167 730",
                "Item_Status": "Забран",
                "Pickup_Point": "0",
                "Delivery_Point": "0",
                "Pickup_Latitude": "42,348907",
                "Pickup_Longitude": "69,530052",
                "Delivery_Latitude": "0",
                "Delivery_Longitude": "0",
                "Pickup_Time": "01.01.0001 0:00:00",
                "Delivery_Time": "01.01.0001 0:00:00"
            }
        ],
        "ContactInformation": {
            "City": "Шымкент",
            "Delivery_Condition": "Доставка",
            "Date_Time_delivery": "2023-10-19 После 15:00",
            "Time_Window": "нет данных",
            "Latitude": "42.396992",
            "Longitude": "69.589107",
            "Street": "нет данных",
            "Home": "10",
            "Phone": "(747)5938327",
            "Apartment": "нет данных",
            "Contractor": "ГУЛШАТ",
            "_id": "6530bab7bf68f8f7622dbac5"
        },
        "StructureQuantities": {
            "TotalWeight": "68.3",
            "TotalAmount": "167730",
            "_id": "6530bab7bf68f8f7622dbac6"
        },
        "ArrayChronologies": [
            {
                "PPO": "8808497",
                "Chronology": [
                    "Оформлен",
                    "Доставляется до клиента (на складе отгрузки)",
                    "Доставляется"
                ]
            }
        ],
        "CompletedDelivery": "01.01.0001 0:00:00"
    },
