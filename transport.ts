.then((dataArray) => {
  dataArray.forEach(data => {
    const transformedData = this.transformToTransportRequest(data);
    console.log(transformedData, 'transformedData');
    this.model.transportRequests.push(transformedData, "vvv");
  });
})
