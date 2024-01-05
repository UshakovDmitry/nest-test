function cantBeatSoJoin(numbers) {
  // Проходим по каждому подмассиву, изменяя порядок его элементов на обратный
  const reversedSubarrays = numbers.map(subarray => subarray.reverse());

  // Объединяем все подмассивы в один массив
  const result = [].concat(...reversedSubarrays);

  return result;
}

// Теперь вы можете проверить эту функцию с вашими тестами
