import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames';

import { IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";

import style from './style.module.css'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      regByCreds: authActions.regByCreds.request
    },
    dispatch
  );

type RegistrationProps = ReturnType<typeof mapDispatchToProps>;

const Registration: React.FC<RegistrationProps> = ({ regByCreds }) => {
  const [nick, setNick] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  
  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== password2) {
      setPasswordError("Passwords does not match")
      return
    }
    regByCreds({ nick, login, password })
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h2>Create account</h2>
        </div>
        <form action="" onSubmit={signUpHandler} id="form" className={style.form}>
          <div className={style.formControl}>
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              required={true}
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              id="nick"
              required={true}
              value={nick}
              onChange={e => setNick(e.target.value)}
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required={true}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="password2">Password check</label>
            <input
              type="password"
              id="password2"
              required={true}
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <small>{passwordError}</small>
          </div>
          <button className={style.submitBtn}>Sign Up</button>
          <p>Have an account?  <Link to="/sign-in">Sign In</Link></p>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Registration));