import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // In production you'd surface a clearer error; route will fail without keys
  console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('contact_messages').insert([
      { name, email, phone: phone || null, subject, message }
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

      // Send notification email to staff (optional) using SendGrid if configured
      try {
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        const CONTACT_NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL; // recipient
        if (SENDGRID_API_KEY && CONTACT_NOTIFICATION_EMAIL) {
          await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${SENDGRID_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email: CONTACT_NOTIFICATION_EMAIL }],
                  subject: `New contact message: ${subject}`,
                },
              ],
              from: { email: CONTACT_NOTIFICATION_EMAIL },
              content: [
                {
                  type: 'text/plain',
                  value: `New contact message received\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nSubject: ${subject}\nMessage:\n${message}`,
                },
              ],
            }),
          });
        }
      } catch (sendErr) {
        console.warn('Failed to send notification email', sendErr);
      }

      return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
