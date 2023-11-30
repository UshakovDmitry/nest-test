функуия которая отображает только те заявке которые совпадают с тем что выбрал позьзователь

  filterTableByCity(city: string): void {

    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredCouriers = this.model.couriers;
      return;
    }
    this.model.filteredCouriers = this.model.couriers.filter(
      (item) => item.city === city,
    );
  }

также есть функция для поиска 
  search(value: string): void {
    this.model.filteredCouriers = this.model.couriers.filter((item) => {
      return item.courierFullName.toLowerCase().includes(value.toLowerCase());
    });
  }


и проблема в том что когда я выбираю город и отображается только те данные которые совпадают с городо
а поиск осуществляется по всем данным и не учитывает 
