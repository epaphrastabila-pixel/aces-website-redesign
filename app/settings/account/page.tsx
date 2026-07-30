'use client'

import { useState, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { ChevronRight, Save, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/app-shell'
import { useAcesAuth } from '@/lib/aces-auth-context'

export default function AccountSettingsPage() {
  const { user, isAuthenticated, updateProfile } = useAcesAuth()

  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('')
  const [year, setYear] = useState('')
  const [saved, setSaved] = useState(false)
  const [initialised, setInitialised] = useState(false)

  useEffect(() => {
    if (user) {
      setDisplayName(user.name)
      setPhone(user.phone || '')
      setProgram(user.program || '')
      setYear(user.year || '')
      setInitialised(true)
    }
  }, [user])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateProfile({
      name: displayName.trim() || undefined,
      phone: phone.trim() || undefined,
      program: program.trim() || undefined,
      year: year || undefined,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  if (!isAuthenticated) {
    return (
      <AppShell title="Account settings">
        <section className="flex flex-col items-center px-6 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <User className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Log in to manage settings</h1>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            Sign in to update your profile information.
          </p>
          <Link
            href="/login?redirect=/settings/account"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Log in
          </Link>
        </section>
      </AppShell>
    )
  }

  if (!initialised) {
    return (
      <AppShell title="Account settings">
        <section className="px-4 pt-5">
          <div className="mb-3 h-4 w-24 animate-pulse rounded bg-secondary" />
          <div className="mt-3 h-8 w-48 animate-pulse rounded bg-secondary" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-secondary" />
        </section>
        <section className="flex flex-col gap-4 px-4 pt-6 pb-8">
          <div className="h-20 animate-pulse rounded-2xl bg-secondary" />
          <div className="h-16 animate-pulse rounded-xl bg-secondary" />
          <div className="h-16 animate-pulse rounded-xl bg-secondary" />
          <div className="h-16 animate-pulse rounded-xl bg-secondary" />
          <div className="h-14 animate-pulse rounded-2xl bg-secondary" />
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Account settings">
      <section className="px-4 pt-5">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 rotate-180" aria-hidden="true" />
          Back to profile
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground">Account settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary font-heading text-base font-bold text-primary-foreground">
            {initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{user!.name}</p>
            <p className="text-xs text-muted-foreground">{user!.email}</p>
          </div>
        </div>

        <div>
          <label htmlFor="displayName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none input-focus-cycle focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user!.email}
            readOnly
            tabIndex={-1}
            className="mt-1.5 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+233 XX XXX XXXX"
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="program" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Program of study
          </label>
          <input
            id="program"
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="e.g. Computer Engineering"
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Year of study
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none input-focus-cycle focus:border-primary"
          >
            <option value="">Select year</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>

        <Button
          type="submit"
          size="lg"
          showSuccess={saved}
          successText="Saved!"
          className="w-full rounded-2xl text-sm font-bold"
        >
          <Save className="size-4" aria-hidden="true" />
          Save changes
        </Button>
      </form>
    </AppShell>
  )
}
