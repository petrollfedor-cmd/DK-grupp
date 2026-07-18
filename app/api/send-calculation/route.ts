import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_ADMIN_IDS = process.env.TELEGRAM_ADMIN_IDS || '';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fio = formData.get('fio') as string || '';
    const phone = formData.get('phone') as string || '';
    const requestText = formData.get('request') as string || '';
    const files = formData.getAll('files') as File[];

    // Build message
    const message = `
📋 <b>Новая заявка на расчёт</b>

👤 <b>ФИО:</b> ${fio}
📞 <b>Телефон:</b> ${phone}
📝 <b>Запрос:</b>
${requestText}

🌐 С сайта: dkfasad.ru
    `.trim();

    // Send message to all admins
    const adminIds = TELEGRAM_ADMIN_IDS.split(',');
    const sendPromises = adminIds.map(async (adminId) => {
      const chatId = adminId.trim();

      // Send text message first
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      // Send attached files if any
      for (const file of files.filter(f => f.size > 0)) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', new Blob([buffer]), file.name);

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
          method: 'POST',
          body: formData,
        });
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Failed to send calculation request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send request' },
      { status: 500 }
    );
  }
}
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Failed to send calculation request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send request' },
      { status: 500 }
    );
  }
}
