'use client';

import { useCallback, useEffect, useState } from 'react';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { RiWechatChannelsLine } from 'react-icons/ri';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthForm() {
  const [variant, setVariant] = useState('LOGIN');
  const [socialLoggingIn, setIsSocialLoggingIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (session?.status === 'authenticated') {
      router.push('/chats');

      setIsMounted(false);
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const socialAction = (action) => {
    setIsSocialLoggingIn(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.dismiss();
          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.dismiss();
          toast.success('Logged In');
        }
      })
      .finally(() => setIsSocialLoggingIn(false));
  };

  if (!isMounted) return null;

  return (
    <div
      className="mt-10 md:mt-16 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <RiWechatChannelsLine size={70} color="#206F44" />
        <h1 className="text-2xl md:text-3xl mb-10 mt-2">
          {variant === 'LOGIN'
            ? 'Sign In to your account'
            : 'Register new account'}
        </h1>
        <div className="w-full px-6 md:px-16">
          {variant === 'LOGIN' && (
            <LoginForm router={router} socialLoggingIn={socialLoggingIn} />
          )}

          {variant === 'REGISTER' && <RegisterForm setVariant={setVariant} />}

          <div className="mt-5">
            <div className="flex items-center justify-center w-full gap-x-2">
              <div className="border-t border-gray-300 flex-grow"></div>
              <h1 className="text-sm text-gray-300">or continue with</h1>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <div className="mt-3 flex gap-2">
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction('github')}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-5 gap-2 text-md">
          <div>
            {variant === 'LOGIN'
              ? 'New to Chat? - '
              : 'Already have an account - '}
          </div>
          <button className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </button>
        </div>

        <button
          className="cursor-pointer mt-2 p-0.5"
          onClick={() => router.push('/forgotPassword')}
        >
          Forgot your Password
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
