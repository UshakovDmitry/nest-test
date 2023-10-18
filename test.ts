        if (request.distribution === true && request.documentStatus === 'Доставляется') {
          request.orders.forEach((order) => {
            const [_, deliveryTime] = order.Delivery_Time.split(' ');
            const [deliveryHours, deliveryMinutes, deliverySeconds] =
              deliveryTime.split(':').map(Number);
            deliveryDateTime = new Date();
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
