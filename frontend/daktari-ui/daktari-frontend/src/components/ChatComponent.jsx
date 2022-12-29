import React from 'react'
import {useContext} from 'react'
import fight from '../pages/pages-assets/fight.jpg'
import cancerSupport from '../pages/pages-assets/cancersupport.jpg'
import doctor from '../pages/pages-assets/doctor.jpg'
import pic1 from '../pages/pages-assets/doctor3.jpg'
import picprof from '../pages/pages-assets/picprof.jpg'

import {SocketContext} from '../context/SocketContext.jsx'

export default function ChatComponent(props){
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = React.useContext(SocketContext)
  console.log("stream", stream)
  return (
    <div className="chat-service">

      <div className="chat-box">
        <div className="chat-header">
          <span className="chat-header-text"> Daktari Video Chat </span>
          <span className="chat-header-icon"><ion-icon name="chatbubbles-outline"></ion-icon></span>
        </div>
        {/*
        <div className="join-chat">
          <div className="join-header">
            <ion-icon name="logo-wechat"></ion-icon>
          </div>
          <div className="join-prompt">
            <span>Create or Join Room</span>
          </div>
          <div className="join-input">
            <input type="text" />
          </div>
          <div className="join-button">
            <span>JOIN CHAT</span>
          </div>
        </div>
        <div className="chat-video-feed">
          {stream && (
          <div className="video-feed-me" playsInline muted autoPlay ref={myVideo}>
            <div className="video-feed-username">
              <span>{name || 'Name'}</span>
            </div>
          </div>
            )}
          { callAccepted && !callEnded && (
          <div className="video-feed-other" playsInline ref={userVideo} autoPlay>
            <div className="video-feed-username">
              <span>{call.name || 'Name'}</span>
            </div>
          </div>
          )
          }
        </div>
        */}
        <div className="chat-video-feed">
          {stream && (
          <div className="video-feed-me" playsInline muted autoPlay ref={myVideo}>
            <div className="video-feed-username">
              <span>{name || 'test_patient'}</span>
            </div>
            <div className="video-profile">
              <div className="video-profile-pic"><img src={picprof} /></div>
              <div className="profile-icon">
                <ion-icon name="videocam-off-outline"></ion-icon>
                <ion-icon name="volume-high-outline"></ion-icon>
              </div>
            </div>
          </div>
          )}
          <div className="video-feed-other" playsInline ref={userVideo} autoPlay>
            <div className="video-feed-username">
              <span>{call.name || 'Dr. Patel'}</span>
            </div>
            <div className="video-profile">
              <div className="video-profile-pic"><img src={pic1} /></div>
              <div className="profile-icon">
                <ion-icon name="videocam-off-outline"></ion-icon>
                <ion-icon name="volume-high-outline"></ion-icon>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
