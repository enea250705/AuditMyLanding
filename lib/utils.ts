export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function scoreColor(score: number): string {
  if (score >= 75) return '#22c55e'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

export function scoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Needs work'
  if (score >= 30) return 'Poor'
  return 'Critical'
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function truncateUrl(url: string, max = 40): string {
  try {
    const { hostname, pathname } = new URL(url)
    const full = hostname + pathname
    return full.length > max ? full.slice(0, max) + '…' : full
  } catch {
    return url.slice(0, max)
  }
}
