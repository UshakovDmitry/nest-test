async  updateDeliveryStatus(drivers) {
  const currentTime = new Date(); // Получение текущего времени
  console.log(currentTime, 'currentTime');
  
  drivers.forEach(driver => {
      driver.transportRequests.forEach(request => {
          if (request.distribution === true && request.documentStatus === "Доставляется") { 
              request.orders.forEach(order => { 
                  const [_, deliveryTime] = order.Delivery_Time.split(' '); 
                  const [deliveryHours, deliveryMinutes, deliverySeconds] = deliveryTime.split(':').map(Number); 
                  const deliveryDateTime = new Date(); 
                  deliveryDateTime.setHours(deliveryHours, deliveryMinutes, deliverySeconds);
                  console.log(deliveryDateTime, 'deliveryDateTime');
                  

                  if (currentTime > deliveryDateTime) { 
                      request.documentStatus = "Доставляется с опазданием"; 
                  } else {
                      request.documentStatus = "Доставляется вовремя"; 
                  }
              });
          }
      });
  });

  return drivers; 
}













2023-10-14T10:46:36.295Z currentTime
2023-10-14T04:04:07.310Z deliveryDateTime
