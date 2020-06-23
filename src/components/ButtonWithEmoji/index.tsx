import React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EmojiData } from "emoji-mart";

import style from './style.module.css'
interface Props {
  addEmoji: ((emoji: EmojiData) => void) | undefined
}

const ButtonWithEmoji: React.FC<Props> = (props) => {  

  const [isOpenedEmoji, setIsOpenedEmoji] = React.useState(false);

  const myRef = React.useRef<HTMLDivElement>(null);

  const closeEmoji = React.useCallback(
    (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (myRef.current && !myRef.current.contains(event.target)) {
        setIsOpenedEmoji(false);
      }
    },
    [setIsOpenedEmoji]
  )

  React.useEffect(() => {
    if (isOpenedEmoji) {
      document.addEventListener("click", closeEmoji);
    } else {
      document.removeEventListener("click", closeEmoji);
    }
  }, [isOpenedEmoji, closeEmoji])

  const toggleEmoji = () => {
    setIsOpenedEmoji(!isOpenedEmoji)
  }

  return (
    <div className={style.buttonWithEmoji}>
      <button onClick={ toggleEmoji } className={style.button}>
        <FontAwesomeIcon icon="smile" />
      </button>
      { isOpenedEmoji && 
        <div ref={myRef} className={style.emojiBlock}>
          <Picker set='google' onSelect={props.addEmoji} />
        </div>
      }
    </div>
  )
}
export default React.memo(ButtonWithEmoji);
