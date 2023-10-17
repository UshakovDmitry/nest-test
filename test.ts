  async getDriversStatsByDate(date: string) {
    const drivers =  await this.dbService.getDriversStatsByDate(date);
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD
    );
  }

мой метод получает два массива 
Задача следующаяя:
пройтись по всем элементам geliosCars и взять поле numberPlate,убрать пробелы в строке и сравнить с полем carNumber
если оно совпадает то для этого элемента миссива drivers который выглядит вот так 

 {
        "driver": "Энсепов Берк Сарсенбаевич",
        "carNumber": "",
        "carModel": "",
        "transportRequests"
 }

добавить поле coordinates(это будет обьект с ключами latitude и longitude) которые нужно будет взять и элемента массива geliosCars
который выглядит вот так 


   {
        "name": "Актау M 121 237 (ГАЗ-3302)",
        "unit_icon": "http://geliospro.com/img/libauto/trucks/042.png",
        "latitude": "43.65339",
        "longitude": "51.1624916",
        "info": {
            "year": "",
            "brand": "Gazel",
            "travels": {
                "fe": 0,
                "la": 0,
                "mm": 1,
                "mt": 60,
                "mtd": 100,
                "mts": 300,
                "omr": 0,
                "fign": 1,
                "mign": 1
            },
            "conLossTm": {
                "isOn": "1",
                "value": 300
            },
            "numberPlate": "M 121 237",
            "isGlobalView": 0,
            "organization": ""
        }
    },


