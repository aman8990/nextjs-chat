'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChatTextFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

function FooterList() {
  const pathName = usePathname();

  const isActive = (href) => {
    if (href === '/chats') {
      return pathName.startsWith('/chats');
    }
    return pathName === href;
  };

  return (
    <nav className="">
      <ul className="flex justify-between">
        <li className="p-2">
          <Link href="/chats">
            <BsChatTextFill
              size={25}
              className={isActive('/chats') ? 'text-accent-1000' : ''}
            />
          </Link>
        </li>

        <li className="p-2">
          <Link href="/search">
            <FaSearch
              size={25}
              className={isActive('/search') ? 'text-accent-1000' : ''}
            />
          </Link>
        </li>

        <li className="p-2">
          <Link href="/account">
            <IoPerson
              size={25}
              className={isActive('/account') ? 'text-accent-1000' : ''}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterList;
