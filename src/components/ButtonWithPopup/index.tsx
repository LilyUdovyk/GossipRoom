import * as React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as actions from "../../store/auth/actions";
import * as MediaAction from "../../store/media/actions";

import style from './style.module.css'
import grid from '../../img/grid.png'

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

  myRef: React.RefObject < HTMLDivElement > = React.createRef()

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

  togglePopup = (event: React.MouseEvent) => {
    this.setState({
      isOpenedPopup: !this.state.isOpenedPopup
    })
  }

  changeAvatarHendler = async (e: any, user_id: string) => {
    const form = new FormData();
    form.append('file', e.target.files[0]);
    // form.append('name', 'some value user types');
    console.log("form", form)
    this.props.changeAvatar({user_id, form})
  }


  logoutHandler = () => {
    this.props.logout()
  }

  render() {
    const { isOpenedPopup } = this.state;
    return (
      <div className={style.buttonWithPopup}>
        <button onClick={ this.togglePopup }>
          <img src={grid} alt="Menu" className={style.popupOpener} />
        </button>
        {isOpenedPopup && 
          <div ref={this.myRef} className={style.popup}>
            <nav className={style.navSidebar}>
              <form action="" id="form">
                {/* <div className="uploadBtnWrapper">
                  <button className="button">
                    Change avatar
                  </button> */}
                  <input type="file"
                    name="media"
                    id="media"
                    onChange={e => this.changeAvatarHendler(e, this.props.activeUserId)}
                  />
                {/* </div> */}
                <button>Ok</button>
              </form>
              <ul className={style.navList}>
                <li className={style.navItem}>Contacts</li>
                <li className={style.navItem}>Chats</li>
                <li className={style.navItem}>Settings</li>
                <li 
                  className={style.navItem}
                  onClick={()=> this.logoutHandler()}
                >
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