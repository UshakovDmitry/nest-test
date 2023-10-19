async getNotPredictedTransportRequestsByDate(date): Promise<any[]> {
  const requestsByDate = await this.dbService.getTransportRequestsByDate(date);
  
  const notPredictedRequests = requestsByDate.filter(request => 
    request.Driver.trim() === "" && 
    request.NumberCar.trim() === "" && 
    (request.CarModel ? request.CarModel.trim() === "" : true) // проверяет CarModel только если оно существует
  );
  
  return notPredictedRequests;
}
