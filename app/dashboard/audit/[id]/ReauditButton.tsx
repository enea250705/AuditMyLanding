'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { AuditScanner } from '@/components/dashboard/AuditScanner'

export function ReauditButton({ url, label = 'Re-audit' }: { url: string; label?: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleReaudit() {
    setLoading(true)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/dashboard/audit/${data.id}`)
    } catch {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <AuditScanner />}
      <Button onClick={handleReaudit} loading={loading} variant="secondary" size="sm">
        {label}
      </Button>
    </>
  )
}
