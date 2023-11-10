вся цепочка 

  @Post('/correction') 
  async setDutyDrivers(@Body() dto: CorrectionDto) {
   const { cap, items, history } = dto;
    this.dutydriversService.addHistory(history);
    return this.dutydriversService.setDutyDrivers(cap, items);
  }

затем

  async addHistory(history) {
this.actionHistoryService.addCorrectionDutyDriversSHistory(history);
}
затем
  async addCorrectionDutyDriversSHistory (data) {
    console.log(data, 'data');
    
    let userAction = await this.historyModel.findOne({ name: data.userName }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name: data.userName, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    }

    userAction.DutyDriversHistory.push({ userIIN:data.UserIIN, date:data.date });
    await userAction.save();
    return { status: 'success', message: 'Заявка успешно записана в историю' };
  }



[Nest] 9500  - 10.11.2023, 15:21:28     LOG [RouterExplorer] Mapped {/api/dutydrivers, POST} route +0ms
[Nest] 9500  - 10.11.2023, 15:21:29     LOG [RouterExplorer] Mapped {/api/dutydrivers/correction, POST} route +1ms
[Nest] 9500  - 10.11.2023, 15:21:29     LOG [NestApplication] Nest application successfully started +1ms
Приложение запущено на порту 4000
{
  UserIIN: '681012301869',  
  UserName: 'Абдуллин Р.Р.',
  date: '2023-11-02'        
} data


C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:3162
    this.$__.validationError = new ValidationError(this);
                               ^
ValidationError: DispatcherAction validation failed: name: Path `name` is required.
    at model.Document.invalidate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:3162:32)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:2955:17
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\schematype.js:1368:9
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> 
