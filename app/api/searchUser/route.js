import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { email } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!email) {
      return new NextResponse('No Email Provided', { status: 400 });
    }

    if (email === currentUser?.email) {
      return new NextResponse('This email belongs to current Account', {
        status: 400,
      });
    }

    const searchedUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!searchedUser) {
      return new NextResponse('No User Found', { status: 400 });
    }

    return NextResponse.json(searchedUser);
  } catch (error) {
    console.log('ERROR_IN_SEARCHING_USER', error);
    return NextResponse.json('Error in searching user', { status: 500 });
  }
}
