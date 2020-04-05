import React from 'react';
import './Main.css';
import Empty from "../Empty";
import ChatWindow from "../ChatWindow";
import avatar2 from '../../img/avatar2.jpg'

type activeUserData = {
	name: string,
	avatarSrc: string,
	status: string
}

const Main = () => { 
  const activeUser: activeUserData = {
    name: "Lily",
    avatarSrc: avatar2,
    status: "The apple is a monkey."
  }

  return (
    <main className="Main">
      {/* <Empty name={activeUser.name} avatarSrc={activeUser.avatarSrc} /> */}
      <ChatWindow name={activeUser.name} />;
    </main>
  )
    
	// const renderMainContent = () => {
  //   if (!activeUserId) {
  //     return <Empty user={user} activeUserId={activeUserId} />;
  //   } else {
  //     return <ChatWindow activeUserId={activeUserId} />;
  //   }
 	//  };
	// return <main className = "Main">{renderMainContent()}</main>
};

export default React.memo(Main);