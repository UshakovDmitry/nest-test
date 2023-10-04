tms-api@0.0.1 start
> nest start

[Nest] 16604  - 04.10.2023, 09:52:54     LOG [NestFactory] Starting Nest application...
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] MongooseModule dependencies initialized +30ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] HttpModule dependencies initialized +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] TransportModule dependencies initialized +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] LoadersModule dependencies initialized +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +35ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] MongooseModule dependencies initialized +7ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] DBModule dependencies initialized +1ms
Создан экземпляр RabbitMQService
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] RabbitMQModule dependencies initialized +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] DriversModule dependencies initialized +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [InstanceLoader] TransportRequestsModule dependencies initialized +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RoutesResolver] TransportRequestsController {/api/getTransportRequests}: +30ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getTransportRequests, GET} route +3ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getTransportRequests/byNumber, POST} route +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RoutesResolver] TransportController {/api/transport}: +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/transport, GET} route +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RoutesResolver] LoadersController {/loaders}: +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/loaders, GET} route +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RoutesResolver] DriversController {/api/getDrivers}: +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getDrivers, GET} route +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getDrivers/by-date, POST} route +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RoutesResolver] TransportRequestsController {/api/getTransportRequests}: +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getTransportRequests, GET} route +1ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [RouterExplorer] Mapped {/api/getTransportRequests/byNumber, POST} route +0ms
[Nest] 16604  - 04.10.2023, 09:52:54     LOG [NestApplication] Nest application successfully started +3ms
Приложение запущено на порту 4000
Сообщение из TmsQueue [
  {
    Number: '№№00148630',
    Date: '03.10.2023 17:06:32',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Доставляется',
    Driver: 'Аманов Канат Куанышулы',
    ISR: '404470074385',
    NuberPPO: '8780626',
    TypePayment: 'Кредит',
    loanAgreementStatus: '',
    Informal_Document: 'Заказ покупателя ППО',
    FilterContractor: 'Alser',
    CarModel: '',
    NumberCar: '',
    ArrayStrings: [ [Object] ],
    ContactInformation: {
      City: 'Астана',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-10-04 До 20:00',
      Time_Window: 'нет данных',
      Latitude: '51.094137',
      Longitude: '71.420368',
      Street: '23',
      Home: '34б',
      Phone: '(707)9520957',
      Apartment: '23',
      Contractor: 'NEW_CRM_UNKNOWN NEW_CRM_UNKNOWN'
    },
    StructureQuantities: { TotalWeight: 9.9, TotalAmount: 299990 },
    ArrayChronologies: [ [Object] ],
    IdYandex: ''
  }
]
ПРОБЕГАЮ ПО ВСЕМ ПОДПИСЧИКАМ [
  {
    Number: '№№00148630',
    Date: '03.10.2023 17:06:32',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Доставляется',
    Driver: 'Аманов Канат Куанышулы',
    ISR: '404470074385',
    NuberPPO: '8780626',
    TypePayment: 'Кредит',
    loanAgreementStatus: '',
    Informal_Document: 'Заказ покупателя ППО',
    FilterContractor: 'Alser',
    CarModel: '',
    NumberCar: '',
    ArrayStrings: [ [Object] ],
    ContactInformation: {
      City: 'Астана',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-10-04 До 20:00',
      Time_Window: 'нет данных',
      Latitude: '51.094137',
      Longitude: '71.420368',
      Street: '23',
      Home: '34б',
      Phone: '(707)9520957',
      Apartment: '23',
      Contractor: 'NEW_CRM_UNKNOWN NEW_CRM_UNKNOWN'
    },
    StructureQuantities: { TotalWeight: 9.9, TotalAmount: 299990 },
    ArrayChronologies: [ [Object] ],
    IdYandex: ''
  }
]
Получено сообщение: [
  {
    Number: '№№00148630',
    Date: '03.10.2023 17:06:32',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Доставляется',
    Driver: 'Аманов Канат Куанышулы',
    ISR: '404470074385',
    NuberPPO: '8780626',
    TypePayment: 'Кредит',
    loanAgreementStatus: '',
    Informal_Document: 'Заказ покупателя ППО',
    FilterContractor: 'Alser',
    CarModel: '',
    NumberCar: '',
    ArrayStrings: [ [Object] ],
    ContactInformation: {
      City: 'Астана',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-10-04 До 20:00',
      Time_Window: 'нет данных',
      Latitude: '51.094137',
      Longitude: '71.420368',
      Street: '23',
      Home: '34б',
      Phone: '(707)9520957',
      Apartment: '23',
      Contractor: 'NEW_CRM_UNKNOWN NEW_CRM_UNKNOWN'
    },
    StructureQuantities: { TotalWeight: 9.9, TotalAmount: 299990 },
    ArrayChronologies: [ [Object] ],
    IdYandex: ''
  }
]
Сохранено в базу данных: {
  Number: '№№00148630',
  Date: '03.10.2023 17:06:32',
  Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
  DocumentStatus: 'Доставляется',
  Driver: 'Аманов Канат Куанышулы',
  ISR: '404470074385',
  NuberPPO: '8780626',
  TypePayment: 'Кредит',
  loanAgreementStatus: '',
  Informal_Document: 'Заказ покупателя ППО',
  FilterContractor: 'Alser',
  CarModel: '',
  NumberCar: '',
  ArrayStrings: [
    {
      NuberPPO: '8780626',
      PPOStatus: 'Доставляется до клиента (на складе отгрузки)',
      SKU: '1398552',
      Goods: 'Вертикальный моющий пылесос Dreame H12 Pro, Black',
      Count: '1',
      ShippingAddress: 'Nur-Sultan, Turan, 37',
      Brand: 'Dreame',
      Weight: '9,9',
      Price: '299 990',
      Item_Status: '',
      Pickup_Point: '0',
      Delivery_Point: '0',
      Pickup_Latitude: '51,132497',
      Pickup_Longitude: '71,403668',
      Delivery_Latitude: '0',
      Delivery_Longitude: '0',
      Pickup_Time: '01.01.0001 0:00:00',
      Delivery_Time: '01.01.0001 0:00:00'
    }
  ],
  ContactInformation: {
    City: 'Астана',
    Delivery_Condition: 'Доставка',
    Date_Time_delivery: '2023-10-04 До 20:00',
    Time_Window: 'нет данных',
    Latitude: '51.094137',
    Longitude: '71.420368',
    Street: '23',
    Home: '34б',
    Phone: '(707)9520957',
    Apartment: '23',
    Contractor: 'NEW_CRM_UNKNOWN NEW_CRM_UNKNOWN'
  },
  StructureQuantities: { TotalWeight: 9.9, TotalAmount: 299990 },
  ArrayChronologies: [ { PPO: '8780626', Chronology: [Array] } ],
  IdYandex: ''
}
Ошибка при получении данных из Yandex Geocode: TypeError: Cannot read properties of undefined (reading 'get')
    at DBService.getCorrectCityName (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:21:47)
    at DBService.saveMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:43:42)
    at RabbitMQService.saveMessageToDb (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:23:30)
    at RabbitMQService.update (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:16:10)
    at Subject.notifyObservers (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\observer.ts:23:16)
    at channel.consume.noAck (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\listener-rabbitMQ.ts:27:26)
    at Channel.BaseChannel.dispatchMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:483:12)
    at Channel.BaseChannel.handleDelivery (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:492:15)
    at Channel.emit (node:events:526:28)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:278:10
Ошибка сохранения в бд: TypeError: Cannot read properties of undefined (reading 'get')
    at DBService.getCorrectCityName (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:21:47)
    at DBService.saveMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:43:42)
    at RabbitMQService.saveMessageToDb (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:23:30)
    at RabbitMQService.update (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:16:10)
    at Subject.notifyObservers (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\observer.ts:23:16)
    at channel.consume.noAck (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\listener-rabbitMQ.ts:27:26)
    at Channel.BaseChannel.dispatchMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:483:12)
    at Channel.BaseChannel.handleDelivery (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:492:15)
    at Channel.emit (node:events:526:28)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:278:10
Ошибка сохранения в базу данных: TypeError: Cannot read properties of undefined (reading 'get')
    at DBService.getCorrectCityName (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:21:47)
    at DBService.saveMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\db\db.service.ts:43:42)
    at RabbitMQService.saveMessageToDb (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:23:30)
    at RabbitMQService.update (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:16:10)
    at Subject.notifyObservers (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\observer.ts:23:16)
    at channel.consume.noAck (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\listener-rabbitMQ.ts:27:26)
    at Channel.BaseChannel.dispatchMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:483:12)
    at Channel.BaseChannel.handleDelivery (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:492:15)
    at Channel.emit (node:events:526:28)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:278:10
я добавил этот функционал и вот что произошло 
я пока что просто хотел выводить в консоль то что возвращает яндекс
