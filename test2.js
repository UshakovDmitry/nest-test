async addHistory(history) {
this.actionHistoryService.addCorrectionDutyDriversSHistory({history.userIIN, history.userName, history.date});
}




  async addCorrectionDutyDriversSHistory ({userIIN , userName, date}: {userIIN: string; userName: string; date: string; }) {
    let userAction = await this.historyModel.findOne({ name: userName }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name: userName, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    }

    userAction.DutyDriversHistory.push({ date, userIIN });
    await userAction.save();
    return { status: 'success', message: 'Заявка успешно записана в историю' };
  }




C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:3162
    this.$__.validationError = new ValidationError(this);
                               ^
ValidationError: DispatcherAction validation failed: name: Path `name` is required.
    at model.Document.invalidate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:3162:32)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\document.js:2955:17
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\mongoose\lib\schematype.js:1368:9
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
