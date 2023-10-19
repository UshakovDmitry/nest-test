async getCouriersNames(city: string) {
    const couriers = await this.getCouriers();
    
    const couriersNames = couriers
        .filter(courier => courier.City.toLowerCase() === city.toLowerCase()) // Фильтрация по городу
        .map(courier => ({  // Преобразование в желаемый формат
            full_name: courier.Drivers,
            hiring_type: courier.HiringType,
            timeWindow: courier.TimeWindow,
            hard_time_window: courier.HardTimeWindow,
            return_warehouse: courier.ReturnWarehouse,
            city: courier.City,
            car_number: courier.carNumber
        }));
        
    return couriersNames;
}
