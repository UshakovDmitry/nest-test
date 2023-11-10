  async addCorrectionDutyDriversSHistory (data) {
    console.log(data, 'data');
    
    let userAction = await this.historyModel.findOne({ name: data.userName }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name: data.userName, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    }

    userAction.DutyDriversHistory.push({ data.UserIIN, data.date });
    await userAction.save();
    return { status: 'success', message: 'Заявка успешно записана в историю' };
  }
}

Argument of type '{ data: any; "": any; }' is not assignable to parameter of type '{ date: string; userIIN: string; }'.
  Object literal may only specify known properties, and 'data' does not exist in type '{ date: string; userIIN: string; }'.ts(2345)
',' expected.ts(1005)
Translation
Argument of type '{ data: any; "": any; }' is not assignable to parameter of type '{ date: string; userIIN: string; }'.
I was expecting { date: string; userIIN: string; }, but you passed { data: any; "": any; }.

Object literal may only specify known properties, and 'data' does not exist in type '{ date: string; userIIN: string; }'.
You can't pass property data to type { date: string; userIIN: string; }.

(property) data: any
