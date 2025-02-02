import getMessages from '@/app/_actions/getMessages';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { chatId } = await params;
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get('cursor');

    const messages = await getMessages(chatId, cursor);
    return NextResponse.json(messages);
  } catch (error) {
    console.log('ERROR_IN_FETCHING_MESSAGES', error);
    return NextResponse.json('Error in fetching messages', { status: 500 });
  }
}
