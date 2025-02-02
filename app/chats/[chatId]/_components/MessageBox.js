'use client';

import Image from 'next/image';
import ImageModal from './ImageModal';
import { useState } from 'react';
import { format } from 'date-fns';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

function MessageBox({ data, otherUserId }) {
  const session = useSession();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const isOwn = session?.data?.user?.email === data.sender.email;
  const isSeen = data.seenIds.includes(otherUserId);

  const message = `min-w-20 rounded-xl ${
    isOwn
      ? 'bg-accent-1000 text-white ml-[3rem] sm:ml-[10rem] md:ml-[20rem] lg:ml-[10rem] xl:ml-[20rem]'
      : 'bg-gray-600 mr-[3rem] sm:mr-[10rem] md:mr-[20rem] lg:mr-[10rem] xl:mr-[20rem]'
  }`;

  const handleImageClick = (src) => {
    setModalImage(src);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div
      className={`flex gap-3 px-4 ${isOwn ? 'justify-end py-0.5' : 'py-0.5'}`}
    >
      <div className={`flex flex-col gap-5 ${isOwn ? 'items-end' : ''}`}>
        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              alt="Image"
              width={200}
              height={200}
              className="rounded-xl cursor-pointer"
              onClick={() => handleImageClick(data.image)}
            />
          ) : (
            <div className="flex flex-col relative w-full text-sm pt-2 px-2 overflow-hidden">
              <div className="mr-4">{data.body}</div>
              <div className="flex justify-end items-center gap-1 text-[0.5rem]">
                <span>{format(new Date(data.createdAt), 'p')}</span>
                {isOwn && (
                  <span>
                    {isSeen ? (
                      <IoCheckmarkDoneSharp size={15} color="#0A0D14" />
                    ) : (
                      <IoCheckmarkDoneSharp size={15} />
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && modalImage && (
        <ImageModal
          src={modalImage}
          onClose={handleCloseModal}
          isOpen={showModal}
        />
      )}
    </div>
  );
}

export default MessageBox;
