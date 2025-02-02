'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/app/_libs/pusher';
import useChat from '@/app/_hooks/useChat';
import axios from 'axios';
import useOtherUser from '@/app/_hooks/useOtherUser';
import SpinnerMini from '@/app/_components/SpinnerMini';
import useMessageStore from '@/app/_hooks/useMessageStore';

function ChatBody({ initialMessages = [], chat }) {
  const otherUser = useOtherUser(chat);
  const {
    messages = [],
    setMessages,
    addMessage,
    updateSeenMessages,
    addOldMessages,
  } = useMessageStore();

  const { chatId } = useChat();
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMessages.length === 15);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleScroll = async () => {
    const container = chatContainerRef.current;
    if (!container || loading || !hasMore) return;

    const isAtTop = container.scrollTop === 0;
    if (isAtTop) {
      const previousHeight = container.scrollHeight;
      await loadOlderMessages();

      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight - previousHeight;
      });
    }
  };

  useEffect(() => {
    setMessages(initialMessages);
    axios.post(`/api/chats/${chatId}/seen`);

    setTimeout(scrollToBottom, 100);
  }, [chatId, initialMessages, setMessages]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${chatId}`);
    bottomRef?.current?.scrollIntoView();

    const handleNewMessage = (newMessage) => {
      if (newMessage?.senderId === otherUser?.id) {
        addMessage(newMessage);
      } else {
        return;
      }
      axios.post(`/api/chats/${chatId}/seen`);

      scrollToBottom();
    };

    const handleSeenUpdate = (data) => {
      updateSeenMessages(data);
      scrollToBottom();
    };

    channel.bind('new-message', handleNewMessage);
    channel.bind('message-seen', handleSeenUpdate);

    return () => {
      channel.unbind('new-message', handleNewMessage);
      channel.unbind('message-seen', handleSeenUpdate);
      pusherClient.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId, otherUser?.id, addMessage, setMessages, updateSeenMessages]);

  const loadOlderMessages = useCallback(async () => {
    if (!hasMore || loading || messages.length === 0) return;

    setLoading(true);
    const oldestMessage = messages[0];
    console.log(oldestMessage);
    const cursor = oldestMessage?.id;

    try {
      const res = await axios.get(
        `/api/chats/${chatId}/messages?cursor=${cursor}`
      );
      const olderMessages = res.data;

      if (olderMessages.length < 15) {
        setHasMore(false);
      }

      addOldMessages(olderMessages);
    } catch (error) {
      console.error('Error fetching older messages', error);
    } finally {
      setLoading(false);
    }
  }, [messages, chatId, hasMore, loading, addOldMessages]);

  return (
    <div
      className="flex-1 overflow-y-scroll scrollbar-none pt-10 lg:pt-5 pb-52 lg:pb-10"
      ref={chatContainerRef}
      onScroll={handleScroll}
    >
      {loading && (
        <div className="flex justify-center">
          <SpinnerMini />
        </div>
      )}
      {messages?.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          otherUserId={otherUser?.id}
        />
      ))}
      <div className="lg:pt-20" ref={bottomRef} />
    </div>
  );
}

export default ChatBody;
