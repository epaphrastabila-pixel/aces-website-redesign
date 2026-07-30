'use client'

import { FadeIn } from '@/components/fade-in'
import { AppShell } from '@/components/app-shell'
import { Shield } from 'lucide-react'

export default function PolicyPage() {
  return (
    <AppShell title="Policy">
      <FadeIn>
        <section className="px-4 pt-5">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" aria-hidden="true" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
            How ACES KNUST handles your data and respects your privacy.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={50}>
        <section className="flex flex-col gap-4 px-4 pt-6 pb-8">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">Information We Collect</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              We may collect information you provide directly, such as your name and email when registering, as well as anonymous usage data.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">How We Use Your Data</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              Your information is used solely to improve your experience, provide services, and communicate association updates.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">Contact</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              For privacy-related concerns, reach out to the ACES executive board.
            </p>
          </div>
        </section>
      </FadeIn>
    </AppShell>
  )
}
