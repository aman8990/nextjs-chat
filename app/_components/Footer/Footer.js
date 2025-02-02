'use client';

import { usePathname } from 'next/navigation';
import FooterList from './FooterItems';
import useChat from '@/app/_hooks/useChat';

function Footer() {
  const pathName = usePathname();
  const { isOpen } = useChat();

  const isLogin = () => {
    return pathName === '/' || pathName === '/forgotPassword';
  };

  return (
    <div
      className={`lg:hidden bottom-0 fixed z-40 py-2 w-full px-10 sm:px-16 border-t-4 lg:border-none border-primary-900 rounded-t-full bg-primary-950 lg:p-0 ${
        isOpen ? 'hidden' : 'block'
      } ${isLogin() ? 'hidden' : ''}`}
    >
      <FooterList />
    </div>
  );
}

export default Footer;
