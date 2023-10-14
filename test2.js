async getDriversStatsByDate(date) {
    const drivers = await this.getDriversByDate(date);
    let totalRequests = 0;
    let couriers_online = 0;
    let count_failure = 0;

    drivers.forEach((driver) => {
        // Количество всех заявок
        totalRequests += driver.transportRequests.length;
        
        // Количество курьеров у которых заполнены поля carNumber и carModel
        if (driver.carNumber.trim() !== '' && driver.carModel.trim() !== '') {
            couriers_online++;
        }
        
        // Количество заявок со статусом "Отказ клиента от заказа"
        driver.transportRequests.forEach((request) => {
            if (request.documentStatus === "Отказ клиента от заказа") {
                count_failure++;
            }
        });
    });

    return {
        totalRequests,
        couriers_online,
        count_failure
    };
}

