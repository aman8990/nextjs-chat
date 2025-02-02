'use server';

import getCurrentUser from './getCurrentUser';
import prisma from '@/app/_libs/prismadb';

async function getChatById(chatId) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
          },
        },
      },
    });

    return chat;
  } catch (error) {
    return null;
  }
}

export default getChatById;
