 async getDriversStatsByDate (date) {
  const drivers = await this.getDriversByDate(date);
  let totalRequests = 0;
  drivers.forEach((driver) => {
    totalRequests += driver.transportRequests.length;
  }
  );
  return {
    totalRequests,
  };
}
