Отлично работает
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
теперь я хочу применить еще одну обработку для своих данных 
у меня есть вот такая функция 
я хочу применить ее логику к своим возвращаеммым данным из getDriversByName 


  async getDriversStatsByDate(date) {
    const drivers = await this.getDriversByDate(date);
    let totalRequests = 0;
    let couriers_online = 0;
    let count_rejected = 0;
    let count_transferred = 0;
    let count_delivery_late = 0;
    let count_delivery_in_time = 0;
    let count_delivered_in_time = 0;
    let count_delivered_late = 0;

    drivers.forEach((driver) => {
      // Количество всех заявок
      totalRequests += driver.transportRequests.length;

      // Количество курьеров у которых заполнены поля carNumber и carModel
      if (driver.carNumber.trim() !== '' && driver.carModel.trim() !== '') {
        couriers_online++;
      }

      // Количество заявок со статусом "Отказ клиента от заказа", "Перенос доставки", "Доставляется с опазданием", "Доставляется вовремя"
      driver.transportRequests.forEach((request) => {
        if (request.documentStatus === 'Отказ клиента от заказа') {
          count_rejected++;
        }
        if (request.documentStatus === 'Перенос доставки') {
          count_transferred++;
        }
        if (request.documentStatus === 'Доставляется с опазданием') {
          count_delivery_late++;
        }
        if (request.documentStatus === 'Доставляется вовремя') {
          count_delivery_in_time++;
        }
        if (request.documentStatus === 'Доставлено вовремя') {
          count_delivered_in_time++;
        }
        if (request.documentStatus === 'Доставлено с опазданием') {
          count_delivered_late++;
        }
      });
    });

    // Рассчет процента отказов и округление до 2 знаков после запятой
    let percentage_rejected = totalRequests
      ? (count_rejected / totalRequests) * 100
      : 0;
    percentage_rejected = parseFloat(percentage_rejected.toFixed(2));

    let percentage_transferred = totalRequests
      ? (count_transferred / totalRequests) * 100
      : 0;
    percentage_transferred = parseFloat(percentage_transferred.toFixed(2));

    let percentage_delivery_late = totalRequests
      ? (count_delivery_late / totalRequests) * 100
      : 0;
    percentage_delivery_late = parseFloat(percentage_delivery_late.toFixed(2));

    let percentage_delivery_in_time = totalRequests
      ? (count_delivery_in_time / totalRequests) * 100
      : 0;
    percentage_delivery_in_time = parseFloat(
      percentage_delivery_in_time.toFixed(2),
    );
    let percentage_delivered_in_time = totalRequests
      ? (count_delivered_in_time / totalRequests) * 100
      : 0;
    percentage_delivered_in_time = parseFloat(
      percentage_delivered_in_time.toFixed(2),
    );
    let percentage_delivered_late = totalRequests
      ? (count_delivered_late / totalRequests) * 100
      : 0;
    percentage_delivered_late = parseFloat(
      percentage_delivered_late.toFixed(2),
    );


    return {
      totalRequests,
      couriers_online,
      count_rejected,
      percentage_rejected,
      count_transferred,
      percentage_transferred,
      count_delivery_late,
      percentage_delivery_late,
      count_delivery_in_time,
      percentage_delivery_in_time,
      count_delivered_in_time,
      percentage_delivered_in_time,
      count_delivered_late,
      percentage_delivered_late
    };
  }
}
