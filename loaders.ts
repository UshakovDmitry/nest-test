export class CouriersViewModel {
  model: CouriersModel;

  constructor(model: CouriersModel) {
    this.model = model;
    this.getCouriers();
  }

  async getCouriers(): Promise<void> {
    try {
      const response = await useGetApi('getCouriers');
      console.log(response, 'response');

      // Маппинг ответа в массив объектов ICourier
      const couriers: ICourier[] = response.map((item: any): ICourier => ({
        courierFullName: item.Drivers,       // Используем свойства из ответа сервера
        carNumber: item.carNumber,
        type: item.HiringType,               // Предполагаю, что это правильное свойство
        schedule: item.TimeWindow,           // Аналогично, это предположение
        hardWindow: item.HardTimeWindow ? 'Да' : 'Нет', // Если это булевое значение
        returnToWarehouse: item.ReturnWarehouse ? 'Да' : 'Нет', // Аналогично
        city: item.City,
      }));

      // Сохраняем массив couriers в вашей модели (предполагая, что у модели есть такое свойство)
      this.model.couriers = couriers;

    } catch (error) {
      throw error;
    }
  }
}



