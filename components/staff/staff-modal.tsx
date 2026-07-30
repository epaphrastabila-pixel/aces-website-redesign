'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Mail, GraduationCap, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type StaffMember = {
  id: string
  name: string
  title: string
  role: string
  department: string
  expertise: string
  initials: string
  office?: string
}

type StaffMemberWithDetail = StaffMember & {
  email: string
  courses: string[]
}

export function StaffModal({
  member,
  open,
  onClose,
}: {
  member: StaffMemberWithDetail | null
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!member) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} profile`}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div
        className={cn(
          'relative w-full max-w-md rounded-t-3xl bg-background px-6 pb-8 pt-6 shadow-2xl transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          onClick={onClose}
          aria-label="Close"
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 size-9 rounded-full border-none text-muted-foreground hover:bg-accent"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>

        <div className="flex justify-center">
          <div className="relative size-28 overflow-hidden rounded-2xl border-4 border-border shadow-lg">
            <Image
              src="/placeholder.svg"
              alt={member.name}
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
            <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-muted-foreground/50">
              {member.initials}
            </span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h2 className="font-heading text-xl font-bold text-foreground">{member.name}</h2>
          <p className="mt-0.5 text-sm font-semibold text-primary">{member.role}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <GraduationCap className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="text-sm font-medium text-foreground">{member.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <BookOpen className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Expertise</p>
              <p className="text-sm font-medium text-foreground">{member.expertise}</p>
            </div>
          </div>

          {member.courses.length > 0 && (
            <div className="rounded-xl bg-secondary px-4 py-3">
              <p className="text-xs text-muted-foreground">Courses taught</p>
              <ul className="mt-1.5 flex flex-col gap-1">
                {member.courses.map((c) => (
                  <li key={c} className="text-sm font-medium text-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {member.office && (
            <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
              <GraduationCap className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Office</p>
                <p className="text-sm font-medium text-foreground">{member.office}</p>
              </div>
            </div>
          )}

          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 transition-colors hover:bg-accent"
          >
            <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground">{member.email}</p>
            </div>
          </a>
        </div>

        <div className="mt-5">
          <Link
            href="/staff"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Back to Staff
          </Link>
        </div>
      </div>
    </div>
  )
}
