async getDriversByName(name: string, date: string) {
  const drivers = await this.getAllDrivers();

  const filteredDrivers = drivers.filter(driver => {
    if (driver.driver !== name) {
      return false;
    }

    return driver.transportRequests.some(request => {
      // Извлекаем дату из строки Date_Time_delivery
      const deliveryDate = request.contactInformation.Date_Time_delivery.split(' ')[0];

      // Сравниваем строки дат
      return deliveryDate === date;
    });
  });

  return filteredDrivers;
}


И возвращать только те элементы которые совпадают по дате
