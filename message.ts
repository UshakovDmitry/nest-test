async getDriversByDate(date: string) {
  const drivers = await this.dbService.getDriversByDate(date);
console.log(drivers, 'drivers');



  const geliosCars = await this.geliosService.getCarLocations(
    GELIOS_PRO_LOGIN,
    GELIOS_PRO_PASSWORD,
  );

  // Инициализация координат водителей
  drivers.forEach(driver => {
    driver.coordinates = {
      latitude: '',
      longitude: '',
    };
  });

  geliosCars.forEach(geliosCar => {
    const { latitude, longitude } = geliosCar;
    const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(/\s+/g, '');

    drivers.forEach(driver => {
      if (driver.carNumber.replace(/\s+/g, '') === carNumberWithoutSpaces) {
        driver.coordinates = {
          latitude,
          longitude,
        };
      }
    });
  });

  return drivers;
}

[ {
    driver: 'Белая Екатерина Сергеевна',
    carNumber: '',
    carModel: '',
    driverIIN: '881013400626',
    phoneDriver: '87474030983',
    transportRequests: [ [Object] ],
    count_completed_orders: '0',
    count_pending_orders: '0',
    count_all_orders: '1',
    count_delivery_late_orders: '0',
    count_delivery_in_time_orders: '0',
    count_rejected_orders: '1',
    count_transferred_orders: '0'
  },
  {
    driver: 'Абдрахимов Таир Нурланович',
    carNumber: 'C814402',
    carModel: 'Gazel',
    driverIIN: '970825351060',
    phoneDriver: '87006898560',
    transportRequests: [ [Object] ],
    count_completed_orders: '0',
    count_pending_orders: '0',
    count_all_orders: '1',
    count_delivery_late_orders: '1',
    count_delivery_in_time_orders: '0',
    count_rejected_orders: '0',
    count_transferred_orders: '0'
  }
] drivers


у меня есть функция которая получает два массива и сравнивает их и выполняет какую то логику 
я хочу немного изменить логику и транчформировать массив drivers

после его получения я хочу делать запрос на http://10.0.1.20/1CHS/hs/Yandex_Go/ListDiliveryBlocked

вот что он возвращает 
{
"code": 0,
"message": "Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅС‹Р№ С‚СЂР°РЅСЃРїРѕСЂС‚: ",
"data": [
{
"id": "58efb4b3-27b3-4b15-9adf-396384a1f106",
"driver": "851120302593",
"NumberCar": "M124239",
"imei": "866562062035094",
"CarModel": "Largus",
"DriverName": "РЎУ™РєРµРЅР±Р°РµРІ Р”Р°РЅРёСЏСЂ Р‘РµРєРµРЅТ±Р»С‹",
"RegistrationNumber": "M124239"
},
{
"id": "77fe202e-ceea-433d-b458-e3d61d204b44",
"driver": "900327302459",
"NumberCar": "M124186",
"imei": "866562062035177",
"CarModel": "Largus",
"DriverName": "РђР±СѓРЅР°Р·Р°СЂРѕРІ РђСЂС‚СѓСЂ РђС…РјРµРґРѕРІРёС‡ ",
"RegistrationNumber": "M124186"
},
{
"id": "58afbec3-216e-4051-bafe-d475b53066e3",
"driver": "780530302009",
"NumberCar": "M121137",
"imei": "860906040556406",
"CarModel": "Largus",
"DriverName": "РРІР°РЅРѕРІ Р’СЏС‡РµСЃР»Р°РІ РЎРµСЂРіРµРµРІРёС‡",
"RegistrationNumber": "M121137"
},
]
}

сравнивать массив divers 
мне нужно вытащить из http://10.0.1.20/1CHS/hs/Yandex_Go/ListDiliveryBlocked массив data 
сравнивать водителей ( сделай trim при сравнении ) DriverName и  driver
если в приходящем массиве есть CarModel и RegistrationNumber и это не пустые строки то присваивать эти данные в carNumber и carModel массива drivers

Сделай это преобразование отдельной функцией и и спользуй ее внуктри getDriversByDate
