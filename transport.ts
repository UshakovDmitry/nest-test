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

Метод вовращает неправильные данные 
В них почему парисутсвуют "Date_Time_delivery": "2023-10-10  До 20:00",
Не смотря на то что я передаю внутри date 2023-11-09

Я хочу чтобы внутри были заявки которые совпадают с числом внутри "Date_Time_delivery"
