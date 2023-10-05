async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:4000/api/getTransportRequests/byDateRange',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
          }),
        },
      );

      if (!response.ok) {
        console.error('Сетевой ответ не был ok.', response.statusText);
        return;
      }
      const data = await response.json();

      // Очистить текущие данные перед добавлением новых
      this.model.transportRequests = [];

      data.forEach((dataItem: any) => {
        const transformedData = this.transformToTransportRequest(dataItem);
        const transformedDataForTable = this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      });

    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
}
