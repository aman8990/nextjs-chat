'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { signOut } from 'next-auth/react';
import { CldUploadButton } from 'next-cloudinary';
import { HiPhoto } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function UpdateName({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      image: user.image,
    },
  });

  const handleUpload = (result) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
    setUploadedImage(result?.info?.secure_url);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      await axios.post('/api/updateUser', data);
      toast.dismiss();
      toast.success('User Updated');
      setUploadedImage('');
      router.refresh();
    } catch (error) {
      toast.dismiss();
      toast.error('Error in Updating User');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 mb-32 max-w-lg w-full mx-auto rounded-lg">
      <div className="w-full px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Aman Kumar"
            roundedFull
            errors={errors}
            register={register}
            disabled={isLoading}
            validationRules={{
              required: '* This field is required',
              validate: (value) =>
                value.trim() !== '' || '* Name cannot be empty spaces',
            }}
          />
          <div className="flex flex-col items-center">
            {uploadedImage && (
              <Image
                src={uploadedImage}
                width={100}
                height={100}
                alt="uploaded-image"
                className="rounded-full mb-2 h-32 w-32"
              />
            )}
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
              <div type="button" className="p-1 bg-blue-500 rounded-md">
                <span className="flex justify-center items-center gap-2">
                  <HiPhoto /> Upload Image
                </span>
              </div>
            </CldUploadButton>
          </div>

          <div className="flex justify-center">
            <Button disabled={isLoading} rounded type="submit">
              {isLoading ? <SpinnerMini /> : 'Submit'}
            </Button>
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={() => signOut()}
            className="bg-red-700 text-white text-lg p-1 rounded-md mt-10 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// export default UpdateName;
export default dynamic(() => Promise.resolve(UpdateName), { ssr: false });
