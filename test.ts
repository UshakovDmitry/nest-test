async getDriversByDate(date: string) {
    const drivers = await this.getAllDrivers();

    const filteredDrivers = drivers.map(driver => {
        const filteredRequests = driver.transportRequests.filter(transportRequest => {
            return transportRequest.contactInformation.Date_Time_delivery.split(' ')[0] === date;
        });

        return { ...driver, transportRequests: filteredRequests };
    }).filter(driver => driver.transportRequests.length > 0);

    return filteredDrivers;
}
