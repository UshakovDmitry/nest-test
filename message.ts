transformDataToken(dataToken: any) {
  let position = '';
  if (Array.isArray(dataToken.website) && dataToken.website.length > 0) {
    position = dataToken.website.join(', ');
  }

  // Проверка наличия свойства role в токене
  const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  if (!dataToken[roleClaim]) {
    throw new Error("Отсутствует свойство role в токене");
  }

  const user: IUser = {
    fullName: `${dataToken.family_name} ${dataToken.given_name}`,
    position: position,
    iin: dataToken.profile,
    role: dataToken[roleClaim], // Добавление свойства role
  };
  return user;
}
