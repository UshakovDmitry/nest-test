 {
                "number": "№№00168940",
                "IdYandex": "1534dddb-b6167af1-5fca2c62-55ae6d31",
                "IsDelete": false,
                "distribution": true,
                "date": "19.11.2023 13:01:16",
                "dateCreated": "20-11-2023",
                "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
                "documentStatus": "Доставлено с опазданием",
                "completedDelivery": "20.11.2023 10:09:12",
                "ISR": "301207484",
                "informalDocument": "Заказ покупателя ППО",
                "filterContractor": "Kaspi",
                "loanAgreementStatus": "ПРИНЯТ НАМИ",
                "typePayment": "Кредит",
  }

это часть исходных данных
здесь время в которое нужно было привезти заказ 
 "date": "19.11.2023 13:01:16"  равно 13:01:16

а фактическое время доставки 
"completedDelivery": "20.11.2023 10:09:12" равно 10:09:12

но почему то статус пишется как с опазданием 
 "documentStatus": "Доставлено с опазданием"

даже с учетом добавления 15 минут 

вот функция 

  async updateDeliveryStatus(drivers) {
    // Установка текущего времени и добавление к нему 15 минут
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  
    // Перебор массива drivers
    drivers.forEach((driver) => {
      // Перебор всех transportRequests каждого водителя
      driver.transportRequests.forEach((request) => {
        let deliveryDateTime = null; // Переменная для хранения времени доставки
        let completedDateTime = null; // Переменная для хранения времени завершения доставки
  
        // Обработка времени завершения доставки на уровне request
        if (request.completedDelivery) {
          const [_, completedDeliveryTime] = request.completedDelivery?.split(' ') || ['', ''];
          if (completedDeliveryTime) {
            const [completedHours, completedMinutes, completedSeconds] =
              completedDeliveryTime.split(':').map(Number);
            completedDateTime = new Date();
            completedDateTime.setHours(
              completedHours,
              completedMinutes,
              completedSeconds,
            );
          }
        }
        // Проверка есть ли в заявке отметка об удалении
        if (request.IsDelete === true) {
          request.documentStatus = 'Помечено на удаление';
        }
        // Проверка условий для обновления статуса доставки
        if (
          request.distribution === true &&
          (request.documentStatus === 'Доставляется' ||
            request.documentStatus === 'Забран')
        ) {
          // Перебор всех заказов в запросе
          request.orders.forEach((order) => {
            if (order.Delivery_Time) {
              const [_, deliveryTime] = order.Delivery_Time?.split(' ') || ['', ''];
              if (deliveryTime) {
                const [deliveryHours, deliveryMinutes, deliverySeconds] =
                  deliveryTime.split(':').map(Number);
                deliveryDateTime = new Date();
                deliveryDateTime.setHours(
                  deliveryHours,
                  deliveryMinutes,
                  deliverySeconds,
                );
              }
  
              // Сравнение времени доставки с текущим временем для установки статуса
              if (deliveryDateTime && currentTime > deliveryDateTime) {
                request.documentStatus = 'Доставляется с опазданием';
              } else {
                request.documentStatus = 'Доставляется вовремя';
              }
            }
          });
        }
  
        // Проверка статуса 'Доставлено'
        if (request.distribution === true && request.documentStatus === 'Доставлено') {
          // Сравнение времени завершения доставки с временем доставки для установки статуса
          if (completedDateTime && completedDateTime > deliveryDateTime) {
            request.documentStatus = 'Доставлено с опазданием';
          } else {
            request.documentStatus = 'Доставлено вовремя';
          }
        }
      });
    });
  
    // Возвращение обновленного списка водителей
    return drivers;
  }







async updateDeliveryStatus(drivers) {
  const baseDate = new Date('1970-01-01'); // Фиксированная дата для сравнения времени
  const currentTime = new Date(baseDate);
  currentTime.setMinutes(currentTime.getMinutes() + 15);

  drivers.forEach((driver) => {
    driver.transportRequests.forEach((request) => {
      let deliveryDateTime = new Date(baseDate);
      let completedDateTime = new Date(baseDate);

      if (request.completedDelivery) {
        const [_, completedTime] = request.completedDelivery.split(' ');
        if (completedTime) {
          const [hours, minutes, seconds] = completedTime.split(':').map(Number);
          completedDateTime.setHours(hours, minutes, seconds);
        }
      }

      if (request.distribution === true && request.documentStatus !== 'Помечено на удаление') {
        request.orders.forEach((order) => {
          if (order.Delivery_Time) {
            const [_, deliveryTime] = order.Delivery_Time.split(' ');
            if (deliveryTime) {
              const [hours, minutes, seconds] = deliveryTime.split(':').map(Number);
              deliveryDateTime.setHours(hours, minutes, seconds);
            }

            if (deliveryDateTime && currentTime > deliveryDateTime) {
              request.documentStatus = 'Доставляется с опазданием';
            } else {
              request.documentStatus = 'Доставляется вовремя';
            }
          }
        });

        if (request.documentStatus === 'Доставлено') {
          if (completedDateTime > deliveryDateTime) {
            request.documentStatus = 'Доставлено с опазданием';
          } else {
            request.documentStatus = 'Доставлено вовремя';
          }
        }
      }
    });
  });

  return drivers;
}






































вот исходные данные
{
                "number": "№№00168364",
                "IdYandex": "1534dddb-b6167af1-5fca2c62-55ae6d31",
                "IsDelete": false,
                "distribution": true,
                "date": "17.11.2023 16:48:01",
                "dateCreated": "20-11-2023",
                "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
                "documentStatus": "Доставлено с опазданием",
                "completedDelivery": "20.11.2023 10:55:35",
                "ISR": "(701)0121426",
                "informalDocument": "Заказ покупателя ППО",
                "filterContractor": "B2B",
                "loanAgreementStatus": "",
}

снова статус  "Доставлено с опазданием"

хотя время фактическое  "completedDelivery": "20.11.2023 10:55:35" гораздо раньше чем заплпнированное  "date": "17.11.2023 16:48:01"
Напоминаю что мы здесь сравниваем только время, дату не берем

  async updateDeliveryStatus(drivers) {
    // Установка текущего времени и добавление к нему 15 минут
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  
    // Перебор массива drivers
    drivers.forEach((driver) => {
      // Перебор всех transportRequests каждого водителя
      driver.transportRequests.forEach((request) => {
        let deliveryDateTime = null; // Переменная для хранения времени доставки
        let completedDateTime = null; // Переменная для хранения времени завершения доставки
  
        // Обработка времени завершения доставки на уровне request
        if (request.completedDelivery) {
          const [_, completedDeliveryTime] = request.completedDelivery?.split(' ') || ['', ''];
          if (completedDeliveryTime) {
            const [completedHours, completedMinutes, completedSeconds] =
              completedDeliveryTime.split(':').map(Number);
            completedDateTime = new Date();
            completedDateTime.setHours(
              completedHours,
              completedMinutes,
              completedSeconds,
            );
          }
        }
  
        // Проверка условий для обновления статуса доставки
        if (
          request.distribution === true &&
          (request.documentStatus === 'Доставляется' ||
            request.documentStatus === 'Забран')
        ) {
          // Перебор всех заказов в запросе
          request.orders.forEach((order) => {
            if (order.Delivery_Time) {
              const [_, deliveryTime] = order.Delivery_Time?.split(' ') || ['', ''];
              if (deliveryTime) {
                const [deliveryHours, deliveryMinutes, deliverySeconds] =
                  deliveryTime.split(':').map(Number);
                deliveryDateTime = new Date();
                deliveryDateTime.setHours(
                  deliveryHours,
                  deliveryMinutes,
                  deliverySeconds,
                );
              }
  
              // Сравнение времени доставки с текущим временем для установки статуса
              if (deliveryDateTime && currentTime > deliveryDateTime) {
                request.documentStatus = 'Доставляется с опазданием';
              } else {
                request.documentStatus = 'Доставляется вовремя';
              }
            }
          });
        }
  
        // Проверка статуса 'Доставлено'
        if (request.distribution === true && request.documentStatus === 'Доставлено') {
          // Сравнение времени завершения доставки с временем доставки для установки статуса
          if (completedDateTime && completedDateTime > deliveryDateTime) {
            request.documentStatus = 'Доставлено с опазданием';
          } else {
            request.documentStatus = 'Доставлено вовремя';
          }
        }
      });
    });
  
    // Возвращение обновленного списка водителей
    return drivers;
  }


