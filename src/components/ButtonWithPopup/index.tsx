import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as userActions from "../../store/user/actions";

import style from './style.module.css'
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) =>
 ({
  nick: state.user.userData.nick,
  login: state.user.userData.login,
  avatar: state.user.userData.avatar ? `http://chat.fs.a-level.com.ua/${state.user.userData.avatar.url}` : userAvatar,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      logout: userActions.logout,
    },
    dispatch
  );

type ButtonWithPopupProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const ButtonWithPopup: React.FC<ButtonWithPopupProps> = props => {  

  const [isOpenedPopup, setIsOpenedPopup] = React.useState(false);

  const myRef = React.useRef<HTMLDivElement>(null);

  const closePopup = React.useCallback(
    (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (myRef.current && !myRef.current.contains(event.target)) {
        setIsOpenedPopup(false);
      }
    },
    [setIsOpenedPopup]
  )

  React.useEffect(() => {
    if (isOpenedPopup) {
      document.addEventListener("click", closePopup);
    } else {
      document.removeEventListener("click", closePopup);
    }
  }, [isOpenedPopup, closePopup])

  const togglePopup = () => {
    setIsOpenedPopup(!isOpenedPopup)
  }

  const logoutHandler = () => {
    props.logout()
  }

  return (
    <div className={style.buttonWithPopup}>
      <button onClick={togglePopup} className={style.navOpener}>
        <FontAwesomeIcon icon="bars" />
      </button>
      {isOpenedPopup &&
        <div ref={myRef} className={style.popup}>
          <div className={style.popupHeader}>
            <img src={props.avatar} alt={"User avatar"} />
            <p>{ props.nick || props.login}</p>
          </div>
          <nav className={style.navSidebar}>
            <ul className={style.navList}>
              <li
                className={style.navItem}
              >
                <Link to='/new-group'>
                  <FontAwesomeIcon icon="comments" />
                  New group
                </Link>
              </li>
              <li
                className={style.navItem}
              >
                <Link to='/user-settings'>
                  <FontAwesomeIcon icon="cogs" />
                  User Settings
                </Link>
              </li>
              <li 
                className={style.navItem}
                onClick={() => logoutHandler()}
              >
                <FontAwesomeIcon icon="sign-out-alt" />
                Exit
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ButtonWithPopup));