'use client';

import { useRouter } from 'next/navigation';

function NoChat() {
  const router = useRouter();

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col items-center justify-center h-screen mt-[-10rem] lg:mt-[-5rem]">
        <div className="text-3xl">No Chat Found</div>
        <button
          onClick={() => router.push('/chats')}
          className="px-2 py-1 bg-accent-1000 rounded-md mt-5 lg:hidden"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NoChat;
