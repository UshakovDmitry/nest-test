  async getDriversByName(name: string, date: string) {
    const drivers = await this.dbService.getDriversByName(name, date);
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

тут я хочу если даже если это ксловие не пройдет  if (driver.carNumber === carNumberWithoutSpaces)
то все рвано присвоит для каждого элемента  driver.coordinates = {
            latitude: '',
            longitude: '',
          }; с  пустыми строками

верно описана логика?
