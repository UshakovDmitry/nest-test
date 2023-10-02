"Date_Time_delivery": "2023-09-30 До 20:00",


const dateTimeDelivery = "2023-09-30 До 20:00";

// Используя метод split
const date = dateTimeDelivery.split(" ")[0];
console.log(date); // "2023-09-30"

// Используя регулярные выражения
const regexMatch = dateTimeDelivery.match(/^(\d{4}-\d{2}-\d{2})/);
const extractedDate = regexMatch ? regexMatch[1] : null;
console.log(extractedDate); // "2023-09-30"
