'use client'

import { FadeIn } from '@/components/fade-in'
import { AppShell } from '@/components/app-shell'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <AppShell title="Terms and Conditions">
      <FadeIn>
        <section className="px-4 pt-5">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" aria-hidden="true" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Terms and Conditions</h1>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
            These terms and conditions govern your use of the ACES KNUST website.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={50}>
        <section className="flex flex-col gap-4 px-4 pt-6 pb-8">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">Acceptance of Terms</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              By accessing and using this website, you accept and agree to be bound by these terms. If you do not agree, please do not use the site.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">Use of Content</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              All content on this site is for informational and educational purposes. Unauthorised reproduction or distribution is prohibited.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-sm font-bold text-foreground">Disclaimer</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              The Association of Computer Engineering Students (ACES) provides this site as-is and makes no representations or warranties of any kind.
            </p>
          </div>
        </section>
      </FadeIn>
    </AppShell>
  )
}
