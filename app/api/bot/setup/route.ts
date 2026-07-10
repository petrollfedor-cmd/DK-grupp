import { NextResponse } from 'next/server';
import { bot } from '@/lib/telegram-bot';

export async function GET() {
  const webhookUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/bot/webhook`
    : process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'WEBHOOK_URL or VERCEL_URL not set' },
      { status: 500 }
    );
  }

  const url = webhookUrl.replace(/\/$/, '') + '/api/bot/webhook';

  try {
    await bot.setWebhook(url);
    return NextResponse.json({
      ok: true,
      webhookUrl: url,
      message: 'Webhook set successfully. Now send /start to your bot in Telegram.'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to set webhook', details: error.message },
      { status: 500 }
    );
  }
}
