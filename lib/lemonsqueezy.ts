import crypto from 'crypto'

export const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  starter: 15,
  pro: -1,      // unlimited
  agency: -1,   // unlimited
}

export const PLAN_NAMES: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  agency: 'Agency',
}

export const CHECKOUT_URLS: Record<string, string> = {
  starter: process.env.NEXT_PUBLIC_LS_STARTER_URL ?? '#',
  pro: process.env.NEXT_PUBLIC_LS_PRO_URL ?? '#',
  agency: process.env.NEXT_PUBLIC_LS_AGENCY_URL ?? '#',
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) return false

  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export function getPlanFromVariantId(variantId: string): string {
  const map: Record<string, string> = {
    [process.env.LS_STARTER_VARIANT_ID ?? '']: 'starter',
    [process.env.LS_PRO_VARIANT_ID ?? '']: 'pro',
    [process.env.LS_AGENCY_VARIANT_ID ?? '']: 'agency',
  }
  return map[variantId] ?? 'free'
}
