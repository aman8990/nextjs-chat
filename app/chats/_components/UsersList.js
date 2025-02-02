'use client';

import useActiveList from '@/app/_hooks/useActiveList';
import useOtherUser from '@/app/_hooks/useOtherUser';
import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { HiPhoto } from 'react-icons/hi2';
import { GoDotFill } from 'react-icons/go';

function UsersList({ chat }) {
  const otherUser = useOtherUser(chat);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const push = searchParams.get('chatId');
  const { members } = useActiveList();
  const isActive = members.includes(otherUser?.email);
  const isActiveChat = `/chats/${chat.id}` === pathName;

  useEffect(() => {
    if (push) router.push(`/chats/${push}`);
  }, [router, push]);

  const image =
    chat?.lastImage === null ? (
      ''
    ) : (
      <div className="flex items-center justify-center gap-1">
        <span>
          <HiPhoto size={18} />
        </span>
        <span>Photo</span>
      </div>
    );

  const message =
    (chat?.lastMessage === null || undefined) && chat?.lastImage === null
      ? 'Started a chat'
      : chat?.lastMessage?.length > 30
      ? chat?.lastMessage.slice(0, 30) + '...'
      : chat?.lastMessage;

  return (
    <button
      onClick={() => router.push(`/chats/${chat.id}`)}
      className={`flex items-center px-4 sm:px-10 lg:px-4 gap-3 cursor-pointer hover:bg-primary-900 hover:rounded-full py-2 w-full relative ${
        isActiveChat ? 'bg-primary-900 rounded-full' : ''
      }`}
    >
      {isActive && (
        <span
          className="absolute ml-[2.4rem] mt-[2rem] ring-1
        ring-white rounded-full bg-red-500"
        >
          <GoDotFill size={15} color="white" />
        </span>
      )}
      <Image
        src={otherUser?.image || '/default.jpg'}
        width={200}
        height={200}
        alt="user-image"
        className="rounded-full w-14 h-14"
      />

      <div className="flex flex-col items-start w-full">
        <div className="flex items-center w-full gap-1">
          <h1 className="text-xl font-medium truncate max-w-[16ch] sm:max-w-[20ch] lg:max-w-[12ch]">
            {otherUser?.name}
          </h1>
          <h1 className="text-xs ml-auto text-accent-1000">
            {chat?.lastMessageAt && format(new Date(chat?.lastMessageAt), 'p')}
          </h1>
        </div>

        <div className="flex items-center w-full">
          <h1 className="text-sm text-gray-500">{message || image}</h1>
          {chat?._count?.messages !== 0 && (
            <h1 className="text-sm bg-accent-1000 px-3 py-1 rounded-full text-white ml-auto">
              {chat?._count?.messages}
            </h1>
          )}
        </div>
      </div>
    </button>
  );
}

export default UsersList;
