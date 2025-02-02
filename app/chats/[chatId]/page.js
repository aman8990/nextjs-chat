import getChatById from '@/app/_actions/getChatById';
import ChatBody from './_components/ChatBody';
import ChatForm from './_components/ChatForm';
import ChatHeader from './_components/ChatHeader';
import getMessages from '@/app/_actions/getMessages';
import EmptyState from '@/app/_components/EmptyState';

async function Page({ params }) {
  const { chatId } = await params;
  const chat = await getChatById(chatId);
  const messages = await getMessages(chatId);

  if (!chat) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
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
