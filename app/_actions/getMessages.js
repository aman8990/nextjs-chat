'use server';

import prisma from '@/app/_libs/prismadb';

async function getMessages(chatId, cursor = null) {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId },
      take: 15,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages.reverse();
  } catch (error) {
    return [];
  }
}

export default getMessages;
