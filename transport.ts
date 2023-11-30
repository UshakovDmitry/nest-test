помоги написать сортировку в таблице
вот фуекции

  sortRequests(index: string) {
    const propertyToSortBy = this.getPropertyByIndex(index); 
    
    switch (this.model.sortState) {
      case 'none':
      case 'descending':
        this.model.sortState = 'ascending';
        this.model.filteredTransportRequests.sort(
          (a, b) => a[propertyToSortBy].length - b[propertyToSortBy].length,
        );
        break;
      case 'ascending':
        this.model.sortState = 'descending';
        this.model.filteredTransportRequests.sort(
          (a, b) => b[propertyToSortBy].length - a[propertyToSortBy].length,
        );
        break;
    }
  }

  getPropertyByIndex(index: number) {
    switch (index) {
      case 0:
        return 'NumberTS';
      default:
        throw new Error(`Не смог определить индекс! Индекс: ${index}`);
    }
  }


  transformToTransportRequest(data: any) {
    return {
      request: {
        number: String(data.Number),
        status: data.Driver && data.Driver !== '' ? true : false,
      },
      status:
        data.IsDelete === true
          ? String((data.DocumentStatus += ' (помечено на удаление)'))
          : String(data.DocumentStatus),
      ISR: {
        number: String(data.ISR),
        status: String(data.loanAgreementStatus),
      },
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NumberPPO),
      organization: String(data.Organization),
      typePayment: String(data.TypePayment),
      loanAgreementStatus: String(data.loanAgreementStatus),
      quantities: data.StructureQuantities,
      chronologies: data.ArrayChronologies,
      contactInformation: data.ContactInformation,
      orders: data.ArrayStrings,
      dataCreated: String(data.DateCreated),
      date: String(data.Date),
      driver: String(data.Driver),
      filterContractor: String(data.FilterContractor),
    };
  }

нужно сортировать по request.status это булево значение

когда я получаю данные я их трансформирую под таблицу
  async getTransportRequests(day: string): Promise<void> {
    const today = new Date();

    if (day === 'tomorrow') {
      today.setDate(today.getDate() + 1);
      this.model.isTomorrow = true;
      this.model.isToday = false;
      this.model.isYesterday = false;
    } else if (day === 'yesterday') {
      today.setDate(today.getDate() - 1);
      this.model.isTomorrow = false;
      this.model.isToday = false;
      this.model.isYesterday = true;
    } else if (day === 'today') {
      this.model.isTomorrow = false;
      this.model.isToday = true;
      this.model.isYesterday = false;
    }

    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const body = {
      date: formattedDate,
    };

    const response = await usePostApi('getTransportRequestsByDate', body);
    console.log(response.length, 'кол-во заявок');
    this.model.transportRequests = [];
    this.model.filterContractors = {};

    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }
      if (!this.model.cities.includes('Все города')) {
        this.model.cities.unshift('Все города');
      }

      const contractor = data.FilterContractor
        ? data.FilterContractor
        : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);

      this.model.transportRequests.unshift(transformedDataForTable);
      this.model.filteredTransportRequests = this.model.transportRequests;
    });
  }
 <table-component
          :headers="model.headersTransportRequests"
          :rows="model.filteredTransportRequests"
          :config="model.configTransportRequests"
          :currentCity="model.currentCity"
          :currentContractor="model.currentContractor"
          @sort="viewModel.sortRequests($event)"
          :pagination="true"
          :hover="true"
          @goToDetailRequest="viewModel.goToTransportRequestDetail($event)"
        ></table-component>



