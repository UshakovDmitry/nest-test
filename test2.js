  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const newHistoryEntry = new this.historyModel({
      name,
      time,
      comment,
    });
