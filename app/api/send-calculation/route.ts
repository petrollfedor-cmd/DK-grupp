import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENTS = [
  'info@dkfasad.ru',
  's.dudin@dkfasad.ru',
  'e.kel@dkfasad.ru',
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fio = formData.get('fio') as string || '';
    const phone = formData.get('phone') as string || '';
    const requestText = formData.get('request') as string || '';
    const files = formData.getAll('files') as File[];

    // SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.ru',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'info@dkfasad.ru',
        pass: process.env.SMTP_PASS || '',
      },
    });

    // Prepare attachments
    const attachments = await Promise.all(
      files.filter(f => f.size > 0).map(async (file, idx) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        };
      })
    );

    const mailOptions = {
      from: process.env.SMTP_USER || 'info@dkfasad.ru',
      to: RECIPIENTS.join(', '),
      subject: `Заявка на расчёт — ${fio}`,
      html: `
        <h2>Новая заявка на расчёт стоимости объекта</h2>
        <p><strong>ФИО:</strong> ${fio}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Запрос:</strong></p>
        <p>${requestText.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #999; font-size: 12px;">Заявка отправлена с сайта dkfasad.ru</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Failed to send calculation email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
