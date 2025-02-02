import getChats from '../_actions/getChats';
import UserBox from './_components/UserBox';

async function ChatsLayout({ children }) {
  const chats = await getChats();

  return (
    <div className="flex w-full">
      <UserBox initialChats={chats} />
      {children}
    </div>
  );
}

export default ChatsLayout;
