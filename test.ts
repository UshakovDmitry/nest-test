у меня храняться транспортные заявки в бд
я хочу пройтись по всем и получить массив водителей и все их транспортные заявки а так же все заказы(ArrayStrings) внутри каждой
_id
65166aa64a53e0d6011408da
Number
"№№00015684"
Date
"27.09.2023 11:03:39"
DateCreated
"29-9-2023"
Organization
"TOO Gulser Computers (Гулсер Компьютерс)"
DocumentStatus
"Повреждение товара"
Driver
"Чунаев Марат Чакенович"
ISR
"240783461"
NuberPPO
"8149234"
TypePayment
"Кредит"
loanAgreementStatus
"ОПЛАЧЕН"
Informal_Document
"Заказ покупателя ППО"
FilterContractor
"Alser"

ArrayStrings
Array (1)

0
Object
NuberPPO
"8149234"
PPOStatus
"Сделка завершена"
SKU
"1330426"
Goods
"Умная Колонка Яндекс.Станция Лайт, Мята (YNDX-00025 Green)"
Count
"1"
ShippingAddress
"Almaty, Rayymbeka, 127/147"
Brand
"Яндекс"
Weight
"0,4"
Price
"27 990"
Item_Status
"Забран"
Pickup_Point
"1"
Delivery_Point
"2"
Pickup_Latitude
"12"
Pickup_Longitude
"15"
Delivery_Latitude
"15"
Delivery_Longitude
"14"
Pickup_Time
"01.01.0001 9:00:00"
Delivery_Time
"01.01.0001 15:00:00"

ContactInformation
Object
City
"Алматы"
Delivery_Condition
"Доставка"
Date_Time_delivery
"2023-02-03 До 20:00"
Time_Window
"нет данных"
Latitude
"43,253029"
Longitude
"76,938656"
Street
"Кайсар Плаза"
Home
"115"
Phone
"(706)4192015"
Apartment
"Кайсар Плаза"
Contractor
"Таирова Жанета"
_id
651699e0a26df6599121d3b0

StructureQuantities
Object
TotalWeight
"0.4"
TotalAmount
"27990"
_id
651699e0a26df6599121d3b1

ArrayChronologies
Array (1)

0
Object
CarModel
"Gazel"
NumberCar
"M121240"



правильно ли я делаю?
  async getAllDrivers() {
    // Получить все уникальные имена из коллекции по полю Driver
    const collectionDriverNames = await this.messageModel
      .distinct('Driver')
      .exec();

    function hashSumm(str: string) {
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < String(str).length; i++) {
        const char = String(str).charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash;
    }

    const drivers = [];
    for (const driver of collectionDriverNames) {
      console.log('driver', driver);
      
      const driverOne = {
        driver: driver,
        сarNumber: '',
        carModel: '',
        transportRequests: [],
      };

      const collection = await this.messageModel
        .find({ Driver: driver })
        .exec();

        console.log('collection', collection);
        
      for (const item of collection) {
        // console.log('item', item);
        
        const driverTransportRequest = {
          number: item.Number,
          date: item.Date,
          dateCreated: item.DateCreated,
          organization: item.Organization,
          documentStatus: item.DocumentStatus,
          ISR: item.ISR,
          nuberPPO: item.NumberPPO,
          informalDocument: item.Informal_Document,
          filterContractor: item.FilterContractor,
          loanAgreementStatus: item.loanAgreementStatus,
          typePayment: item.TypePayment,
          chronologies: item.ArrayChronologies,
          contactInformation: item.ContactInformation,
          orders: [],
        };

        driverOne.сarNumber = item.NumberCar;
        driverOne.carModel = item.CarModel;
           
        const prepareOrders = collection.map((item) => item.ArrayStrings);
        
        const flatOrders = prepareOrders.flat();
        const hashSummSet = new Set();

        flatOrders.forEach((order) => {
          const hs = hashSumm(JSON.stringify(order));
          if (!hashSummSet.has(hs)) {
            hashSummSet.add(hs);
            driverTransportRequest.orders.push(order);
          }
        });

        driverOne.transportRequests.push(driverTransportRequest);
        
      }

      drivers.push(driverOne);
    }

    return drivers;
  }
  
