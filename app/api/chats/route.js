import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import { pusherServer } from '@/app/_libs/pusher';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!userId) {
      return new NextResponse('No Data Provided', { status: 400 });
    }

    const existingChat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleChat = existingChat[0];
    if (singleChat) {
      return NextResponse.json(singleChat);
    }

    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    newChat.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'new-chat', newChat);
      }
    });

    return NextResponse.json(newChat);
  } catch (error) {
    console.log('ERROR_IN_Chats', error);
    return NextResponse.json('Error in Chats', { status: 500 });
  }
}
