async getTransportRequests(day: string): Promise<void> {
    // ... (ваш текущий код)

    const response = await usePostApi('getTransportRequestsByDate', body);
    console.log(response.length, 'кол-во заявок');

    this.model.transportRequests = [];
    this.model.filterContractors = {}; // Обнуляем предыдущие данные

    response.forEach((data: any) => {
        const transformedData = this.transformToTransportRequest(data);
        
        // Получаем значение FilterContractor или присваиваем "Прочее", если значение отсутствует или пустое
        const contractor = data.FilterContractor ? data.FilterContractor : "Прочее";
        
        // Увеличиваем счетчик для каждого уникального FilterContractor
        if (this.model.filterContractors[contractor]) {
            this.model.filterContractors[contractor] += 1;
        } else {
            this.model.filterContractors[contractor] = 1;
        }

        // ... (остальной ваш код, связанный с обработкой и трансформацией данных)
    });

    // ... (ваш текущий код)
}
