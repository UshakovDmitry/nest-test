async updateDeliveryStatus(drivers) {
    const currentTime = new Date(); // Получение текущего времени
    currentTime.setMinutes(currentTime.getMinutes() + 15); // Добавление 15 минут запаса на доставку

    drivers.forEach((driver) => {
      driver.transportRequests.forEach((request) => {
        if (
          request.distribution === true &&
          request.documentStatus === 'Доставляется'
        ) {
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
        if (
          request.distribution === true &&
          request.documentStatus === 'Доставлено'
        )
{
  // const GoodTime = new Date(); 
  //   GoodTime.setMinutes(GoodTime.getMinutes() + 15);
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
      request.documentStatus = 'Доставлено вовремя';
    } else {
      request.documentStatus = 'Доставлено с опазданием';
    }
  }
  );
}
      });
    });

    return drivers;
  }
