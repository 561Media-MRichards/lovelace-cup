import { NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, companyName, message } = await req.json();

    if (!name || !email || !companyName || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeCompany = escapeHtml(companyName);
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: 'Lovelace Memorial Cup <proposals@561media.com>',
      to: 'wolfersway@gmail.com',
      replyTo: email,
      subject: `Custom Sponsorship Inquiry from ${companyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #F59E0B;">Custom Sponsorship Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${safeName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${safeCompany}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${safeEmail}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${safePhone}</td></tr>
          </table>
          <div style="background: #f8f8f8; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <h3 style="margin-top: 0; color: #333;">Their Idea:</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: `Custom Sponsorship Inquiry\n\nName: ${name}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
