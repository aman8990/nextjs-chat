'use client';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

function ImageModal({ src, onClose, isOpen }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="relative mx-5 bg-white p-4 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="Image"
          width={500}
          height={500}
          className="object-contain h-[30rem] w-[30rem]"
        />
        <button className="absolute top-2 right-2 p-2" onClick={onClose}>
          <IoClose size={30} color="black" />
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
