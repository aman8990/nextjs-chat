import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name && !image) {
      return new NextResponse('No Data Provided', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: currentUser?.email },
      data: {
        name,
        image,
      },
    });

    if (!updatedUser) {
      return new NextResponse('No User Found', { status: 400 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('ERROR_IN_UPDATING_USER', error);
    return NextResponse.json('Error in updating user', { status: 500 });
  }
}
