export class AuthViewModel {
  model: AuthModel;

  constructor(model: AuthModel) {
    this.model = model;
  }

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
        storeProviderSetValue('token', data.access_token);
        const dataToken = this.parseJwt(data.access_token);
        console.log(dataToken, 'dataToken');
        this.saveUserToLocalStorage(dataToken); // Сохраняем данные пользователя
        
        // router.push('/dashboard');
        return true;
      } else {
        console.error('Авторизация не удалась:', await response.text());
        return false;
      }
    } catch (error: Error | any) {
      console.error(error.message);
      return false;
    }
  }

  // ... (остальной код)

  saveUserToLocalStorage(dataToken: any) {
    const user: IUser = {
      fullName: `${dataToken.family_name} ${dataToken.given_name}`,
      iin: dataToken.profile,
    };
    
    localStorage.setItem('user', JSON.stringify(user));
  }

  // ... (остальной код)
}
