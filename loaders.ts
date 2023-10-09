async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));

    const data = await Promise.all(response.data.data.map(async (item: any) => {
        const convertValue = (value: string, fieldName: string) => {
            if (value === 'Да') return true;
            if (value === 'Нет') return false;
            return value; // Лучше добавить обработку неизвестных значений
        };

        let carNumberFromDB = '';

        // Например, предполагая, что у вас есть метод для получения драйвера из базы данных:
        const driverFromDB = await getDriverFromDatabase(item.Drivers);
        if (driverFromDB) {
            carNumberFromDB = driverFromDB.NumberCar;
        }

        return {
            ...item,
            carNumber: carNumberFromDB,
            HardTimeWindow: convertValue(item.HardTimeWindow, 'HardTimeWindow'),
            ReturnWarehouse: convertValue(item.ReturnWarehouse, 'ReturnWarehouse')
        };
    }));

    return data;
}

async function getDriverFromDatabase(driverName: string) {
    // Этот метод будет делать запрос к вашей базе данных и искать драйвера по имени.
    // Это просто заглушка, вам нужно будет реализовать логику запроса на основе вашей базы данных и системы.
    // Возвращаемое значение может быть объектом драйвера или null, если драйвер не найден.

    // Например:
    // return await db.collection('drivers').findOne({ Driver: driverName });
}
