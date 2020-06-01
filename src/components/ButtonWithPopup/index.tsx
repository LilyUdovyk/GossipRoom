import React, { useRef } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as actions from "../../store/auth/actions";
import * as mediaAction from "../../store/media/actions";
import * as userAction from "../../store/user/actions";

import style from './style.module.css'
import userAvatar from '../../img/user_avatar.png'

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
      logout: actions.logout,
      uploadAvatar: mediaAction.uploadFile.request,
      updateAvatar: userAction.updateAvatar.request,
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

  uploadAvatar = (form: any) => {
    this.props.uploadAvatar(form)

    this.setState({
      isAvatarUpload: !this.state.isAvatarUpload
    })
  }

  updateAvatar = (user_id: string, image_id: string | null) => {
    this.props.updateAvatar({ user_id, image_id })
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
                <li onClick={() => this.logoutHandler()} className={style.navItem}>
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