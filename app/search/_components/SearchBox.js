'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchedUser from './SearchedUser';
import axios from 'axios';
import dynamic from 'next/dynamic';

function SearchBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/searchUser', data);

      setError(false);
      setUser(res.data);
    } catch (error) {
      setUser(null);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-80 fixed lg:relative lg:mt-0 md:border-r-4 border-primary-900">
      <div className="flex flex-col">
        <h1 className="ml-5 mt-5 mb-5 text-2xl font-semibold text-accent-1000">
          Search
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            roundedFull
            errors={errors}
            register={register}
            disabled={isLoading}
            validationRules={{
              required: '* This field is required',
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button type="submit" rounded>
              Submit
            </Button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-20">
          <SpinnerMini />
        </div>
      ) : (
        <>
          {user && <SearchedUser user={user} />}
          {error && (
            <h1 className="text-center mt-20 text-xl">No User Found</h1>
          )}
        </>
      )}
    </div>
  );
}

// export default SearchBox;

export default dynamic(() => Promise.resolve(SearchBox), { ssr: false });
