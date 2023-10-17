 getDriversStatsByDate(date: string) {
    const drivers = this.dbService.getDriversStatsByDate(date);
    const geliosCars = this.geliosService.getCarLocations(
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

Property 'forEach' does not exist on type 'Promise<any>'.ts(2339)

Property 'forEach' does not exist on type 'Promise<{ totalRequests: number; couriers_online: number; count_rejected: number; percentage_rejected: number; count_transferred: number; percentage_transferred: number; count_delivery_late: number; percentage_delivery_late: number; count_delivery_in_time: number; percentage_delivery_in_time: number; }>'.ts(2339)


