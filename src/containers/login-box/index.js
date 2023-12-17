import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login";

function LoginBox() {
  const store = useStore();
  const navigate = useNavigate();
  const auth = useSelector(state => ({
    errorResponse: state.auth.loginError,
    isLoggedIn: state.auth.isLoggedIn,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (auth.isLoggedIn) {
      console.log(auth.isLoggedIn);
      navigate('/profile');
    }
  }, [auth.isLoggedIn, navigate]);

  const login = useCallback(() => {
    if (formValid) {
      try {
        store.actions.auth.login(email, password);
        store.actions.auth.updateLoginStatus(true);
        store.actions.auth.setToken(store.getState().auth.token);
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    }
  }, [email, password, formValid, store.actions.auth]);

  const onEmailChange = (value) => {
    setEmail(value);
    setFormValid(!!value && !!password);
  };

  const onPasswordChange = (value) => {
    setPassword(value);
    setFormValid(!!email && !!value);
  };

  return (
    <Login
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onFormSubmit={login}
      email={email}
      password={password}
      formValid={formValid}
      errorResponse={auth.errorResponse}
    />
  );
}

export default memo(LoginBox);
