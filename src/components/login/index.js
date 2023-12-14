import './style.css';
import {memo, useCallback, useEffect, useRef, useState} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Login () {

  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const [formValid, setFormValid] = useState(false);
  const [inputType, setInputType] = useState('password');
   const emailInputRef = useRef(null);

  const login = useCallback(() => {
    if (formValid) {
      try {
        store.actions.auth.login(email, password);
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    }
  }, [email, password]); // Зависимости useCallback

  const submitHandler = (e) => {
    e.preventDefault();
    login(); // Вызов функции login в обработчике отправки формы
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);

    if (!e.target.value) {
      setEmailError('Login cannot be empty');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    if (!e.target.value) {
      setPasswordError('Password cannot be empty');
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

  const {t} = useTranslate();

//   // В вашем компоненте, например, в Header или где-то еще
//   const { auth } = useStore();
//
//   const handleLogout = async () => {
//     await auth.logout();
//   };
//
// // В разметке:
//   <button onClick={handleLogout}>Выйти</button>
//

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
            {(emailDirty && emailError) && <div
              className="error form__error"
            >{emailError}</div>}
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
            {(passwordDirty && passwordError) && <div
              className="error form__error"
            >{passwordError}</div>}
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
