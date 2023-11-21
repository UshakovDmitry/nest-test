

  setDataDelivery(data: any) {
    console.log(data , 'data');
    
    const numberPPO = data.ArrayStrings.map((item) => item.NuberPPO);

    return {
      numberPPO: numberPPO[0],
      number1C: data.Number,
      ISR: data.ISR,
      status: data.DocumentStatus,
      courier: {
        name: data.Driver,
        phone: data.FilterContractor,
      },
      delivery: {
        date: data.CompletedDelivery ? data.CompletedDelivery : '-/-/-',
        time: data.CompletedDelivery ? data.CompletedDelivery : '-/-/-',
      },
    };
  }

Есть вот такая функция 
есть вот такая строка CompletedDelivery: "20.11.2023 18:45:24"
я хочу заносить в date 20.11.2023
а в time 18:45:24

исправь преобрахование
