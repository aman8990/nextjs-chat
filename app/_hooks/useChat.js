import { useParams } from 'next/navigation';
import { useMemo } from 'react';

function useChat() {
  const params = useParams();

  const chatId = useMemo(() => {
    if (!params.chatId) {
      return '';
    }

    return params.chatId;
  }, [params?.chatId]);

  const isOpen = useMemo(() => {
    const result = !!chatId;
    return result;
  }, [chatId]);

  return useMemo(() => {
    return { isOpen, chatId };
  }, [isOpen, chatId]);
}

export default useChat;
