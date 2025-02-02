import getChatById from '@/app/_actions/getChatById';
import ChatBody from './_components/ChatBody';
import ChatForm from './_components/ChatForm';
import ChatHeader from './_components/ChatHeader';
import getMessages from '@/app/_actions/getMessages';
import EmptyState from '@/app/_components/EmptyState';
import NoChat from '@/app/_components/NoChat';

async function Page({ params }) {
  const { chatId } = await params;
  const chat = await getChatById(chatId);
  const messages = await getMessages(chatId);

  if (!chat) {
    return <NoChat />;
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col h-full">
        <ChatHeader chat={chat} />
        <ChatBody initialMessages={messages} chat={chat} />
        <ChatForm />
      </div>
    </div>
  );
}

export default Page;
