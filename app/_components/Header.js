'use client';

import { RiWechatChannelsLine } from 'react-icons/ri';
import useChat from '../_hooks/useChat';
import { usePathname } from 'next/navigation';

function Header() {
  const pathName = usePathname();
  const { isOpen } = useChat();

  const isLogin = () => {
    return pathName === '/' || pathName === '/forgotPassword';
  };

  return (
    <div
      className={`flex justify-center items-center py-2 border-b-4 bg-primary-950 border-primary-900 rounded-b-full fixed top-0 w-full z-50 ${
        isOpen ? 'hidden lg:flex' : 'block'
      } ${isLogin() ? 'hidden' : ''}`}
    >
      <div>
        <RiWechatChannelsLine
          color="#206F44"
          className="text-4xl md:text-5xl"
        />
      </div>
    </div>
  );
}

export default Header;
