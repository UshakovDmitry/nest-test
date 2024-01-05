function cantBeatSoJoin(numbers) {
  // Объединяем все подмассивы в один массив
  const flattened = numbers.reduce((acc, val) => acc.concat(val), []);

  // Сортируем массив в соответствии с требованиями задачи
  const result = [];
  while (flattened.length) {
    const pair = flattened.splice(-2, 2); // Берем последние два элемента
    result.push(...pair.reverse()); // Переворачиваем и добавляем в результат
  }

  return result;
}
