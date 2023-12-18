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

  const login = useCallback(async () => {
    if (formValid) {
      try {
        await store.actions.auth.login(email, password);
        store.actions.auth.updateLoginStatus(true);
        navigate('/profile');
      } catch (error) {
        console.error("Error login:", error);
      }
    }
  }, [email, password, formValid, store, navigate]);

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
