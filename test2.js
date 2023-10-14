
  async getDriversStatsByDate(date) {
    const drivers = await this.getDriversByDate(date);
    let totalRequests = 0;
    let couriers_online = 0;

    drivers.forEach((driver) => {
      // Количество всех заявок
      totalRequests += driver.transportRequests.length;
      // Количество курьеров у которых заполнены поля carNumber иcarModel
      if (driver.carNumber.trim() !== '' && driver.carModel.trim() !== '') {
        couriers_online++;
      }
    });

    return {
      totalRequests,
      couriers_online,
    };
  }
