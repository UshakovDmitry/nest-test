  async getDriversByName(name: string , date: string) {
    const drivers = await this.getAllDrivers();

    const filteredDrivers = drivers.filter((driver) => driver.driver === name);

    return filteredDrivers;
  }


Вот что возвращает эта фуекция 
[
  {
      "driver": "Ибраев Абылайхан Нургожаулы",
      "carNumber": "M121134",
      "carModel": "Largus",
      "transportRequests": [
          {
              "number": "№№00148564",
              "IdYandex": "32bfe3e0-d6153969-856af392-44a076ca",
              "distribution": true,
              "date": "03.10.2023 15:36:47",
              "dateCreated": "4-10-2023",
              "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
              "documentStatus": "Доставлено вовремя",
              "ISR": "288519384",
              "informalDocument": "Заказ покупателя ППО",
              "filterContractor": "Alser",
              "loanAgreementStatus": "ПРИНЯТ НАМИ",
              "typePayment": "Безналичный расчет",
              "contactInformation": {
                  "City": "Шымкент",
                  "Delivery_Condition": "Доставка",
                  "Date_Time_delivery": "2023-10-04  до 20:00",
                  "Time_Window": "нет данных",
                  "Latitude": "42.362533",
                  "Longitude": "69.613757",
                  "Street": "нет данных",
                  "Home": "7",
                  "Phone": "(777)2400708",
                  "Apartment": "нет данных",
                  "Contractor": "BS Kazakhstan BS Kazakhstan BS Kazakhstan",
                  "_id": "651d19973e71be8042bad459"
              },
              "orders": [
                  {
                      "NuberPPO": "8780440",
                      "PPOStatus": "Доставляется",
                      "SKU": "1379078",
                      "Pickup_Time": "01.01.0001 9:00:00",
                      "Delivery_Time": "01.01.0001 11:08:59"
                  }
              ]
          },
          {
              "number": "№№00148145",
              "IdYandex": "260869ea-3d54ecc7-f7af11a5-16e51a44",
              "distribution": true,
              "date": "02.10.2023 16:45:39",
              "dateCreated": "4-10-2023",
              "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
              "documentStatus": "Отказ клиента от заказа",
              "ISR": "288316444",
              "informalDocument": "Заказ покупателя ППО",
              "filterContractor": "Alser",
              "loanAgreementStatus": "ОТМЕНЁН",
              "typePayment": "Кредит",
              "contactInformation": {
                  "City": "Шымкент",
                  "Delivery_Condition": "Доставка",
                  "Date_Time_delivery": "2023-10-03 До 20:00",
                  "Time_Window": "нет данных",
                  "Latitude": "42,374896",
                  "Longitude": "69,597255",
                  "Street": "нет данных",
                  "Home": "5",
                  "Phone": "(701)2343899",
                  "Apartment": "нет данных",
                  "Contractor": "Елемесова Акмарал",
                  "_id": "651d6d6cceef8fbd8ced2bb3"
              },
              "orders": [
                  {
                      "NuberPPO": "8778424",
                      "PPOStatus": "Отменен",
                      "Pickup_Time": "01.01.0001 9:00:00",
                      "Delivery_Time": "01.01.0001 10:24:06"
                  }
              ]
          },
        ]

  }
]

Я хочу добавить новый фуекционал
я хочу брать date и сравнивать с каждым элементом массива transportRequests
А именно contactInformation.Date_Time_delivery 

В данном случае я хочу сравнивать внутри строки  "Date_Time_delivery": "2023-10-03 До 20:00"

И возвращать только те элементы которые совпадают по дате
