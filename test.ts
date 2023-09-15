PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 24128  - 15.09.2023, 15:16:33     LOG [NestFactory] Starting Nest application...
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] MongooseModule dependencies initialized +25ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +10ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] MongooseModule dependencies initialized +7ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] MessageModule dependencies initialized +0ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] RabbitMQModule dependencies initialized +1ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [NestMicroservice] Nest microservice successfully started +92ms
Микросервис запущен
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [RoutesResolver] MessageController {/messages}: +16ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [RouterExplorer] Mapped {/messages, GET} route +3ms
[Nest] 24128  - 15.09.2023, 15:16:33     LOG [NestApplication] Nest application successfully started +3ms
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
saveMessage service [
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
saveMessage service [
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

НА ОСНОВЕ ПРИХОДЯЩИЙ СООБЩЕНИЙ ИЗ ОЧЕРЕДИ СОЗДАЙ СХЕМУ ДЛЯ ЗАПИСИ В МОНГО
