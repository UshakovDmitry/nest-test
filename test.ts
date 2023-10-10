async getDriversByName(name: string) {
    const drivers = await this.getAllDrivers();
    
    const filteredDrivers = drivers.filter(driver => driver.driver === name);
    
    return filteredDrivers;
}
