import * as React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction } from "../../store/rootReducer";
import * as actions from "../../store/auth/actions";

import style from './style.module.css'
import grid from '../../img/grid.png'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      logout: actions.logout
    },
    dispatch
  );

type ButtonWithPopupProps = ReturnType<typeof mapDispatchToProps>;

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
export default connect(null, mapDispatchToProps)(ButtonWithPopup);