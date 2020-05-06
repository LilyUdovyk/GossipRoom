import React, { useRef } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as actions from "../../store/auth/actions";
import * as MediaAction from "../../store/media/actions";

import style from './style.module.css'
// import Uploader from '../Uploader'

const mapStateToProps = (state: IRootState) => ({
  activeUserId: state.user.userData._id,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      logout: actions.logout,
      changeAvatar: MediaAction.changeAvatar.request
    },
    dispatch
  );

type ButtonWithPopupProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface State {
  isOpenedPopup: boolean
}

class ButtonWithPopup extends React.PureComponent<ButtonWithPopupProps> {

  state = {
    isOpenedPopup: false,
  };

  myRef: React.RefObject<HTMLDivElement> = React.createRef()
  myFormRef: React.RefObject<HTMLFormElement> = React.createRef()

  closePopup = (event: any) => {
    console.log(this.myRef)
    if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
      console.log("TCL: Button -> closePopup -> event", event)
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
      console.log("addEventListener", prevState);
      document.addEventListener("click", this.closePopup);
    } else {
      console.log("removeEventListener");
      document.removeEventListener("click", this.closePopup);
    }
  }

  togglePopup = () => {
    this.setState({
      isOpenedPopup: !this.state.isOpenedPopup
    })
  }

  // changeAvatarHendler = async (e: any, user_id: string) => {
  //   let form = new FormData();
  //   console.log(e.target.files[0])
  //   form.append('media', e.target.files[0]);
  //   this.props.changeAvatar({user_id})
  // }

  changeAvatarHendler = async () => {
    try {
      console.log(this.myFormRef.current)
      const response = await fetch('http://chat.fs.a-level.com.ua/upload', 
                      {
                        method: "POST",
                        headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
                        body: new FormData(this.myFormRef.current ? this.myFormRef.current : undefined)
                      }  );
      console.log(response)
      const result = response.json();
      return response.ok ? result : new Error('status is not 200')
    } catch (error) {
      return new Error('dataPost failed')
    }
  }

  logoutHandler = () => {
    this.props.logout()
  }

  render() {
    const { isOpenedPopup } = this.state;
    return (
      <div className={style.buttonWithPopup}>
        <button onClick={this.togglePopup} className={style.navOpener}>
          <FontAwesomeIcon icon="bars" />
        </button>
        {isOpenedPopup &&
          <div ref={this.myRef} className={style.popup}>
            <nav className={style.navSidebar}>
              <form className={style.uploadForm}
                ref={this.myFormRef}   
                method="post"
                action='/upload'
                encType ="multipart/form-data"
                id="form"
              >
                <img src="https://i.postimg.cc/G2S2gwyX/Mavka-R-i02.jpg" />
                <div className={style.uploadBtnWrapper}>        
                  <button className={style.changeButton}>
                    Change avatar
                  </button>
                  <input 
                    className={style.uploadInput}
                    type="file"
                    name="media"
                    id="media"
                    onChange={() => this.changeAvatarHendler()}
                  />
                </div>
                <button className={style.okButton}>Ok</button>        
              </form>
              <ul className={style.navList}>
                <li className={style.navItem}>
                  <FontAwesomeIcon icon="user-friends" />
                  Contacts
                </li>
                <li className={style.navItem}>
                  <FontAwesomeIcon icon="comments" />
                  Chats
                </li>
                <li onClick={() => this.logoutHandler()} className={style.navItem}>
                  <FontAwesomeIcon icon="sign-out-alt" />
                  Exit
                </li>
              </ul>
            </nav>
          </div>

          // <div ref={this.myRef} className={style.popup}>
          //   <nav className={style.navSidebar}>
          //     <form ref={this.myFormRef} action='http://shop-roles.asmer.fs.a-level.com.ua/upload' encType ="multipart/form-data" id="form" method="post">
          //       {/* <div className="uploadBtnWrapper">
          //         <button className="button">
          //           Change avatar
          //         </button> */}
          //         <input type="file"
          //           name="media"
          //           id="media"
          //           onChange={() => this.changeAvatarHendler()}
          //         />
          //       {/* </div> */}
          //       <button id="okButton" disabled={true}>Ok</button>
          //     </form>
          //     <ul className={style.navList}>
          //       <li className={style.navItem}>Contacts</li>
          //       <li className={style.navItem}>Chats</li>
          //       <li className={style.navItem}>Settings</li>
          //       <li 
          //         className={style.navItem}
          //         onClick={()=> this.logoutHandler()}
          //       >
          //         Exit
          //       </li>
          //     </ul>
          //   </nav>
          // </div>
        }
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonWithPopup);