import StoreModule from "../module";
import {authService} from "../services/auth-service";

class AuthState extends StoreModule {
  initState() {
    return {
      email: '',
      password: '',
      isLoggedIn: false,
      token: '',
      loginError: null,
      waiting: false,
      name: '',
      phone: '',
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
        const responseJson = await response.json();
        const errorMessage = responseJson.error.data.issues[0].message;
        this.setState({
          loginError: errorMessage,
          waiting: false
        });

        return;
      }

      const responseJson = await response.json();
      console.log("responseJson", responseJson);
      this.setState({
        ...this.getState(),
        name: responseJson.result.user.profile.name,
        phone: responseJson.result.user.profile.phone,
        email: responseJson.result.user.email,
        isLoggedIn: true,
        token: responseJson.result.token,
        waiting: false
      });
      authService.setToken(responseJson.result.token);
    } catch (error) {
      this.setState({
        loginError: error.message,
        waiting: false
      });
    }
  }

  updateLoginStatus(isLoggedIn) {
    this.setState({ isLoggedIn });
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
          'X-Token': authService.getToken('token'),
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
       new Error('Logout failed');
      }

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
}

export default AuthState;
