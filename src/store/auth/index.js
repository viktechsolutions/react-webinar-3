import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      email: '',
      password: '',
      isLoggedIn: false,
      token: '',
      loginError: null,
      waiting: false
    };
  }

  async login(email, password, remember = true) {
    this.setState({ waiting: true });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: email,
          password: password,
          remember: true
        })
      });

      if (!response.ok) {
         new Error('Login failed');
      }

      const responseJson = await response.json();
      this.setState({
        isLoggedIn: true,
        token: responseJson.token,
        waiting: false
      });
      localStorage.setItem('token', responseJson.result.token);
    } catch (error) {
      this.setState({
        loginError: error.message,
        waiting: false
      });
    }

  }



  setToken(token) {
    this.setState({ token });
  }
  async logout() {
    this.setState({ waiting: true }, 'Выход пользователя');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
       new Error('Logout failed');
      }

      // Обработка успешного ответа (например, очистка состояния)
      this.setState({
        isLoggedIn: false,
        token: '',
        waiting: false
      }, 'Пользователь вышел из системы');

    } catch (error) {
      this.setState({
        loginError: error.message,
        waiting: false
      }, 'Ошибка при выходе из системы');
    }
  }
  removeToken() {
    this.setState({ isLoggedIn: false, token: ''  });
  }
}

export default AuthState;
