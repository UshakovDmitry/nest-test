async getDriversStatsByDate(date) {
    const drivers = await this.getDriversByDate(date);
    let totalRequests = 0;
    let couriers_online = 0;
    
    drivers.forEach((driver) => {
        totalRequests += driver.transportRequests.length;

        if (driver.carNumber.trim() !== "" && driver.carModel.trim() !== "") {
            couriers_online++;
        }
    });
    
    return {
        totalRequests,
        couriers_online
    };
}
