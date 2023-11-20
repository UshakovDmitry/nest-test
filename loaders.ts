async updateDeliveryStatus(drivers) {
    // Установка текущего времени и добавление к нему 15 минут
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 15);

    // Перебор массива drivers
    drivers.forEach((driver) => {
        // Перебор всех transportRequests каждого водителя
        driver.transportRequests.forEach((request) => {
            // Создание объектов Date для времени доставки и завершения доставки
            let deliveryDateTime = new Date('1970-01-01');
            let completedDateTime = new Date('1970-01-01');

            // Обработка времени завершения доставки на уровне request
            if (request.completedDelivery) {
                const [_, completedTime] = request.completedDelivery.split(' ');
                const [completedHours, completedMinutes, completedSeconds] = completedTime.split(':').map(Number);
                completedDateTime.setHours(completedHours, completedMinutes, completedSeconds);
            }

            // Проверка условий на наличие пометки на удаление
            if (request.IsDelete === true) {
                request.documentStatus = 'Помечено на удаление';
                return; // Пропускаем дальнейшую обработку этого запроса
            }

            // Проверка условий для обновления статуса доставки
            if (request.distribution === true) {
                // Перебор всех заказов в запросе
                request.orders.forEach((order) => {
                    if (order.Delivery_Time) {
                        const [_, deliveryTime] = order.Delivery_Time.split(' ');
                        const [deliveryHours, deliveryMinutes, deliverySeconds] = deliveryTime.split(':').map(Number);
                        deliveryDateTime.setHours(deliveryHours, deliveryMinutes, deliverySeconds);
                    }
                });

                // Сравнение времени доставки и завершения доставки
                if (request.documentStatus === 'Доставлено') {
                    if (completedDateTime < deliveryDateTime) {
                        request.documentStatus = 'Доставлено вовремя';
                    } else {
                        request.documentStatus = 'Доставлено с опазданием';
                    }
                } else if (deliveryDateTime && currentTime > deliveryDateTime) {
                    request.documentStatus = 'Доставляется с опазданием';
                } else {
                    request.documentStatus = 'Доставляется вовремя';
                }
            }
        });
    });

    // Возвращение обновленного списка водителей
    return drivers;
}
