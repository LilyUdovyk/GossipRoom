import React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './style.module.css'

interface Props {
  addEmoji: any
}

interface State {
  isOpenedEmoji: boolean,
  emojiObj: string
}

class ButtonWithEmoji extends React.PureComponent<Props, State> {
  constructor(props: never) {
    super(props);
    this.state = {
      isOpenedEmoji: false,
      emojiObj: ""
    }
  }

  myRef = React.createRef<HTMLDivElement>()

  closeEmoji = (event: any) => {
    console.log(this.myRef)
    if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
      console.log("TCL: Button -> closeSmiles -> event", event)
      this.setState({
        isOpenedEmoji: false
      })
    }
  };

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.isOpenedEmoji === this.state.isOpenedEmoji) {
      return;
    }
    if (this.state.isOpenedEmoji) {
      console.log("addEventListener", prevState);
      document.addEventListener("click", this.closeEmoji);
    } else {
      console.log("removeEventListener");
      document.removeEventListener("click", this.closeEmoji);
    }
  }

  toggleEmoji = () => {
    this.setState({
      isOpenedEmoji: !this.state.isOpenedEmoji
    })
  }

  render() {
    const { isOpenedEmoji } = this.state;
    return (
      <div className={style.buttonWithEmoji}>
        <button onClick={ this.toggleEmoji }>
          <FontAwesomeIcon icon="smile" />
        </button>
        { isOpenedEmoji && 
          <div ref={this.myRef} className={style.emojiBlock}>
            <Picker set='google' onSelect={emoji => {
              this.props.addEmoji(emoji)
              console.log(emoji)}} />
          </div>
        }
      </div>
    )
  }
}
export default ButtonWithEmoji;
