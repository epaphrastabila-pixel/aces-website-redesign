'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Eye, GraduationCap, MapPin } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FadeIn } from '@/components/fade-in'
import { Button } from '@/components/ui/button'
import { StaffModal, type StaffMember } from '@/components/staff/staff-modal'
import { courses } from '@/lib/courses-data'

const staff: StaffMember[] = [
  { id: 'frimpong', name: 'Prof. E. A. Frimpong', title: 'Prof.', role: 'Head of Department', department: 'Computer Engineering', expertise: 'Computer Engineering', initials: 'EF', office: '' },
  { id: 'gyasi', name: 'Dr. K. O. Gyasi', title: 'Dr.', role: 'Faculty Advisor', department: 'Computer Engineering', expertise: 'Embedded Systems', initials: 'KG', office: '' },
  { id: 'agbemenu', name: 'Dr. A. S. Agbemenu', title: 'Dr.', role: 'Senior Lecturer', department: 'Computer Engineering', expertise: 'Digital Systems', initials: 'AA', office: '' },
  { id: 'okyere', name: 'Dr. P. Y. Okyere', title: 'Dr.', role: 'Senior Lecturer', department: 'Computer Engineering', expertise: 'Networks & Security', initials: 'PO', office: '' },
  { id: 'arthur', name: 'Dr. J. K. Arthur', title: 'Dr.', role: 'Lecturer', department: 'Computer Engineering', expertise: 'Software Engineering', initials: 'JA', office: '' },
  { id: 'nkansah', name: 'Dr. B. K. Nkansah', title: 'Dr.', role: 'Lecturer', department: 'Computer Engineering', expertise: 'Machine Learning', initials: 'BN', office: '' },
]

function staffEmail(name: string): string {
  return name
    .replace(/^(Prof|Dr|Mr|Mrs|Ms)\.?\s*/i, '')
    .toLowerCase()
    .replace(/\.\s*/g, '')
    .replace(/\s+/g, '.') + '@knust.edu.gh'
}

function staffCourses(name: string): string[] {
  return courses
    .filter((c) => c.lecturer === name)
    .map((c) => `${c.code} — ${c.title}`)
}

export default function StaffPage() {
  const [selected, setSelected] = useState<StaffMember | null>(null)

  return (
    <AppShell title="Staff">
      <FadeIn>
        <section className="px-4 pt-5">
          <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Department staff</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            The lecturers and advisors supporting Computer Engineering at KNUST.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={50}>
        <section className="px-4 pt-5 pb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {staff.map((member, i) => {
              const email = staffEmail(member.name)
              const taught = staffCourses(member.name)
              return (
                <div
                  key={member.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-border-glow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
                      <Image
                        src="/placeholder.svg"
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        priority={i < 4}
                      />
                      <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-muted-foreground/50">
                        {member.initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-base font-bold text-foreground">{member.name}</h2>
                      <p className="text-sm font-semibold text-primary">{member.role}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{member.department}</p>
                      <p className="text-xs text-muted-foreground/80">{member.expertise}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="size-3.5" aria-hidden="true" />
                      Email
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(member)}
                      className="rounded-full px-4 py-2 text-xs font-semibold"
                    >
                      <Eye className="size-3.5 mr-1" aria-hidden="true" />
                      View Profile
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </FadeIn>

      <StaffModal
        member={selected && {
          ...selected,
          email: staffEmail(selected.name),
          courses: staffCourses(selected.name),
        }}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </AppShell>
  )
}
