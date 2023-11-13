        this.actionHistoryService.addCorrectionTransportRequestHistory({
          name: dto.userName,
          time: dto.timeDelivery,
          comment: dto.comment,
          date: dto.dateCreated
        });
  async addCorrectionTransportRequestHistory({ name, time, comment, date }: { name: string; time: string; comment: string; date: string; }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name, transportRequestHistory: [], callHistory: [] , DutyDriversHistory: [] });
    }

    userAction.transportRequestHistory.push({ time, comment, date });
    await userAction.save();
    return { status: 'success', message: 'Корректировка транспортной заявки успешно записана в историю' };
  }



Argument of type '{ time: string; comment: string; date: string; }' is not assignable to parameter of type '{ time: string; comment: string; }'.
  Object literal may only specify known properties, and 'date' does not exist in type '{ time: string; comment: string; }'.ts(2345)
Translation
Argument of type '{ time: string; comment: string; date: string; }' is not assignable to parameter of type '{ time: string; comment: string; }'.
I was expecting { time: string; comment: string; }, but you passed { time: string; comment: string; date: string; }.

Object literal may only specify known properties, and 'date' does not exist in type '{ time: string; comment: string; }'.
You can't pass property date to type { time: string; comment: string; }.

(property) date: string
