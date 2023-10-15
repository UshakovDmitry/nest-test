async getTransportRequests(day: string): Promise<void> {
  console.log('getTransportRequests');

  const today = new Date();

  if (day === "tomorrow") {
    today.setDate(today.getDate() + 1);
  } else if (day === "yesterday") {
    today.setDate(today.getDate() - 1);
  }

  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const body = {
    date: formattedDate,
  };
  const response = await usePostApi('getTransportRequestsByDate', body);
  console.log(response.length, 'кол-во заявок');
  // console.log(response, 'response');
  
  response.forEach((data: any) => {
    const transformedData = this.transformToTransportRequest(data);
    const city = this.setCitiesList(transformedData);
    // Проверяем наличие города в списке и добавляем, если его нет
    if (!this.model.cities.includes(city)) {
      this.model.cities.push(city);
    }
    const transformedDataForTable = this.transformToTransportForTable(transformedData);

    this.model.transportRequests.unshift(transformedDataForTable);
    this.model.filteredTransportRequests = this.model.transportRequests;
  });
  
  this.model.isToday = (day === "today");
}













2023-10-14T10:46:36.295Z currentTime
2023-10-14T04:04:07.310Z deliveryDateTime
