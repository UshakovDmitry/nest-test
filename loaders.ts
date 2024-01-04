export const projection = <IMeta>(meta: IMeta) => {
  // Получение ключей из объекта meta
  const keys = Object.keys(meta as any);

  // Возвращаемая функция, принимающая объект данных
  return (obj: { [key: string]: any }) => {
    const hash: { [key: string]: any } = {}; // Новый объект для хранения результатов

    // Перебор ключей объекта meta
    for (const key of keys) {
      const def = (meta as any)[key]; // Получение определения для текущего ключа
      const [name, fn] = def; // Деструктуризация определения на имя и функцию
      let val = obj[name]; // Получение значения из объекта данных

      // Применение функции преобразования, если она есть
      if (val !== undefined && fn) {
        val = fn(val);
      }

      // Добавление значения в новый объект, если оно определено
      if (val !== undefined) {
        hash[key] = val;
      }
    }

    return hash; // Возвращение нового объекта
  }
}



// Определение интерфейса IMeta
export interface IMeta {
  [key: string]: [string, ((value: any) => any)?];
}

// Исходный объект данных
const data = {
  id: 1,
  name: 'test',
  age: 10,
  email: 'example@example.com'
};

// Класс BasketMapper с методом mapping
export class BasketMapper {
  static mapping(data: any): any {
    const newdata: any = projection({
      ID: ["id"],
      NAME: ["name"],
      AGE: ["age", (value: number) => value.toString()], // Преобразование числа в строку
      EMAIL: ["email"]
    })(data);
    return newdata;
  }
}

// Преобразование данных и вывод результата в консоль
const result = BasketMapper.mapping(data);
console.log(result);
