'use server';

import prisma from '@/app/_libs/prismadb';
import getSession from './getSession';

async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      console.warn('No session or email found');
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        email: true,
        image: true,
        id: true,
      },
    });

    if (!currentUser) {
      console.warn(`User not found for email: ${session.user.email}`);
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error('Error fetching current user', error);
    return null;
  }
}

export default getCurrentUser;
