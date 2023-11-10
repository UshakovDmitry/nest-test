async addHistory(history) {
this.actionHistoryService.addCorrectionDutyDriversSHistory(history);
}




  async addCorrectionDutyDriversSHistory (data) {
    console.log(data, 'data');
    
    // let userAction = await this.historyModel.findOne({ name: userName }).exec();

    // if (!userAction) {
    //   userAction = new this.historyModel({ name: userName, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    // }

    // userAction.DutyDriversHistory.push({ date, userIIN });
    // await userAction.save();
    // return { status: 'success', message: 'Заявка успешно записана в историю' };
  }




Приложение запущено на порту 4000
{
  UserIIN: '681012301869',
  UserName: 'Абдуллин Р.Р.',
  date: '2023-11-02'
} data


Я закоментировал логику пока что и посмотрел что приходит 
не пойму почему до этого была ошибка
