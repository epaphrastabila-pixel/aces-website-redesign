'use client'

import { useState, type FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { useAcesAuth } from '@/lib/aces-auth-context'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/events'
  const { register } = useAcesAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('')
  const [year, setYear] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
      program: program.trim() || undefined,
      year: year || undefined,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push(redirect)
    }, 1200)
  }

  if (success) {
    return (
      <AppShell title="Account created">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-success/15">
            <ArrowRight className="size-7 text-success animate-check-bounce" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Welcome to ACES!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Your account is ready. Taking you there…
          </p>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Create account">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Join ACES</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Create an ACES account to register for events and join clubs.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-6 pb-8">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kwame Asante"
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kwame@st.knust.edu.gh"
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone number <span className="font-normal lowercase text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+233 XX XXX XXXX"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="program" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Program of study <span className="font-normal lowercase text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="program"
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="e.g. Computer Engineering"
            autoComplete="off"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-year" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Year of study <span className="font-normal lowercase text-muted-foreground/60">(optional)</span>
          </label>
          <select
            id="reg-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none input-focus-cycle focus:border-primary focus:outline-none"
          >
            <option value="">Select year</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
            />
            <Button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              variant="ghost"
              size="icon-xs"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground input-focus-cycle focus:border-primary focus:outline-none"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          iconType="arrow"
          size="lg"
          className="w-full rounded-2xl text-sm font-bold"
        >
          Create account
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="font-semibold text-primary underline">
            Log in
          </Link>
        </p>
      </form>
    </AppShell>
  )
}

export default function RegisterAcesPage() {
  return (
    <Suspense fallback={<AppShell title="Create account"><div className="px-4 pt-5" /></AppShell>}>
      <RegisterForm />
    </Suspense>
  )
}
