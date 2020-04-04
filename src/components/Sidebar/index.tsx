import React from 'react';
import "./Sidebar.css";
import User from "../User";
import avatar1 from '../../img/avatar1.jpg'
import avatar2 from '../../img/avatar2.jpg'
import avatar3 from '../../img/avatar3.jpg'

type chatsData = {
	key: string,
	name: string,
  avatarSrc: string,
  status: string
}[]

const Sidebar = () => {
  const chats: chatsData = [
		{
			key: "user1",
			name: "John Doe",
      avatarSrc: avatar1,
      status: "The apple is a monkey."
		},
		{
			key: "user2",
			name: "Janet Brown",
      avatarSrc: avatar2,
      status: "Authors often misinterpret the pineapple as a fearless giraffe, when in actuality it feels more like a decorous tiger!"
		},
		{
			key: "user3",
			name: "Jane Smith",
      avatarSrc: avatar3,
      status: "A unbiased squirrel is a grape of the mind."
    },
    {
			key: "user4",
			name: "John Doe",
      avatarSrc: avatar1,
      status: "The apple is a monkey."
		},
		{
			key: "user5",
			name: "Janet Brown",
      avatarSrc: avatar2,
      status: "Those cheetahs are nothing more than pears."
		}
	]
  return (
    <aside className="Sidebar">
      {chats.map(chat => <User key={chat.key} name={chat.name} avatarSrc={chat.avatarSrc} status={chat.status} />)}
    </aside>
  );
};

export default React.memo(Sidebar);