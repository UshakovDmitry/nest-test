у меня есть метод который получает city, массив couriers возвращает волдителей 
я хочу в couriersNames получать водителей у которых "City" совпадает с city и возвращать их массивом 
в таком виде

    {
        "full_name": Drivers,
        "hiring_type": HiringType,
        "timeWindow": TimeWindow,
        "hard_time_window": HardTimeWindow,
        "return_warehouse": ReturnWarehouse,
        "city": City,
        "car_number": "carNumber"
    }


 async getCouriersNames(city: string) {
    const couriers = await this.getCouriers();
    const couriersNames 
      
    return couriers;
  }



вот так выглядит элемент массива couriers
    {
        "Drivers": "Энсепов Берк Сарсенбаевич",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-20:00:00",
        "HardTimeWindow": true,
        "ReturnWarehouse": false,
        "City": "Актау",
        "carNumber": ""
    }
