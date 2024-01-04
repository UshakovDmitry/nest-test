const url = 'http://b2b-api.backend.dev.next.local:8920/catalog/categories';
const token = '229Lnvyghujiok454tnj'; // Ваш Bearer токен
const requestBody = {
  brand_id: 186,    // Значение brand_id
  category_id: 8    // Значение category_id
};

fetch(url, {
  method: 'POST', // Предполагаемый метод запроса (исходя из вашего описания)
  headers: {
    'Authorization': `Bearer ${token}`, // Добавление токена в заголовок
    'Content-Type': 'application/json'   // Указание типа содержимого запроса
  },
  body: JSON.stringify(requestBody) // Конвертация объекта запроса в строку JSON
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // Разбор JSON-ответа
})
.then(data => console.log(data)) // Обработка данных
.catch(error => console.error('Error:', error)); // Обработка ошибок
