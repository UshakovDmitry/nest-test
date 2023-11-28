  async getDriversByDate(date: string) {
    const drivers = await this.dbService.getDriversByDate(date);
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD,
    );


      

    geliosCars.forEach((geliosCar) => {
      const { latitude, longitude } = geliosCar;
      
      const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(
        /\s+/g,
        '',
      );



      drivers.forEach((driver) => {
     
        
        if (driver.carNumber === carNumberWithoutSpaces) {
          driver.coordinates = {
            latitude,
            longitude,
          };
        } else {
          driver.coordinates = {
            latitude: '',
            longitude: '',
          };
        }
      });
    });
    return drivers;
  }

я хочу присваивать значение координат при совпадении автомобиля
в ином случае присваивать пустые строки к этому элемиенту
я добавил  else {
          driver.coordinates = {
            latitude: '',
            longitude: '',
          };
        }
и они все стали пустыми строками
