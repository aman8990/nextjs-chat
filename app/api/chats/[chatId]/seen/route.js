import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import { pusherServer } from '@/app/_libs/pusher';

export async function POST(request, { params }) {
  try {
    const currentUser = await getCurrentUser();
    const { chatId } = await params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
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
    });

    if (!chat) {
      return new NextResponse('Invalid Chat ID', { status: 400 });
    }

    const messageIds = chat.messages.map((message) => message.id);

    if (messageIds.length > 0) {
      const updatedMessages = await Promise.all(
        messageIds.map((messageId) =>
          prisma.message.update({
            where: { id: messageId },
            data: {
              seenIds: { push: currentUser.id },
            },
          })
        )
      );

      await pusherServer.trigger(`chat-${chatId}`, 'message-seen', {
        chatId,
        userId: currentUser.id,
        messages: updatedMessages,
      });

      await pusherServer.trigger(currentUser.email, 'message-seen', {
        chatId,
        _count: {
          messages: 0,
        },
      });
    }

    return NextResponse.json('Updated', { status: 200 });
  } catch (error) {
    console.error(error, 'Error_Messages_Seen');
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
