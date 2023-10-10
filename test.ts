async getTransportRequests(): Promise<void> {
  const response = await useGetApi('getTransportRequests');
  console.log(response.length, 'кол-во заявок');

  // Перезаписываем массив transportRequests с новыми данными
  this.model.transportRequests = response.map((data: any) => {
    const transformedData = this.transformToTransportRequest(data);
    return this.transformToTransportForTable(transformedData);
  });

  // Обновляем список городов
  this.model.cities = [];
  response.forEach((data: any) => {
    const city = this.setCitiesList(this.transformToTransportRequest(data));
    if (!this.model.cities.includes(city)) {
      this.model.cities.push(city);
    }
  });
}

