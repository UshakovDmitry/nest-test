async updateDeliveryStatus(drivers) {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 15);

  drivers.forEach((driver) => {
    driver.transportRequests.forEach((request) => {
      if (request.distribution === true) {
        let hasLateDelivery = false;

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
            hasLateDelivery = true;
          }
        });

        if (hasLateDelivery) {
          request.documentStatus = 'Доставляется с опазданием';
        } else {
          request.documentStatus = 'Доставляется вовремя';
        }
      }

      if (request.distribution === true && request.documentStatus === 'Доставлено') {
        let hasLateDelivery = false;

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

          const [_, completedDelivery] = order.completedDelivery.split(' ');
          const [completedHours, completedMinutes, completedSeconds] =
            completedDelivery.split(':').map(Number);
          const completedDateTime = new Date();
          completedDateTime.setHours(
            completedHours,
            completedMinutes,
            completedSeconds,
          );

          if (deliveryDateTime > completedDateTime) {
            hasLateDelivery = true;
          }
        });

        if (hasLateDelivery) {
          request.documentStatus = 'Доставлено с опазданием';
        } else {
          request.documentStatus = 'Доставлено вовремя';
        }
      }
    });
  });

  return drivers;
}
