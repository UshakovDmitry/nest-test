хочу добавить новое поле в User 



  saveUserToLocalStorage(dataToken: any) {
    const user: IUser = {
      fullName: `${dataToken.family_name} ${dataToken.given_name}`,
      position: dataToken.role,
      iin: dataToken.website,
    };


export interface IUser {
  fullName: string;
  position: string;
  iin: string;
}

но проблема в том что website выглядит вот так 
[
    "Отдел разработки ПО",
    "Разработчик ПО"
]

я хочу из этого массива получить одну строку "Отдел разработки ПО, Разработчик ПО"
тем самы пройтись по всем  элементам массива и сдедлать их одной строкой рзделяя их запятой и пробелом
