import React from "react";
import Iframe from 'react-iframe'
import MicrolinkCard from '@microlink/react';
import Linkify from 'linkifyjs/react';
import getUrls from 'get-urls';

import { MessageData, ReplyData } from "../../store/message/types";
import AttachmentLink from "../AttachmentLink"
import style from"./style.module.css";

interface Props {
	message: MessageData | ReplyData | null
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

const FormattedMessage = (props: Props) => {
    let videoArray =  props.message && props.message.text && props.message.text.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌ [\w\?‌ =]*)?/)
    if (videoArray) {
      let videoId = videoArray && videoArray[1]
      return (
        <>
          <a href={props.message && props.message.text}>{props.message && props.message.text}</a>
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
    } else if (props.message && props.message.media) {
      return (
        <div className={style.mediaAttachment}>
          <p>{props.message.text}</p>
          {props.message.media.map(attachment => {
            if (attachment.type === "image/png" || attachment.type === "image/jpeg") {
              return (
                <img
                  key={attachment._id}
                  className={style.attachment}
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
                    className={style.attachment}
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
                    className={style.attachment}
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
              <p>{ props.message && props.message.text }</p>
              { props.message && props.message.text && 
                <Linkify>{ parseURLs(props.message.text) }</Linkify> 
              }
            </>
        )
    }
}
export default React.memo(FormattedMessage);