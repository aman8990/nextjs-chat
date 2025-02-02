'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function SearchedUser({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/chats', { userId: user.id });

      router.push(`/chats?chatId=${res.data.id}`);
    } catch (error) {
      toast.dismiss();
      toast.error('Error in Finding Chat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => handleClick()}
        className="mx-2 mt-10 border-b-2 border-primary-900 pb-1 pt-2 cursor-pointer hover:bg-primary-900 hover:rounded-full"
      >
        <div className="flex items-center gap-5 justify-center">
          <Image
            src={user?.image || '/default.jpg'}
            width={200}
            height={200}
            alt="person-image"
            className="rounded-full w-14 h-14"
          />
          <h1 className="text-xl">{user?.name}</h1>
        </div>
        <h1 className="text-sm mt-2 text-center">{user?.email}</h1>
      </div>
      <div className="flex justify-center mt-5">
        {isLoading && <SpinnerMini />}
      </div>
    </>
  );
}

export default SearchedUser;
