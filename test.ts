 getData(): void {
    fetch('http://localhost:4000/rabbitmq/read', {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Возникла ошибка при получении данных');
        }
      })
      .then((data) => {
        const transformedData = this.transformToTransportRequest(data);
        console.log(transformedData);
        this.model.transportRequests.push(transformedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
