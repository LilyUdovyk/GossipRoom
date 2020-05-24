import React, {useRef} from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
import Iframe from 'react-iframe'
import MicrolinkCard from '@microlink/react';
import Linkify from 'linkifyjs/react';
import getUrls from 'get-urls';
// import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

import { IRootState, IRootAction } from "../../store/rootReducer";
import * as messageAction from "../../store/message/actions";
// import * as contactsAction from "../../store/contacts/actions";
import { MessageData } from "../../store/chat/types";
import AttachmentLink from "../AttachmentLink"

import "./Chat.css";

const mapStateToProps = (state: IRootState) => ({
  activeUserId: state.user.userData._id,
  nick: state.user.userData.nick,
  activeChat: state.chat.chatData,
  activeChatName: state.chat.activeChatName,
  messages: state.chat.chatData ? state.chat.chatData.messages : [],
  media: state.message.messageData.media,
  mediaUrl: state.media.fileData.url
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      saveOriginalMessage: messageAction.saveOriginalMessage,
    },
    dispatch
  );

type ChatProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Chat: React.FC<ChatProps> = props => {

  const chatsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
		scrollToBottom();
  }, [])
  
  React.useEffect(() => {
		scrollToBottom();
	}, [props.messages])

  const scrollToBottom = () => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }

  const isUserMsg = (message: MessageData) => {
    // console.log(props.messages.message.owner._id, props.activeUserId, props.activeUserId === props.messages.message.owner._id)
    return message.owner._id === props.activeUserId ? true : false
  }

  const replyToMessage = (message: MessageData) => {
    console.log("saveOriginalMessage")
    props.saveOriginalMessage(message)
  }

  const parseURLs = (text: string) => {
    const urls = getUrls(text);

    const parsedUrls = Array.from(urls).map((url, idx: number) => {
      return (
        <MicrolinkCard url={url} key={idx}/>
      )
    })

    return (
      <>
        {parsedUrls}
      </>
    )
  }

  const getFormattedMessage = (message: MessageData) => {
    let videoArray =  message.text && message.text.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌ [\w\?‌ =]*)?/)
    if (videoArray) {
      let videoId = videoArray && videoArray[1]
      return (
        <>
          <a href={message.text}>{message.text}</a>
          <Iframe
            url={`https://www.youtube.com/embed/${videoId}`}
            width="100%"
            frameBorder={0}
            allow={"accelerometer"}
            allowFullScreen
            encrypted-media
            picture-in-picture
          />
        </>
      )
    } else if (message.media) {
      return (
        <div className="mediaAttachment">
          <p>{message.text}</p>
          {message.media.map(attachment => {
            if (attachment.type === "image/png" || attachment.type === "image/jpeg") {
              return (
                <img
                  key={attachment._id}
                  className="attachment"
                  src={`http://chat.fs.a-level.com.ua/${attachment.url}`}
                  alt="Attachment"
                />
              )
            } else if (attachment.type === "video/mp4" || attachment.type === "video/webm" || attachment.type === "video/ogg") {
              return (
                <>
                  <AttachmentLink
                    url={attachment.url}
                    icon={"file-video"}
                    text={attachment.originalFileName}
                  />
                  <video
                    key={attachment._id}
                    className="attachment"
                    controls>
                    <source src={`http://chat.fs.a-level.com.ua/${attachment.url}`} type="video/mp4" />
                    <source src={`http://chat.fs.a-level.com.ua/${attachment.url}`} type="video/webm" />
                    <source src={`http://chat.fs.a-level.com.ua/${attachment.url}`} type="video/ogg" />
                    <p>Your browser doesn't support HTML5 video. Download this file for review.</p>
                  </video>
                </>
              )
            } else if (attachment.type === "audio/mp3" || attachment.type === "audio/ogg") {
              return (
                <>
                  <AttachmentLink
                    url={attachment.url}
                    icon={"file-audio"}
                    text={attachment.originalFileName}
                  />
                  <audio
                    controls
                    key={attachment._id}
                    className="attachment"
                  >
                    <source src={`http://chat.fs.a-level.com.ua/${attachment.url}`} type="audio/mp3" />
                    <source src={`http://chat.fs.a-level.com.ua/${attachment.url}`} type="audio/ogg" />
                    <p>Your browser doesn't support HTML5 audio. Download this file for review.</p>
                  </audio>
                </>
              )
            } else if (attachment.type === "application/zip") {
              return (
                <AttachmentLink
                  url={attachment.url}
                  icon={"file-archive"}
                  text={attachment.originalFileName}
                />
              )
            } else if (attachment.type && (attachment.type.includes("application") || attachment.type.includes("text"))) {
              return (
                <AttachmentLink
                  url={attachment.url}
                  icon={"file-alt"}
                  text={attachment.originalFileName}
                />
              )
            } else {
              return (
                <AttachmentLink
                  url={attachment.url}
                  icon={"file"}
                  text={attachment.originalFileName}
                />
              )
            }
          })}
        </div>
      )
    } else {
      return (
        <>
          <p>{message.text}</p>
          {message.text && <Linkify>{parseURLs(message.text)}</Linkify>}
        </>
      )
    }
  }

  return (
    <div className="Chats" ref={chatsRef}>
      { props.messages && props.messages.map((message: MessageData) => (
        <div 
          key={message._id}
          className={`"Message_input_box" Chat ${isUserMsg(message) ? "is-user-msg" : ""}`}
          onClick = { () => replyToMessage(message) }
          // onMouseDown = {handleMouseDown}
          // onMouseUp = {handleMouseUp}
          // data-active = {activeUser}
          data-name={isUserMsg(message) ? "You " : props.activeChatName}
          data-user={isUserMsg(message)}
          data-text={message.text}
          data-number={message._id}
        >
          { message.replyTo &&
            <div className="replyBlock">
              <p className="owner">
                { message.replyTo.owner.nick || message.replyTo.owner.login }
              </p>
              <p>
                { message.replyTo.text }
              </p>
            </div>
          }
          { message.forwarded &&
            <div className="forwardedBlock">
              <p className="owner">
                Forwarded from { message.forwarded.owner.nick || message.forwarded.owner.login }
              </p>
              <p>
                { getFormattedMessage(message.forwarded) }
              </p>
            </div>
          } 
          {getFormattedMessage(message)}
          <time className="timeBlock">{moment(+message.createdAt).format('HH:mm')}</time>
        </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);