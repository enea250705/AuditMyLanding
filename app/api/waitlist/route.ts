import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json() as { email: string }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = await createServiceClient()
    const { error } = await supabase.from('waitlist').insert({ email })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: "You're already on the waitlist!" }, { status: 409 })
      }
      throw error
    }

    // Send welcome email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'AuditMyLanding <hello@auditmylanding.com>',
        to: email,
        subject: "You're on the waitlist 🎉",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0a0b0f;color:#e2e8f0">
            <h1 style="color:#7c6fff;font-size:24px;margin-bottom:8px">You're in! 🚀</h1>
            <p style="color:#94a3b8;line-height:1.6">
              Thanks for joining the AuditMyLanding waitlist. We'll notify you the moment we launch —
              and early members get 2 months free on any paid plan.
            </p>
            <p style="color:#94a3b8;margin-top:24px">— The AuditMyLanding team</p>
          </div>
        `,
      }).catch(console.error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
