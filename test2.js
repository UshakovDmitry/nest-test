async function fetchTransportRequestsByDate() {
  // Получение текущей даты и форматирование её в нужный формат (год-месяц-день)
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  try {
    // Запрос к серверу с сегодняшней датой в качестве параметра
    const response = await fetch(`http://localhost:3000/api/transport-requests/date/${formattedDate}`);

    if (!response.ok) {
      throw new Error('Ошибка сети или сервера');
    }

    const data = await response.json(); // Парсинг ответа сервера в JSON
    console.log(data); // Вывод ответа сервера в консоль
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
}

// Выполнение функции
fetchTransportRequestsByDate();


