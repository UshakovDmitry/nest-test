function updateDeliveryStatus(drivers) {
    const currentTime = new Date(); // Получение текущего времени

    drivers.forEach(driver => { // Проход по каждому водителю в массиве drivers
        driver.transportRequests.forEach(request => { // Проход по каждому транспортному запросу в массиве transportRequests
            if (request.distribution && request.documentStatus === "Доставляется") { // Проверка, удовлетворяет ли заявка условиям
                request.orders.forEach(order => { // Проход по каждому заказу в массиве orders
                    const [_, deliveryTime] = order.Delivery_Time.split(' '); // Извлечение времени доставки из строки Delivery_Time
                    const [deliveryHours, deliveryMinutes, deliverySeconds] = deliveryTime.split(':').map(Number); // Разделение времени доставки на часы, минуты и секунды
                    const deliveryDateTime = new Date(); // Создание объекта даты для времени доставки
                    deliveryDateTime.setHours(deliveryHours, deliveryMinutes, deliverySeconds); // Установка времени доставки в объект даты

                    if (currentTime > deliveryDateTime) { // Сравнение текущего времени с временем доставки
                        request.documentStatus = "Доставляется с опазданием"; // Обновление статуса, если текущее время больше времени доставки
                    } else {
                        request.documentStatus = "Доставляется вовремя"; // Обновление статуса, если текущее время меньше или равно времени доставки
                    }
                });
            }
        });
    });

    return drivers; // Возвращение обновленного массива drivers
}

// Пример использования функции
const updatedDrivers = updateDeliveryStatus(driversArray); // Обновление статусов и сохранение результатов в переменной
console.log(updatedDrivers); // Вывод обновленного массива drivers в консоль
