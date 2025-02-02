import Image from 'next/image';
import { IoClose, IoTrash } from 'react-icons/io5';
import { format } from 'date-fns';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function ProfileDrawer({ isOpen, setDrawerOpen, drawerRef, otherUser }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      ref={drawerRef}
      className={`w-[15rem] sm:w-[25rem] lg:mt-0.5 h-screen fixed top-0 lg:top-auto z-20 bg-primary-950 transition-all duration-500 ease-in-out overflow-y-scroll scrollbar-none border-2 border-primary-900 rounded-xl ${
        isOpen ? 'right-0' : 'right-[-100rem]'
      }`}
    >
      <div className="flex justify-end mt-8 mr-8">
        <button onClick={() => setDrawerOpen(false)}>
          <IoClose size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 mt-10">
          <Image
            src={otherUser?.image || '/default.jpg'}
            width={200}
            height={200}
            alt="user-image"
            className="rounded-full w-20 h-20"
          />
          <div className="text-center">
            <h1 className="text-xl">{otherUser?.name}</h1>
            <h1 className="text-sm text-gray-500">Offline</h1>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center mt-10"
        >
          <IoTrash size={40} className="bg-red-600 p-2 rounded-full" />
          <h1 className="text-center mt-2">Delete</h1>
        </button>

        <div className="w-full mt-5 text-center px-2 sm:px-10 space-y-1">
          <h1 className="border-t-2 border-primary-800 pt-5 text-lg font-semibold">
            Email
          </h1>
          <h1 className="">{otherUser?.email}</h1>
        </div>

        <div className="w-full mt-4 text-center space-y-1">
          <h1 className="text-lg font-semibold">Joined</h1>
          <h1>{format(new Date(otherUser?.createdAt), 'MMMM d, yyyy')}</h1>
        </div>
      </div>

      {showModal && (
        <ConfirmModal onClose={handleCloseModal} isOpen={showModal} />
      )}
    </div>
  );
}

export default ProfileDrawer;
