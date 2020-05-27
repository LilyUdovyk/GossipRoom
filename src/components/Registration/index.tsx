import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

type AuthorizationProps = ReturnType<typeof mapDispatchToProps>;

const Authorization: React.FC<AuthorizationProps> = ({ regByCreds }) => {
  const [nick, setNick] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    regByCreds({ nick, login, password })
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h2>Create Account</h2>
        </div>
        <form id="form" className={style.form}>
          <div className={style.formControl}>
            <label htmlFor="login">Login</label>
            <input type="text" id="login" />
            <FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
            <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
            <small>Error message</small>
          </div>
          <div className={style.formControl}>
            <label htmlFor="nick">Nick</label>
            <input type="text" id="nick" />
            <FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
            <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
            <small>Error message</small>
          </div>
          <div className={style.formControl}>
            <label htmlFor="username">Password</label>
            <input type="password" id="password" />
            <FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
            <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
            <small>Error message</small>
          </div>
          <div className={style.formControl}>
            <label htmlFor="username">Password check</label>
            <input type="password" id="password2" />
            <FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
            <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
            <small>Error message</small>
          </div>
          <button className={style.submitBtn}>Sign Up</button>
            <p><Link to="/sign-in">Sign In</Link></p>
        </form>
      </div>
    </div>
    // <form action="" onSubmit={signUpHandler} className = {style.loginForm}>
    //   <label htmlFor="nick">Nick</label>
    //   <input
    //     type="text"
    //     id="nick"
    //     required={true}
    //     value={nick}
    //     onChange={e => setNick(e.target.value)}
    //   />

    //   <label htmlFor="login">Login</label>
    //   <input
    //     type="text"
    //     id="login"
    //     required={true}
    //     value={login}
    //     onChange={e => setLogin(e.target.value)}
    //   />

    //   <label htmlFor="password">Password</label>
    //   <input
    //     type="password"
    //     id="password"
    //     required={true}
    //     value={password}
    //     onChange={e => setPassword(e.target.value)}
    //   />
    //   <div className = {style.buttonBlock}>
    //      <button type="submit">Sign Up</button>
    //   </div>
    //   <p><Link to="/sign-in">Sign In</Link></p>
    // </form>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Authorization));