import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import * as mediaActions from "../../store/media/actions";
import * as userActions from "../../store/user/actions";

import style from './style.module.css'
import userAvatar from '../../img/user_avatar.png'
import NewGroupBlock from "../NewGroupBlock";

const mapStateToProps = (state: IRootState) =>
 ({
  activeUserId: state.user.userData._id,
  avatar: state.user.userData.avatar ? `http://chat.fs.a-level.com.ua/${state.user.userData.avatar.url}` : userAvatar,
  imageId: state.media.fileData._id,
  imageUrl: `http://chat.fs.a-level.com.ua/${state.media.fileData.url}`
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      logout: authActions.logout,
      uploadAvatar: mediaActions.uploadFile.request,
      updateAvatar: userActions.updateAvatar.request,
    },
    dispatch
  );

type ButtonWithPopupProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface State {
  isOpenedPopup: boolean
  isAvatarUpload: boolean
}

class ButtonWithPopup extends React.PureComponent<ButtonWithPopupProps> {

  state = {
    isOpenedPopup: false,
    isAvatarUpload: false
  };

  myRef = React.createRef<HTMLDivElement>()
  myFormRef = React.createRef<HTMLFormElement>()

  closePopup = (event: any) => {
    if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
      this.setState({
        isOpenedPopup: false
      })
    }
  };

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.isOpenedPopup === this.state.isOpenedPopup) {
      return;
    }
    if (this.state.isOpenedPopup) {
      document.addEventListener("click", this.closePopup);
    } else {
      document.removeEventListener("click", this.closePopup);
    }
  }

  togglePopup = () => {
    this.setState({
      isOpenedPopup: !this.state.isOpenedPopup
    })
  }

  uploadAvatar = (form: HTMLFormElement) => {
    this.props.uploadAvatar(form)

    this.setState({
      isAvatarUpload: true
    })
  }

  updateAvatar = (user_id: string, image_id: string | null) => {
    this.props.updateAvatar({ user_id, image_id })
    this.setState({
      isOpenedPopup: false
    })
  }

  logoutHandler = () => {
    this.props.logout()
  }

  render() {
    const { isOpenedPopup, isAvatarUpload } = this.state;
    return (
      <div className={style.buttonWithPopup}>
        <button onClick={this.togglePopup} className={style.navOpener}>
          <FontAwesomeIcon icon="bars" />
        </button>
        {isOpenedPopup &&
          <div ref={this.myRef} className={style.popup}>
            <div className={style.popupHeader}>
              <img src={this.props.imageId ? this.props.imageUrl : this.props.avatar} />
              <form className={style.uploadForm}
                ref={this.myFormRef}
                method="post"
                action='/upload'
                encType="multipart/form-data"
                id="form"
              >
              <div className={style.uploadBtnWrapper}>
                  <button className={style.changeButton}>
                    Change avatar
                  </button>
                  <input
                    className={style.uploadInput}
                    type="file"
                    name="media"
                    id="media"
                    onChange={() => { if (this.myFormRef.current) this.uploadAvatar(this.myFormRef.current) }}
                  />
                </div>
              </form>
              { isAvatarUpload &&
                <button
                  className={style.okButton}
                  onClick={() => this.updateAvatar(this.props.activeUserId, this.props.imageId)}
                >
                  Ok
                </button>
              }
            </div>
            <nav className={style.navSidebar}>
              <ul className={style.navList}>
                <li
                  className={style.navItem}
                >
                  <Link to="/new_group">
                    <FontAwesomeIcon icon="comments" />
                    New group
                  </Link>
                </li>
                <li 
                  className={style.navItem}
                  onClick={() => this.logoutHandler()}
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
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonWithPopup);