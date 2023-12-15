import './style.css';
import {memo, useCallback, useEffect, useRef, useState} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import { useNavigate} from "react-router-dom";

function Login() {

  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  const [inputType, setInputType] = useState('password');
  const emailInputRef = useRef(null);
  const auth = useSelector(state => ({
   errorResponse: state.auth.loginError,
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/profile');
    }
  }, [auth.isLoggedIn]);

  const login = useCallback(() => {
    if (formValid) {
      try {
        store.actions.auth.login(email, password);
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    }
  }, [email, password]);

  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);

    if (!e.target.value) {
      setEmailError('Поле не может быть пустым');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="Login">
      <form
        className="form loginBasic__form"
        onSubmit={submitHandler}
      >
        <h1>Вход</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <label className="label" htmlFor="login">Логин</label>
            <input
              ref={emailInputRef}
              onChange={e => emailHandler(e)}
              value={email}
              onBlur={e => blurHandler(e)}
              name="login"
              type="text"
              className="input email "/>
          </div>
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <label className="label" htmlFor="password">Пароль</label>
            <input
              onChange={e => passwordHandler(e)}
              value={password}
              onBlur={e => blurHandler(e)}
              name="password"
              type={inputType}
              className="input password"
            />
            {auth.errorResponse && <div style={{color: 'red'}}  className="error form__error">Данные не корректны </div>}
          </div>
        </div>
        <button
          className="button submit"
          disabled={!formValid}
          type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}


export default memo(Login);
