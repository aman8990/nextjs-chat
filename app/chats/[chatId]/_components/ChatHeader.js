'use client';

import useActiveList from '@/app/_hooks/useActiveList';
import useOtherUser from '@/app/_hooks/useOtherUser';
import ProfileDrawer from '@/app/chats/[chatId]/_components/ProfileDrawer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

function ChatHeader({ chat }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const router = useRouter();
  const otherUser = useOtherUser(chat);
  const { members } = useActiveList();
  const isActive = members.includes(otherUser?.email);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen]);

  return (
    <>
      <ProfileDrawer
        isOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
        otherUser={otherUser}
      />

      <div className="flex items-center justify-between fixed top-0 lg:relative w-full border-b-4 px-6 py-4 border-primary-900 bg-primary-950 z-10">
        <div className="flex items-center gap-4">
          <HiChevronLeft
            onClick={() => router.push('/chats')}
            size={32}
            className="lg:hidden text-accent-1000"
          />

          <div className="flex items-center gap-4">
            <Image
              src={otherUser?.image || '/default.jpg'}
              width={200}
              height={200}
              alt="user-image"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-xl">{otherUser.name}</h1>
              <h1 className="text-sm text-gray-500">
                {isActive ? 'Online' : 'Offline'}
              </h1>
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-accent-1000 cursor-pointer"
        />
      </div>
    </>
  );
}

export default ChatHeader;
