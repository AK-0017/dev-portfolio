import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Rate limiting
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60 * 1000; // 1 request per minute per IP

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Rate limit check
    if (rateLimitMap.has(ip) && now - rateLimitMap.get(ip)! < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    const { name, email, phone, countryCode, message, botField } = await req.json();

    // Honeypot spam check
    if (botField) {
      console.warn('🛑 Spam detected via honeypot');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Phone validation: 7 to 10 digits
    if (!/^[0-9]{7,10}$/.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 });
    }

    const fullPhone = `${countryCode} ${phone}`;

    // Store to Supabase
    const { error: dbError } = await supabase.from('contacts').insert([
      { name, email, phone: fullPhone, message },
    ]);

    if (dbError) {
      console.error('❌ Supabase insert error:', dbError.message);
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
    }

    // Send email using Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Atharva Kulkarni <hi@atharvakulkarni.in>',
      to: ['atharvakulkarni211@gmail.com'],
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${fullPhone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    if (emailError) {
      console.error('❌ Resend email error:', emailError);
      return NextResponse.json({ success: false, error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
