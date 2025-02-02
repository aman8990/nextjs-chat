'use client';

const { SessionProvider } = require('next-auth/react');

function AuthContext({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthContext;
