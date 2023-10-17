async getDriversStatsByDate(date: string) {
  const drivers = await this.dbService.getDriversStatsByDate(date);
  const geliosCars = await this.geliosService.getCarLocations(
    GELIOS_PRO_LOGIN,
    GELIOS_PRO_PASSWORD
  );

  // Пройдемся по каждому элементу в geliosCars
  geliosCars.forEach((geliosCar) => {
    const { name, latitude, longitude } = geliosCar;

    // Уберем пробелы из номера и сравним с полем carNumber
    const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(/\s+/g, '');
    
    drivers.forEach((driver) => {
      if (driver.carNumber === carNumberWithoutSpaces) {
        // Если номера совпадают, добавим координаты к объекту в массиве drivers
        driver.coordinates = {
          latitude,
          longitude,
        };
      }
    });
  });

  // В итоге у вас будет массив drivers с добавленными координатами для совпавших номеров машин
  console.log(drivers);
}


