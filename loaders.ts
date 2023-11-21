  async getCouriersByDate(day: string) {

    const today = new Date();

    if (day === 'tomorrow') {
      today.setDate(today.getDate() + 1); 
      this.model.date.isTomorrow = true;
      this.model.date.isToday = false;
      this.model.date.isYesterday = false;
    } else if (day === 'yesterday') {
      today.setDate(today.getDate() - 1);
      this.model.date.isTomorrow = false;
      this.model.date.isToday = false;
      this.model.date.isYesterday = true;
    } else if (day === 'today') {
      this.model.date.isTomorrow = false;
      this.model.date.isToday = true;
      this.model.date.isYesterday = false;
    }
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const body = {
      date: formattedDate,
    };
    this.model.currentDate = formattedDate;
    this.model.couriers = [];
    this.model.filteredCouriers = [];
    this.model.cities = [];
    this.model.currentCity = 'Все города';
    try {
      const response = await usePostApi('getCouriersByDate', body);
      const couriers: ICourier[] = response.map(
        (item: any): ICourier => ({
          courierFullName: item.Drivers,
          carNumber: item.carNumber,
          hiringType: item.HiringType,
          schedule: item.TimeWindow,
          hardWindow: item.HardTimeWindow,
          returnToWarehouse: item.ReturnWarehouse,
          city: item.City,
          goToDetail: '',
        }),
      );
      this.model.couriers = couriers;
      this.model.filteredCouriers = this.model.couriers;
      this.model.sortState = 'none';
      this.model.cities = [
        ...new Set(this.model.couriers.map((item) => item.city)),
      ];
    } catch (error) {
      throw error;
    }
  }


Я хочу вот тут
 this.model.cities = [
        ...new Set(this.model.couriers.map((item) => item.city)),
      ];
расставить элементы внутри массива по алфавиту (русскому) 
