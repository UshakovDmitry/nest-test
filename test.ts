async updateDeliveryStatus(drivers) {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 15);

  drivers.forEach((driver) => {
    driver.transportRequests.forEach((request) => {
      if (request.distribution === true && request.documentStatus === 'Доставляется') {
        request.orders.forEach((order) => {
          const [_, deliveryTime] = order.Delivery_Time.split(' ');
          const [deliveryHours, deliveryMinutes, deliverySeconds] =
            deliveryTime.split(':').map(Number);
          const deliveryDateTime = new Date();
          deliveryDateTime.setHours(
            deliveryHours,
            deliveryMinutes,
            deliverySeconds,
          );

          if (currentTime > deliveryDateTime) {
            request.documentStatus = 'Доставляется с опазданием';
          } else {
            request.documentStatus = 'Доставляется вовремя';
          }
        });
      }

      if (request.distribution === true && request.documentStatus === 'Доставлено') {
        // Определение completedDateTime за пределами цикла
        let completedDateTime = null;
        
        request.orders.forEach((order) => {
          if (order.completedDelivery) {
            const [_, completedDelivery] = order.completedDelivery.split(' ');
            const [completedHours, completedMinutes, completedSeconds] =
              completedDelivery.split(':').map(Number);
            completedDateTime = new Date();
            completedDateTime.setHours(
              completedHours,
              completedMinutes,
              completedSeconds,
            );
          }
        });

        // Сравнение completedDateTime с deliveryDateTime
        if (completedDateTime && completedDateTime > deliveryDateTime) {
          request.documentStatus = 'Доставлено с опазданием';
        } else {
          request.documentStatus = 'Доставлено вовремя';
        }
      }
    });
  });

  return drivers;
}


