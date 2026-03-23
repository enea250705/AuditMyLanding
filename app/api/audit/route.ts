import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { scrapeUrl } from '@/lib/scraper'
import { auditLandingPage } from '@/lib/groq'

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Check audit limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, audits_used, audits_limit')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const isUnlimited = profile.audits_limit === -1
    if (!isUnlimited && profile.audits_used >= profile.audits_limit) {
      return NextResponse.json(
        { error: 'Audit limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // 3. Parse + validate URL
    const body = await req.json()
    let { url } = body as { url: string }
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // 4. Insert audit row with status 'processing'
    const service = await createServiceClient()
    const { data: audit, error: insertError } = await service
      .from('audits')
      .insert({ user_id: user.id, url, status: 'processing' })
      .select('id')
      .single()

    if (insertError || !audit) {
      return NextResponse.json({ error: 'Failed to create audit' }, { status: 500 })
    }

    // 5. Scrape + analyse (async but awaited here so we can update before returning)
    try {
      const html = await scrapeUrl(url)
      const result = await auditLandingPage(html, url)

      // 6. Update audit with results
      await service
        .from('audits')
        .update({
          status: 'complete',
          overall_score: result.overall_score,
          headline_score: result.categories.headline.score,
          cta_score: result.categories.cta.score,
          trust_score: result.categories.trust_signals.score,
          clarity_score: result.categories.copy_clarity.score,
          social_proof_score: result.categories.social_proof.score,
          headline_insight: result.categories.headline.insight,
          cta_insight: result.categories.cta.insight,
          trust_insight: result.categories.trust_signals.insight,
          clarity_insight: result.categories.copy_clarity.insight,
          social_proof_insight: result.categories.social_proof.insight,
          suggestions: result.suggestions,
          raw_html: html.slice(0, 50000),
        })
        .eq('id', audit.id)

      // 7. Increment audits_used
      await service
        .from('profiles')
        .update({ audits_used: profile.audits_used + 1 })
        .eq('id', user.id)
    } catch (auditError) {
      await service
        .from('audits')
        .update({
          status: 'failed',
          error_message:
            auditError instanceof Error ? auditError.message : 'Unknown error',
        })
        .eq('id', audit.id)
    }

    // 8. Return audit id
    return NextResponse.json({ id: audit.id })
  } catch (err) {
    console.error('Audit route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
