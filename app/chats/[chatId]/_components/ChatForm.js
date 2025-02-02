'use client';

import Input from '@/app/_components/Input';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import useChat from '@/app/_hooks/useChat';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { CldUploadButton } from 'next-cloudinary';
import toast from 'react-hot-toast';

function ChatForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();

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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      await axios.post('/api/messages', { ...data, chatId });
      setValue('message', '', { shouldValidate: true });
    } catch (error) {
      toast.dismiss();
      toast.error('Error in Sending Message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (result) => {
    try {
      setIsLoading(true);

      await axios.post('/api/messages', {
        image: result?.info?.secure_url,
        chatId,
      });
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center px-4 gap-2 fixed bottom-0 lg:relative py-5 bg-primary-950 border-t-4 border-primary-900 w-full">
      <CldUploadButton
        options={{
          maxFiles: 1,
          styles: {
            palette: {
              window: '#0A0D14',
              sourceBg: '#0A0D14',
              text: '#fff',
              link: '#fff',
              action: '#fff',
              inProgress: '#aaa',
              complete: '#222',
              error: '#ff0000',
            },
          },
        }}
        onSuccess={handleUpload}
        uploadPreset="aaart7sl"
      >
        <HiPhoto size={40} className="text-accent-1000" />
      </CldUploadButton>

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

// export default ChatForm;
export default dynamic(() => Promise.resolve(ChatForm), { ssr: false });
