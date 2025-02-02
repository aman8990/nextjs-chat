import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { pusherServer } from '@/app/_libs/pusher';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.text();
    const params = new URLSearchParams(body);

    const socket_id = params.get('socket_id');
    const channel_name = params.get('channel_name');
    const data = { user_id: session.user.email };

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!socket_id || !channel_name) {
      return new NextResponse('Data Not Found', { status: 400 });
    }

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      data
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error('PUSHER_AUTH_ERROR', error);
    return NextResponse.json('Pusher Auth Error', { status: 500 });
  }
}
