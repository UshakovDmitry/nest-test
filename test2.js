async getDriversStatsByDate(date) {
    const drivers = await this.getDriversByDate(date);
    let totalRequests = 0;
    let couriers_online = 0;
    let count_failure = 0;
    let rescheduling_delivery = 0;

    drivers.forEach((driver) => {
        // Количество всех заявок
        totalRequests += driver.transportRequests.length;
        
        // Количество курьеров у которых заполнены поля carNumber и carModel
        if (driver.carNumber.trim() !== '' && driver.carModel.trim() !== '') {
            couriers_online++;
        }
        
        // Количество заявок со статусом "Отказ клиента от заказа" и "Перенос доставки"
        driver.transportRequests.forEach((request) => {
            if (request.documentStatus === "Отказ клиента от заказа") {
                count_failure++;
            }
            if (request.documentStatus === "Перенос доставки") {
                rescheduling_delivery++;
            }
        });
    });

    // Рассчет процента отказов и округление до 2 знаков после запятой
    let failure_rate = totalRequests ? (count_failure / totalRequests) * 100 : 0;
    failure_rate = parseFloat(failure_rate.toFixed(2));

    return {
        totalRequests,
        couriers_online,
        count_failure,
        failure_rate,
        rescheduling_delivery
    };
}
