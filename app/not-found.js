'use client';

import Link from 'next/link';

function NotFound() {
  return (
    <main className="flex flex-col items-center text-center space-y-6 mt-20 w-full">
      <h1 className="text-3xl font-semibold w-full">
        This page could not be found :(
      </h1>
      <Link href="/" className="bg-accent-1000 text-white px-6 py-3 text-lg">
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
