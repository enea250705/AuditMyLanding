import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { verifyWebhookSignature, getPlanFromVariantId, PLAN_LIMITS } from '@/lib/lemonsqueezy'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature') ?? ''

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as {
    meta: { event_name: string }
    data: {
      attributes: {
        user_email: string
        variant_id: string
        customer_id: string
        status: string
        first_subscription_item?: { subscription_id: string }
      }
    }
  }

  const { event_name } = event.meta
  const { user_email, variant_id, customer_id, status } = event.data.attributes

  if (event_name === 'subscription_created' || event_name === 'subscription_updated') {
    const plan = getPlanFromVariantId(String(variant_id))
    const auditsLimit = PLAN_LIMITS[plan] ?? 3

    const supabase = await createServiceClient()

    // Find profile by email
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', user_email)
      .single()

    if (profile) {
      const updates: Record<string, unknown> = {
        plan: status === 'active' ? plan : 'free',
        audits_limit: status === 'active' ? auditsLimit : 3,
        lemonsqueezy_customer_id: String(customer_id),
      }

      // Reset usage on new subscription
      if (event_name === 'subscription_created') {
        updates.audits_used = 0
      }

      await supabase.from('profiles').update(updates).eq('id', profile.id)
    }
  }

  return NextResponse.json({ received: true })
}
