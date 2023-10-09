вот здесь 

  async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));
    return response.data.data;
  }
я получаю данные вот в таком виде

[
    {
        "Drivers": "Наумов Сергей Александрович",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-20:00:00",
        "HardTimeWindow": "Да",
        "ReturnWarehouse": "Да",
        "City": "Алматы"
    },
    {
        "Drivers": "Жайнақ Ержан Сембайұлы",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-20:00:00",
        "HardTimeWindow": "Да",
        "ReturnWarehouse": "Да",
        "City": "Алматы"
    },
    {
        "Drivers": "Карпенко Александр Иванович",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-21:00:00",
        "HardTimeWindow": "Да",
        "ReturnWarehouse": "Нет",
        "City": "Алматы"
    },
    {
        "Drivers": "Харитонов Александр Сергеевич",
        "HiringType": "",
        "TimeWindow": "09:00:00-20:00:00",
        "HardTimeWindow": "Да",
        "ReturnWarehouse": "Да",
        "City": ""
    },
    {
        "Drivers": "Кунц Алексей Иосифович",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "09:00:00-22:00:00",
        "HardTimeWindow": "Да",
        "ReturnWarehouse": "Нет",
        "City": "Актобе"
    },
  ]

я хочу преобразовывать поля HardTimeWindow и ReturnWarehouse
если 'Да' то возвращать true а если 'Нет' то false
