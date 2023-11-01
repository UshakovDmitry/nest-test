  async authorize(): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('client_id', 'DispatcherWorkplace');
      formData.append('client_secret', 'secret');
      formData.append('grant_type', 'password');
      formData.append('username', this.model.email);
      formData.append('password', this.model.password);
      formData.append('scope', 'myAPIs');

      const response = await fetch('https://auth3.next.local/connect/token', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        this.saveToken(data.access_token);
        const dataToken = this.parseJwt(data.access_token);
        const transformDataToken: IUser = this.transformDataToken(dataToken);
        this.saveUser(transformDataToken);
        router.push('/dashboard');
        return true;
      } else {
        console.error('Ошибка HTTP: ' + response);
  
        return false;
      }
    } catch (error: Error | any) {
      console.error('Ошибка при авторизации:', error);
      return false;
    }
  }




мне возвращается 400 и 
{
    "error": "invalid_username_or_password",
    "errorDescription": "invalid_username_or_password"
}

хочу выводлть это в консоль



else {
      const errorData = await response.json(); // Получение тела ответа в формате JSON
      console.error('Ошибка HTTP: ' + response.status); // Вывод статуса ответа
      console.error('Ошибка: ' + errorData.error); // Вывод свойства error
      console.error('Описание ошибки: ' + errorData.errorDescription); // Вывод свойства errorDescription
      
      return false;
    }





