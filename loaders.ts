async getDriversByName(name: string, date: string) {
    const drivers = await this.dbService.getDriversByName(name, date);
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD,
    );

    // Устанавливаем пустые координаты для каждого водителя
    drivers.forEach((driver) => {
      driver.coordinates = {
        latitude: '',
        longitude: '',
      };
    });

    geliosCars.forEach((geliosCar) => {
      const { latitude, longitude } = geliosCar;
      const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(/\s+/g, '');

      drivers.forEach((driver) => {
        if (driver.carNumber === carNumberWithoutSpaces) {
          driver.coordinates = {
            latitude,
            longitude,
          };
        }
      });
    });
    return drivers;
}

