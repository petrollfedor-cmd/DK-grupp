import { NextRequest, NextResponse } from 'next/server';
import { bot } from '@/lib/telegram-bot';

export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    bot.processUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
