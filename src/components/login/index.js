import React, { memo } from 'react';

import './style.css';

function Login(props) {
  const {
        onEmailChange,
        onPasswordChange,
        onFormSubmit,
        email,
        password,
        formValid,
        errorResponse
        } = props;

  return (
    <div className="Login">
      <form
        className="form loginBasic__form"
        onSubmit={(e) => { e.preventDefault(); onFormSubmit(); }}
      >
        <h1>Вход</h1>
        <div className="input-container">
          <div className="input-wrapper">
            <label className="label" htmlFor="login">Логин</label>
            <input
              onChange={(e) => onEmailChange(e.target.value)}
              value={email}
              name="login"
              type="text"
              className="input email"
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <label className="label" htmlFor="password">Пароль</label>
            <input
              onChange={(e) => onPasswordChange(e.target.value)}
              value={password}
              name="password"
              type="password"
              className="input password"
            />
            {errorResponse && <div style={{color: 'red'}} className="error form__error">{errorResponse}</div>}
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
