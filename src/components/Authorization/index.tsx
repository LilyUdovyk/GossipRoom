import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";

import style from './style.module.css'

const mapStateToProps = (state: IRootState) =>
 ({
  authError: state.auth.authData.error
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      authByCreds: authActions.authByCreds.request
    },
    dispatch
  );

type AuthorizationProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Authorization: React.FC<AuthorizationProps> = props => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.authByCreds({ login, password })
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h2>Authorization</h2>
        </div>
        <form action="" onSubmit={signInHandler} id="form" className={style.form}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required={true}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            { props.authError &&
              <small>Wrong login or password</small>
            }
          </div>
          <button type="submit" className={style.submitBtn}>Sign In</button>
          <p>New to GossipRoom? <Link to="/registration">Join now</Link></p>
        </form>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Authorization));