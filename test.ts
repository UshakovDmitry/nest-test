  transformTransport(data) {
    return {
      carBrand: data.Brandcar[0]?.Brand || '',
      carNumber: data.RegistrationNumber,
      carVolume:
        (parseInt(data.MaximumLoadLength.replace(/\s+/g, '')) *
          parseInt(data.MaximumCargoWidth.replace(/\s+/g, '')) *
          parseInt(data.MaximumLoadHeight.replace(/\s+/g, ''))) /
        1000000000,
      carType: data.LoadType.map((item) => item.Type),

      loadingCapacity: parseInt(data.LoadingCapacity.replace(/\s+/g, '')), // убираем пробелы и конвертируем в число
      city: data.City,
      timeWindow: data.WorkingSchedule[0]?.TimeWindow || '',
    };
  }

  async getTransport() {
    const response = await firstValueFrom(
      this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/ParametersCars'),
    );
    return response.data.data.map(this.transformTransport);
  }
}

