saveUserToLocalStorage(dataToken: any) {
  // Проверяем, является ли website массивом и есть ли в нем элементы
  let position = '';
  if (Array.isArray(dataToken.website) && dataToken.website.length > 0) {
    // Присоединяем элементы массива, разделяя их запятыми и пробелами
    position = dataToken.website.join(', ');
  }

  const user: IUser = {
    fullName: `${dataToken.family_name} ${dataToken.given_name}`,
    position: position, // используем объединенную строку
    iin: dataToken.profile, // возможно, вы хотите использовать profile для iin
  };

  // Сохраняем каждое поле пользователя в локальном хранилище под своим уникальным ключом
  localStorage.setItem('userFullName', user.fullName);
  localStorage.setItem('userPosition', user.position);
  localStorage.setItem('userIin', user.iin);
}
