'use client';

import useChat from '@/app/_hooks/useChat';
import UsersList from './UsersList';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/_libs/pusher';
import handleUpdateChat from '@/app/_utils/handleUpdateChat';
import handleMessageSeen from '@/app/_utils/handleMessageSeen';

function UserBox({ initialChats }) {
  const session = useSession();
  const [chats, setChats] = useState(initialChats);
  const { isOpen } = useChat();

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!userEmail) return;

    const channel = pusherClient.subscribe(userEmail);

    const handleNewChat = (newChat) => {
      setChats((prevChats) => [newChat, ...prevChats]);
    };

    const handleRemoveChat = (existingChat) => {
      setChats((prevChats) =>
        prevChats.filter((prevChat) => prevChat.id !== existingChat.id)
      );
    };

    channel.bind('new-chat', handleNewChat);
    channel.bind('remove-chat', handleRemoveChat);
    channel.bind('update-chat', (data) =>
      handleUpdateChat(setChats, data, userEmail)
    );
    channel.bind('message-seen', (data) => handleMessageSeen(setChats, data));

    return () => {
      channel.unbind('new-chat', handleNewChat);
      channel.unbind('remove-chat', handleRemoveChat);
      channel.unbind('update-chat', (data) =>
        handleUpdateChat(setChats, data, userEmail)
      );
      channel.unbind('message-seen', (data) =>
        handleMessageSeen(setChats, data)
      );
      pusherClient.unsubscribe(userEmail);
    };
  }, [userEmail]);

  return (
    <div
      className={`flex flex-col w-full mt-[-1rem] lg:w-[21rem] md:border-r-4 border-primary-900 ${
        isOpen ? 'hidden lg:flex' : 'block'
      }`}
    >
      <div className="bg-primary-950 fixed top-10 lg:top-12 z-10 w-full lg:w-[20.7rem]">
        <h1 className="ml-5 mt-8 md:mt-10 mb-4 md:mb-5 text-2xl font-semibold text-accent-1000">
          Chats
        </h1>
      </div>
      <div className="overflow-y-scroll scrollbar-none md:mb-5">
        <div className="flex items-center flex-col mt-[5rem] lg:mt-[5.8rem] mb-52 lg:mb-10 space-y-3 mx-2">
          {chats.map((chat) => (
            <UsersList key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserBox;
