export interface IMeta {
  [key: string]: [string, ((value: any) => any)?];
}

export const projection = <IMeta>(meta: IMeta) => {
  const keys = Object.keys(meta as any);
  return (obj: { [key: string]: any }) => {
    const hash: { [key: string]: any } = {};
    for (const key of keys) {
      const def = (meta as any)[key];
      const [name, fn] = def;
      let val = obj[name];
      if (val) {
        if (fn) val = fn(val);
        hash[key] = val;
      }
    }
    return hash;
  }
}

const data = {
  id: 1,
  name: 'test',
  age: 10,
  email: 'fsR'
};



export class BasketMapper {
  static mapping(data: any): any {
    const newdata: any = projection({
      ID: ["id"],
      NAME: ["name"],
      AGE: ["age"],
      EMAIL: ["email"],
    })(data);
    return newdata;
  }
}

const result = BasketMapper.mapping(data);

console.log(result);


это реализация преобрахзования данных на фронтенде

ОЧЕНЬ ПОДРОБНО РАССКАЖИ ЧТО ТУТ ПРОИСХОДИТ
ОСОБЕННО ЧТО ДЕЛАЕТ projection
