export const headersMapEnum = {
  HEADER_AUTHORIZATION : "authorization",
  HEADER_LANGUAGE :"language",
  HEADER_LOCATION_ID : "location-id",
} as const;


//FIXME: token
const tokenLocalStorage = localStorage.getItem("token");
const tokenSessionStorage = sessionStorage.getItem("token");
const token = tokenLocalStorage || tokenSessionStorage;
const parsedToken = token ? JSON.parse(token) : null;


export const headersMap = new Map([
  [headersMapEnum.HEADER_AUTHORIZATION, `Bearer ${JSON.parse(parsedToken)}`],
  [headersMapEnum.HEADER_LANGUAGE, "ru"],
  [headersMapEnum.HEADER_LOCATION_ID, "8"],
]);


мне нужно присваивать токент в заголовках 
он может лежать либо в локальном либо в сессион хранилище
также его надо парсить напиши правильною логику учитывая все варианты
код должен быть максимально проффесиональным и использовать последние возможности JS чтобы не рефакторить
