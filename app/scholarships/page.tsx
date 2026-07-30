'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CalendarClock, ExternalLink, GraduationCap, Check, FileText, MapPin } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FadeIn } from '@/components/fade-in'
import { Button } from '@/components/ui/button'
import { ScholarshipCardSkeleton } from '@/components/skeleton'
import { DemoStateToggle } from '@/components/demo-state-toggle'
import { NotifyMeForm } from '@/components/notify-me-form'
import { cn } from '@/lib/utils'

type Scholarship = {
  id: string
  name: string
  provider: string
  amount: string
  deadline: string
  daysLeft: number
  eligibility: string
  studyLevel?: string
  location?: string
  status?: 'Open' | 'Closed'
  openDate?: string
  eligibilityDetails?: string[]
  requiredDocuments?: string[]
  applyUrl?: string
  warning?: string
}

const previewCards: Scholarship[] = [
  {
    id: 'ghana-gas-2026',
    name: 'Ghana Gas 2026/2027 Local Scholarship Programme',
    provider: 'Ghana National Gas Company',
    amount: 'Full scholarship',
    deadline: '15 August 2026',
    daysLeft: 16,
    eligibility: 'Undergraduate & Diploma/HND',
    studyLevel: 'Undergraduate and Diploma/HND',
    location: 'Ghana',
    status: 'Open',
    openDate: '15 July 2026',
    eligibilityDetails: [
      'Ghanaian citizen',
      'Admitted to an accredited tertiary institution in Ghana',
      'Diploma/HND or undergraduate student',
      '35 years old or younger',
      'Must not be benefiting from another scholarship',
    ],
    requiredDocuments: [
      'Admission letter',
      'Ghana Card',
      'Academic certificates',
      'Recent passport photograph',
      'Transcript or examination results for continuing students',
    ],
    applyUrl: 'https://www.ghanagas.com.gh/scholarships',
    warning: 'Applications are free. Do not pay anyone or share your login details.',
  },
  {
    id: 'preview-1',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 30,
    eligibility: 'Eligibility criteria',
  },
  {
    id: 'preview-2',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 14,
    eligibility: 'Eligibility criteria',
  },
  {
    id: 'preview-3',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 7,
    eligibility: 'Eligibility criteria',
  },
]

function DeadlineBadge({ daysLeft }: { daysLeft: number }) {
  const urgent = daysLeft <= 10
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold',
        urgent ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-primary',
      )}
    >
      <CalendarClock className="size-3" aria-hidden="true" />
      {urgent ? `Closing soon · ${daysLeft} days` : `${daysLeft} days left`}
    </span>
  )
}

function ScholarshipCard({ scholarship, applied }: { scholarship: Scholarship; applied: boolean }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-border-glow hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <div className="flex items-center gap-2">
          {scholarship.status && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-[10px] font-bold text-success">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              {scholarship.status}
            </span>
          )}
          <DeadlineBadge daysLeft={scholarship.daysLeft} />
        </div>
      </div>
      <h2 className="mt-3 font-heading text-base font-bold text-navy-text">{scholarship.name}</h2>
      <p className="text-xs text-muted-foreground">{scholarship.provider}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
          {scholarship.amount}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
          {scholarship.eligibility}
        </span>
        {scholarship.studyLevel && (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
            {scholarship.studyLevel}
          </span>
        )}
        {scholarship.location && (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
            <MapPin className="size-3" aria-hidden="true" />
            {scholarship.location}
          </span>
        )}
      </div>

      {scholarship.eligibilityDetails && scholarship.eligibilityDetails.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-foreground">Eligibility</p>
          <ul className="mt-1 flex flex-col gap-1">
            {scholarship.eligibilityDetails.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                <Check className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {scholarship.requiredDocuments && scholarship.requiredDocuments.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-foreground">Required documents</p>
          <ul className="mt-1 flex flex-col gap-1">
            {scholarship.requiredDocuments.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                <FileText className="mt-0.5 size-3 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Deadline: {scholarship.deadline}</p>
        {scholarship.applyUrl ? (
          <a
            href={scholarship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Apply on Official Portal
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold',
              applied ? 'bg-success/10 text-success' : 'bg-primary text-primary-foreground',
            )}
          >
            {applied ? 'Application started' : 'Apply now'}
            {!applied && <ExternalLink className="size-3.5" aria-hidden="true" />}
          </span>
        )}
      </div>

      {scholarship.warning && (
        <p className="mt-3 text-[10px] leading-relaxed text-amber-600 dark:text-amber-400">
          {scholarship.warning}
        </p>
      )}
    </li>
  )
}

export default function ScholarshipsPage() {
  const [showPreview, setShowPreview] = useState(false)
  const [applied, setApplied] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AppShell title="Scholarships">
      <FadeIn>
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Scholarships &amp; funding</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          We list verified scholarships here as they become available. Check back often or sign up to get notified.
        </p>
      </section>
      </FadeIn>

      <FadeIn delay={50}>
      <div className="px-4 pt-4">
        <DemoStateToggle
          state={showPreview ? 'populated' : 'empty'}
          onChange={(s) => setShowPreview(s === 'populated')}
        />
      </div>
      </FadeIn>

      {loading ? (
        <div className="flex flex-col gap-3 px-4 pt-6 pb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ScholarshipCardSkeleton key={i} />
          ))}
        </div>
      ) : showPreview ? (
        <>
          <FadeIn delay={100}>
          <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
            Layout preview · sorted by deadline
          </p>
          <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
            {previewCards.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} applied={applied.includes(s.id)} />
            ))}
          </ul>
          </FadeIn>
        </>
      ) : (
        <FadeIn delay={100}>
        <section
          className="flex flex-col items-center px-6 pt-6 pb-10 text-center"
          aria-label="No scholarships available"
        >
          <Image
            src="/images/empty-telescope.png"
            alt="Illustration of a character searching the sky with a telescope"
            width={200}
            height={200}
            className="rounded-3xl"
          />
          <h2 className="mt-4 font-heading text-lg font-bold text-navy-text">No scholarships listed yet</h2>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            We&apos;re scanning for new opportunities every week. Drop your email and we&apos;ll tell you first — no
            spam, promise.
          </p>
          <div className="mt-5 w-full max-w-xs">
            <NotifyMeForm topic="scholarships" />
          </div>
        </section>
        </FadeIn>
      )}
    </AppShell>
  )
}
