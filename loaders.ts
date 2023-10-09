async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));
    
    const data = response.data.data.map((item: any) => {
        const convertValue = (value: string) => {
            if (value === 'Да') return true;
            if (value === 'Нет') return false;
            throw new Error(`Unexpected value: ${value}`);
        };
        
        return {
            ...item,
            HardTimeWindow: convertValue(item.HardTimeWindow),
            ReturnWarehouse: convertValue(item.ReturnWarehouse)
        };
    });

    return data;
}
