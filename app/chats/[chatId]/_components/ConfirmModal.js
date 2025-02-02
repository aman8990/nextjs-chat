'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import useChat from '@/app/_hooks/useChat';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

function ConfirmModal({ onClose, isOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/chats/${chatId}`);

      router.push('/chats');
      router.refresh();
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="relative mx-5 bg-gray-500 p-4 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span>
            <FiAlertTriangle
              size={40}
              className="bg-red-600 p-2 rounded-full"
            />
          </span>
          <h1 className="text-black font-semibold">Delete Conversation</h1>
        </div>

        <h1 className="mt-4 px-5">
          Are you sure you want to delete this conversation? This action cannot
          be undone.
        </h1>

        <div className="flex gap-5 mt-5 justify-end mr-8">
          <button
            onClick={onClose}
            className="h-10 w-20 bg-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="flex items-center justify-center h-10 w-20 bg-red-600 rounded-md"
          >
            {isLoading ? <SpinnerMini /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
