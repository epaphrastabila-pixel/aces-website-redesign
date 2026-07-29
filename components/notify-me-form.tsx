'use client'

import { useState } from 'react'
import { Bell, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotifyMeForm({ topic }: { topic: string }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-success/10 px-4 py-3.5" role="status">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <Check className="size-4" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium leading-snug text-pretty">
          You&apos;re on the list! We&apos;ll email you the moment new {topic} drop.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <label htmlFor={`notify-${topic}`} className="sr-only">
        Email address for {topic} alerts
      </label>
      <input
        id={`notify-${topic}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.name@st.knust.edu.gh"
        className="w-full rounded-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:ring-2 focus:ring-primary/25"
      />
      <Button
        type="submit"
        className="rounded-full px-5 py-3 text-sm font-semibold"
      >
        <Bell className="size-4" aria-hidden="true" />
        Notify me when {topic} arrive
      </Button>
    </form>
  )
}
