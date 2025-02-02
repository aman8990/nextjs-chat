'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';

function RegisterForm({ setVariant }) {
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      otp: '',
    },
  });

  const handleSendOtp = () => {
    const { email } = getValues();
    if (!email) {
      toast.dismiss();
      toast.error('Please provide an email');
      return;
    }

    setIsSendingOtp(true);

    axios
      .post('/api/send-otp', { email })
      .then(() => {
        toast.dismiss();
        toast.success('OTP sent successfully');
        setShowMore(true);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in sending otp');
      })
      .finally(() => {
        setIsSendingOtp(false);
      });
  };

  const onSubmit = (data) => {
    setIsRegistering(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.dismiss();
        toast.success('Email verification successfull. You can login now');
        setVariant('LOGIN');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in submitting details');
      })
      .finally(() => setIsRegistering(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email address"
        id="email"
        type="email"
        errors={errors}
        register={register}
        disabled={isSendingOtp || isRegistering}
        validationRules={{
          required: '* This field is required',
        }}
      />

      {!showMore && (
        <Button
          type="button"
          disabled={isSendingOtp || isRegistering}
          onClick={() => handleSendOtp()}
        >
          {isSendingOtp ? <SpinnerMini /> : 'Send OTP'}
        </Button>
      )}

      {showMore && (
        <>
          <Input
            label="Name"
            id="name"
            type="text"
            errors={errors}
            register={register}
            disabled={isSendingOtp || isRegistering}
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
            disabled={isSendingOtp || isRegistering}
            validationRules={{
              required: '* This field is required',
            }}
          />

          <Input
            label="OTP"
            id="otp"
            type="number"
            errors={errors}
            register={register}
            disabled={isSendingOtp || isRegistering}
            validationRules={{
              required: '* This field is required',
            }}
          />

          <div>
            <Button disabled={isSendingOtp || isRegistering} type="submit">
              {isRegistering ? <SpinnerMini /> : 'Register'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default RegisterForm;
