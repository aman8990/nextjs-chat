'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/app/_libs/pusher';
import useChat from '@/app/_hooks/useChat';
import axios from 'axios';
import useOtherUser from '@/app/_hooks/useOtherUser';
import SpinnerMini from '@/app/_components/SpinnerMini';

function ChatBody({ initialMessages = [], chat }) {
  const otherUser = useOtherUser(chat);
  const [messages, setMessages] = useState(initialMessages);
  const { chatId } = useChat();
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMessages.length === 15);

  useEffect(() => {
    axios.post(`/api/chats/${chatId}/seen`);
  }, [chatId]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${chatId}`);
    bottomRef?.current?.scrollIntoView();

    const handleNewMessage = async (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      await axios.post(`/api/chats/${chatId}/seen`);

      bottomRef?.current?.scrollIntoView();
    };

    const handleSeenUpdate = (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          data.messages.some((msg) => msg.id === message.id)
            ? {
                ...message,
                seenIds: data.messages.find((msg) => msg.id === message.id)
                  .seenIds,
              }
            : message
        )
      );

      bottomRef?.current?.scrollIntoView();
    };

    channel.bind('new-message', handleNewMessage);
    channel.bind('message-seen', handleSeenUpdate);

    return () => {
      channel.unbind('new-message', handleNewMessage);
      channel.unbind('message-seen', handleSeenUpdate);
      pusherClient.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId]);

  const loadOlderMessages = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const oldestMessage = messages[0];
    const cursor = oldestMessage?.id;

    try {
      const res = await axios.get(
        `/api/chats/${chatId}/messages?cursor=${cursor}`
      );
      const olderMessages = res.data;

      if (olderMessages.length < 15) {
        setHasMore(false);
      }

      setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
    } catch (error) {
      console.error('Error fetching older messages', error);
    } finally {
      setLoading(false);
    }
  }, [messages, chatId, hasMore, loading]);

  useEffect(() => {
    const topElement = topRef.current;
    if (!topElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadOlderMessages();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(topElement);
    return () => observer.disconnect();
  }, [loadOlderMessages]);

  return (
    <div className="flex-1 overflow-y-scroll scrollbar-none pt-10 lg:pt-5 pb-52 lg:pb-10">
      {loading && (
        <div className="flex justify-center">
          <SpinnerMini />
        </div>
      )}
      <div ref={topRef} />
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          otherUserId={otherUser?.id}
        />
      ))}
      <div className="pt-20" ref={bottomRef} />
    </div>
  );
}

export default ChatBody;
