import * as React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'emoji-mart/css/emoji-mart.css'

import style from './style.module.css'

interface Props {
  updateMessage: any
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

  addEmoji = (e: any) => {
    let emoji = e.native;
    this.setState({
      emojiObj: this.state.emojiObj + emoji
    });
  };

  render() {
    const { isOpenedEmoji } = this.state;
    return (
      <div className={style.buttonWithEmoji}>
        <button onClick={ this.toggleEmoji }>
          <FontAwesomeIcon icon="smile" />
        </button>
        {isOpenedEmoji && 
          <div ref={this.myRef} className={style.emojiBlock}>
            <Picker set='google' onSelect={emoji => {
              this.props.updateMessage(emoji)
              // this.addEmoji(emoji)
              console.log(emoji)}} />
            {/* <Picker theme='dark' /> */}
          </div>
        }
      </div>
    )
  }
}
export default ButtonWithEmoji;
