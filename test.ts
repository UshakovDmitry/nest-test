@Post('byDateRange')
async getTransportRequestsByDateRange(@Body() dateRangeDto: { startDate: string, endDate: string }) {
  return this.transportRequestsService.getTransportRequestsByDateRange(dateRangeDto.startDate, dateRangeDto.endDate);
}



async getTransportRequestsByDateRange(startDate: string, endDate: string): Promise<any[]> {
  return await this.dbService.getTransportRequestsByDateRange(startDate, endDate);
}




async getTransportRequestsByDateRange(startDate: string, endDate: string): Promise<any[]> {
  // Преобразование дат из строки в объект Date
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Поиск заявок в базе данных, где Date_Time_delivery находится в диапазоне между startDate и endDate
  return await this.messageModel.find({
    'ContactInformation.Date_Time_delivery': {
      $gte: start.toISOString(),
      $lte: end.toISOString(),
    },
  }).exec();
}





{
  "startDate": "2023-10-01",
  "endDate": "2023-10-10"
}
