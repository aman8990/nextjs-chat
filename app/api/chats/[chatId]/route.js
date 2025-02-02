import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import { pusherServer } from '@/app/_libs/pusher';

export async function DELETE(request, { params }) {
  try {
    const { chatId } = await params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingChat = await prisma.chat.findUnique({
      where: { id: chatId },
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

    if (!existingChat) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedChat = await prisma.chat.deleteMany({
      where: {
        id: chatId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingChat.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'remove-chat', existingChat);
      }
    });

    return NextResponse.json(deletedChat);
  } catch (error) {
    console.log('ERROR_IN_DELETING_CHAT', error);
    return NextResponse.json('Error in deleting chat', { status: 500 });
  }
}
