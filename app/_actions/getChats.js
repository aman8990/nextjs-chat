'use server';

import getCurrentUser from './getCurrentUser';
import prisma from '@/app/_libs/prismadb';

async function getChats() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        _count: {
          select: {
            messages: {
              where: {
                AND: [
                  {
                    senderId: { not: currentUser.id },
                  },
                  {
                    NOT: { seenIds: { has: currentUser.id } },
                  },
                ],
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    });

    return chats;
  } catch (error) {
    return [];
  }
}

export default getChats;
