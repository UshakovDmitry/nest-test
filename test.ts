PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 10244  - 15.09.2023, 15:30:28     LOG [NestFactory] Starting Nest application...
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] MongooseModule dependencies initialized +29ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +12ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] MongooseModule dependencies initialized +8ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] MessageModule dependencies initialized +1ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] RabbitMQModule dependencies initialized +1ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [NestMicroservice] Nest microservice successfully started +94ms
Микросервис запущен
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RoutesResolver] MessageController {/messages}: +18ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RouterExplorer] Mapped {/messages, GET} route +3ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RouterExplorer] Mapped {/messages, POST} route +0ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RoutesResolver] MessageController {/messages}: +1ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RouterExplorer] Mapped {/messages, GET} route +0ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [RouterExplorer] Mapped {/messages, POST} route +0ms
[Nest] 10244  - 15.09.2023, 15:30:28     LOG [NestApplication] Nest application successfully started +4ms
Приложение слушаетсчя на 4000
Received message: [
        {
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
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
Saving message to database: [
        {
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
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
Saving message to database: [
        {
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
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
Error saving message to database: ObjectParameterError: Parameter "obj" to Document() must be an object, got "[
        {
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
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]" (type string)
    at model.Document (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:111:11)
    at model.Model (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\model.js:123:12)
    at new model (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\model.js:4702:15)
    at MessageService.saveMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\message\message.service.ts:12:24)
    at RabbitMQService.saveMessageToDb (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:19:33)
    at RabbitMQService.update (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:13:10)
    at Subject.notifyObservers (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\observer.ts:21:16)
    at channel.consume.noAck (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\listener-rabbitMQ.ts:26:26)
    at Channel.BaseChannel.dispatchMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:483:12)
    at Channel.BaseChannel.handleDelivery (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:492:15)
Error saving message to database: ObjectParameterError: Parameter "obj" to Document() must be an object, got "[
        {
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
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]" (type string)
    at model.Document (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:111:11)
    at model.Model (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\model.js:123:12)
    at new model (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\model.js:4702:15)
    at MessageService.saveMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\message\message.service.ts:12:24)
    at RabbitMQService.saveMessageToDb (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:19:33)
    at RabbitMQService.update (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\rabbitmq\rabbitmq.service.ts:13:10)
    at Subject.notifyObservers (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\observer.ts:21:16)
    at channel.consume.noAck (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\listener-rabbitMQ.ts:26:26)
    at Channel.BaseChannel.dispatchMessage (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:483:12)
    at Channel.BaseChannel.handleDelivery (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\amqplib\lib\channel.js:492:15)
