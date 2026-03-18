import type { registrations } from '../../db/schema';
import type { InferSelectModel } from 'drizzle-orm';

type Registration = InferSelectModel<typeof registrations>;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendConfirmationEmail(reg: Registration) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = escapeHtml(reg.name);
  const pkg = escapeHtml(reg.packageName);
  const price = `$${(reg.priceInCents / 100).toLocaleString()}`;
  const team = escapeHtml(reg.teamName || 'N/A');

  await resend.emails.send({
    from: 'Lovelace Memorial Cup <proposals@561media.com>',
    to: reg.email,
    replyTo: 'wolfersway@gmail.com',
    subject: 'Registration Confirmed - Lovelace Memorial Cup 2026',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0A0E17; color: #FEFDFB; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #F59E0B; font-size: 28px; margin: 0;">Registration Confirmed</h1>
          <p style="color: #F0EDE6; font-size: 16px;">3rd Annual Lovelace Memorial Cup</p>
        </div>
        <p>Dear ${name},</p>
        <p>Thank you for registering for the 3rd Annual Lovelace Memorial Cup! Your support helps families battling cancer in our community.</p>
        <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #F59E0B;">
          <h3 style="color: #F59E0B; margin-top: 0;">Registration Details</h3>
          <p><strong>Package:</strong> ${pkg} (${price})</p>
          <p><strong>Team Name:</strong> ${team}</p>
          <p><strong>Date:</strong> June 29, 2026</p>
          <p><strong>Time:</strong> Registration 7:00 AM | Shotgun Start 8:00 AM</p>
          <p><strong>Location:</strong> Sycamore Ridge Golf Course</p>
        </div>
        <p>We'll be in touch with additional tournament details as the event approaches. If you have any questions, reply to this email or contact us at wolfersway@gmail.com.</p>
        <p style="color: #F0EDE6; font-style: italic; margin-top: 32px;">"In a world full of hate... let's show some LOVE!"</p>
        <div style="border-top: 1px solid #334155; margin-top: 32px; padding-top: 16px; text-align: center; color: #F0EDE6; font-size: 12px;">
          Lovelace Memorial Cup &bull; Supporting families battling cancer
        </div>
      </div>
    `,
    text: `Registration Confirmed - Lovelace Memorial Cup 2026\n\nDear ${reg.name},\n\nThank you for registering!\n\nPackage: ${reg.packageName} (${price})\nTeam Name: ${reg.teamName || 'N/A'}\nDate: June 29, 2026\nTime: Registration 7:00 AM | Shotgun Start 8:00 AM\nLocation: Sycamore Ridge Golf Course\n\nWe'll be in touch with additional details.\n\nContact: wolfersway@gmail.com`,
  });
}

export async function sendNotificationEmail(reg: Registration) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = escapeHtml(reg.name);
  const email = escapeHtml(reg.email);
  const phone = escapeHtml(reg.phone);
  const pkg = escapeHtml(reg.packageName);
  const price = `$${(reg.priceInCents / 100).toLocaleString()}`;
  const team = escapeHtml(reg.teamName || 'N/A');
  const requests = escapeHtml(reg.specialRequests || 'None');

  await resend.emails.send({
    from: 'Lovelace Memorial Cup <proposals@561media.com>',
    to: 'wolfersway@gmail.com',
    subject: `New Registration: ${name} - ${pkg}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #F59E0B;">New Tournament Registration</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Package:</td><td style="padding: 8px;">${pkg} (${price})</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Team Name:</td><td style="padding: 8px;">${team}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Special Requests:</td><td style="padding: 8px;">${requests}</td></tr>
        </table>
      </div>
    `,
    text: `New Registration\n\nName: ${reg.name}\nEmail: ${reg.email}\nPhone: ${reg.phone}\nPackage: ${reg.packageName} (${price})\nTeam: ${reg.teamName || 'N/A'}\nRequests: ${reg.specialRequests || 'None'}`,
  });
}
