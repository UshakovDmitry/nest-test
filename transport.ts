async getDriversByName(name: string, date: string) {
  const drivers = await this.getAllDrivers();

  const filteredDrivers = drivers.reduce((acc, driver) => {
    if (driver.driver === name) {
      // Фильтруем заявки, оставляя только те, что соответствуют указанной дате
      const filteredTransportRequests = driver.transportRequests.filter(request => {
        const deliveryDate = request.contactInformation.Date_Time_delivery.split(' ')[0];
        return deliveryDate === date;
      });

      // Если после фильтрации остались заявки, добавляем водителя в аккумулированный массив
      if (filteredTransportRequests.length > 0) {
        acc.push({
          ...driver, // Копируем всю информацию о водителе
          transportRequests: filteredTransportRequests // Заменяем заявки на отфильтрованные
        });
      }
    }
    return acc;
  }, []);

  return filteredDrivers;
}

