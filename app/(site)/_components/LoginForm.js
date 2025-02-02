'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../_components/Input';
import Button from '@/app/_components/Button';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import SpinnerMini from '@/app/_components/SpinnerMini';

function LoginForm({ router, socialLoggingIn }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    setIsLoggingIn(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.dismiss();
          toast.error(callback?.error || 'Error in logging in');
        }

        if (callback?.ok && !callback?.error) {
          toast.dismiss();
          toast.success('Logged In');
          router.push('/');
        }
      })
      .finally(() => setIsLoggingIn(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email address"
        id="email"
        type="email"
        errors={errors}
        register={register}
        disabled={isLoggingIn}
        validationRules={{
          required: '* This field is required',
        }}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        errors={errors}
        register={register}
        disabled={isLoggingIn}
        validationRules={{
          required: '* This field is required',
        }}
      />

      <div>
        <Button disabled={isLoggingIn} type="submit">
          {isLoggingIn || socialLoggingIn ? <SpinnerMini /> : 'Sign In'}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
