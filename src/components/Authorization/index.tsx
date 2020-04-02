import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";

import style from './style.module.scss'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      authByCreds: authActions.authByCreds.request
    },
    dispatch
  );

type AuthorizationProps = ReturnType<typeof mapDispatchToProps>;

const Authorization: React.FC<AuthorizationProps> = ({ authByCreds }) => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    authByCreds({ login, password })
  }

  return (
    <form action="" onSubmit={signInHandler} className = {style.loginForm}>
      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        required={true}
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required={true}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className = {style.buttonBlock}>
         <button type="submit">Sign In</button>
      </div>
      <p>New to Chat? <Link to="/registration">Join now</Link></p>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Authorization));