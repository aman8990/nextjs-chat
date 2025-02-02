import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import { pusherServer } from '@/app/_libs/pusher';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, chatId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!chatId) {
      return new NextResponse('No Chat ID Provided', { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        chat: {
          connect: {
            id: chatId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    await pusherServer.trigger(`chat-${chatId}`, 'new-message', newMessage);

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: message || null,
        lastImage: image || null,
        lastMessageAt: new Date(),
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    const data = {
      chatId,
      lastMessage: newMessage.body || null,
      lastImage: newMessage.image || null,
      lastMessageAt: newMessage.createdAt,
      senderEmail: newMessage.sender.email,
    };

    updatedChat.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'update-chat', data);
      }
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log('ERROR_IN_SENDING_MESSAGE', error);
    return NextResponse.json('Error in sending message', { status: 500 });
  }
}
