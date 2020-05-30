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

type RegistrationProps = ReturnType<typeof mapDispatchToProps>;

// const Registration: React.FC<RegistrationProps> = ({ regByCreds }) => {
//   const [nick, setNick] = React.useState("");
//   const [login, setLogin] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [password2, setPassword2] = React.useState("");
  
//   const loginValue = login.trim() !== "" ? true : false;
//   const nickValue = nick.trim() !== "" ? true : false;
//   const passwordValue = password.trim() !== "" ? true : false;
//   const password2Value = password2.trim() !== "" ? true : false;

//   const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     /* checkInputs() */;
//     regByCreds({ nick, login, password })
//   }

//   return (
//     <div className={style.container}>
//       <div className={style.card}>
//         <div className={style.header}>
//           <h2>Create Account</h2>
//         </div>
//         <form id="form" className={style.form}>
//           <div className={style.formControl}>
//             <label htmlFor="login">Login</label>
//             <input type="text" id="login" />
//             { loginValue &&
//             	<FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
//             }
//             { !loginValue &&
//               <>
//                 <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
//                 <small>Login cannot be blank</small>
//               </>
//             }
//           </div>
//           <div className={style.formControl}>
//             <label htmlFor="nick">Nick</label>
//             <input type="text" id="nick" />
//             { nickValue &&
//             	<FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
//             }
//             { !nickValue &&
//               <>
//                 <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
//                 <small>Nick cannot be blank</small>
//               </>
//             }
//           </div>
//           <div className={style.formControl}>
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" />
//             { passwordValue &&
//             	<FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
//             }
//             { !passwordValue &&
//               <>
//                 <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
//                 <small>Password cannot be blank</small>
//               </>
//             }
//           </div>
//           <div className={style.formControl}>
//             <label htmlFor="password2">Password check</label>
//             <input type="password" id="password2" />
//             { password2Value &&
//             	<FontAwesomeIcon icon="check-circle" className={style.checkCircle} />
//             }
//             { if (!password2Value) {
//                 <>
//                   <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
//                   <small>Password check cannot be blank</small>
//                 </>
//              } else if (passwordValue !== password2Value) {
//                 <>
//                   <FontAwesomeIcon icon="exclamation-circle" className={style.exclamationCircle} />
//                   <small>Passwords does not match</small>
//                 </>
//              }
//             }
//           </div>
//           <button className={style.submitBtn}>Sign Up</button>
//           <p><Link to="/sign-in">Sign In</Link></p>
//         </form>
//       </div>
//     </div>

const Registration: React.FC<RegistrationProps> = ({ regByCreds }) => {
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
        <form action="" onSubmit={signUpHandler} id="form" className={style.form}>
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
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Registration));