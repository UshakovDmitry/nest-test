setDataDelivery(data: any) {
  console.log(data , 'data');
  
  const numberPPO = data.ArrayStrings.map((item) => item.NuberPPO);

  let deliveryDate = '-/-/-';
  let deliveryTime = '-/-/-';

  // Проверяем, существует ли CompletedDelivery и не является ли оно пустым
  if (data.CompletedDelivery) {
    const parts = data.CompletedDelivery.split(' '); // Разделяем строку по пробелу
    if (parts.length === 2) { // Убеждаемся, что присутствуют и дата, и время
      deliveryDate = parts[0]; // Первая часть - это дата
      deliveryTime = parts[1]; // Вторая часть - это время
    }
  }

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
      date: deliveryDate,
      time: deliveryTime,
    },
  };
}
