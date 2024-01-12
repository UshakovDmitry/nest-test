export const headersMapEnum = {
  HEADER_AUTHORIZATION: "authorization",
  HEADER_LANGUAGE: "language",
  HEADER_LOCATION_ID: "location-id",
} as const;

// Функция для безопасного извлечения и парсинга токена
const getParsedToken = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  try {
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Ошибка при парсинге токена: ", error);
    return null;
  }
};

const parsedToken = getParsedToken();

// Создание объекта заголовков
export const headersMap = {
  [headersMapEnum.HEADER_AUTHORIZATION]: `Bearer ${parsedToken}`,
  [headersMapEnum.HEADER_LANGUAGE]: "ru",
  [headersMapEnum.HEADER_LOCATION_ID]: "8",
};

// Проверка наличия токена и его добавление в заголовки
if (parsedToken) {
  headersMap[headersMapEnum.HEADER_AUTHORIZATION] = `Bearer ${parsedToken}`;
}
