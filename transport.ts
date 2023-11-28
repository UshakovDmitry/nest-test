async getDriversByDate(date: string) {
  const drivers = await this.dbService.getDriversByDate(date);
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
