'use client';

import Input from '@/app/_components/Input';
import { HiPaperAirplane } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import useChat from '@/app/_hooks/useChat';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { v4 as uuidv4 } from 'uuid';
import useMessageStore from '@/app/_hooks/useMessageStore';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

function ChatForm() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();
  const { addMessage, updateMessage } = useMessageStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const onSubmit = async (data) => {
    const tempId = uuidv4();
    const tempMessage = {
      id: tempId,
      content: data.message,
      sender: { email: userEmail },
      seenIds: [],
      createdAt: new Date().toISOString(),
    };

    addMessage(tempMessage);
    setValue('message', '', { shouldValidate: true });

    try {
      const response = await axios.post('/api/messages', { ...data, chatId });
      updateMessage(tempId, response.data);
    } catch (error) {
      toast.dismiss();
      toast.error('Message Failed');
    }
  };

  return (
    <div className="flex items-center px-4 gap-2 fixed bottom-0 lg:relative py-5 bg-primary-950 border-t-4 border-primary-900 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2"
      >
        <div className="w-full">
          <Input
            label="Message"
            id="message"
            type="text"
            placeholder="Write a message"
            roundedFull
            errors={errors}
            disabled={isLoading}
            register={register}
            validationRules={{
              required: '* This field is required',
            }}
          />
        </div>

        <button type="submit" className="bg-accent-1000 p-2.5 rounded-full">
          {isLoading ? (
            <SpinnerMini size={19} />
          ) : (
            <HiPaperAirplane size={18} />
          )}
        </button>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ChatForm), { ssr: false });
