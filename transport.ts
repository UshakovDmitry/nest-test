 async getDriversByDate(date: string) {
  console.log('date', date);
  
  const allDrivers = await this.getAllDrivers();
  
  // Получение сегодняшней даты в нужном формате
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Обновление данных водителей, если переданная дата совпадает с сегодняшней
  let drivers = allDrivers;
  if (date === formattedToday) {
    drivers = await this.updateDriversWithExternalData(allDrivers);
  }

  const filteredDrivers = drivers
    .map((driver) => {
      const filteredRequests = driver.transportRequests.filter(
        (transportRequest) => {
          return (
            transportRequest.contactInformation.Date_Time_delivery.split(
              ' ',
            )[0] === date
          );
        },
      );

      return { ...driver, transportRequests: filteredRequests };
    })
    .filter((driver) => driver.transportRequests.length > 0);

  const updatedDrivers = this.setCountOrdersStatus(filteredDrivers, date);
  return updatedDrivers;
}

