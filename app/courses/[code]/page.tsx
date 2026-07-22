'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, GraduationCap, User, Clock } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { CourseResourceItem } from '@/components/courses/course-resource-item'
import { courses, yearLabels, semesterLabels, type Resource } from '@/lib/courses-data'

const sectionOrder: { key: Resource['type']; label: string }[] = [
  { key: 'slide', label: 'Lecture Slides' },
  { key: 'note', label: 'Lecture Notes' },
  { key: 'past-question', label: 'Past Questions' },
  { key: 'assignment', label: 'Assignments' },
  { key: 'lab-manual', label: 'Lab Manuals' },
  { key: 'video', label: 'Videos' },
]

export default function CourseDetailPage() {
  const params = useParams()
  const code = (params.code as string).toUpperCase()

  const course = courses.find((c) => c.code.toUpperCase() === code)

  if (!course) {
    return (
      <AppShell title="Course not found">
        <div className="flex flex-col items-center px-6 pt-16 text-center">
          <BookOpen className="size-12 text-muted-foreground/40" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-xl font-bold text-foreground">Course not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">No course with code &ldquo;{code}&rdquo; exists.</p>
          <Link
            href="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Back to courses
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title={course.code}>
      {/* Header */}
      <div className="px-4 pt-4">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All courses
        </Link>
      </div>

      {/* Course info */}
      <section className="px-4 pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-blue-800 p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {course.code}
              </span>
              <h1 className="mt-2 font-heading text-xl font-bold text-balance">{course.title}</h1>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white">
              <GraduationCap className="size-3.5" aria-hidden="true" />
              {yearLabels[course.year]} · {semesterLabels[course.semester]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white">
              <Clock className="size-3.5" aria-hidden="true" />
              {course.credits} Credits
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white">
              <User className="size-3.5" aria-hidden="true" />
              {course.lecturer}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/85 text-pretty">{course.description}</p>

          <p className="mt-3 text-xs text-white/70">{course.resources.length} resource{course.resources.length !== 1 ? 's' : ''} available</p>
        </div>
      </section>

      {/* Resources */}
      <section className="px-4 pt-6 pb-8">
        {sectionOrder.map((section) => {
          const items = course.resources.filter((r) => r.type === section.key)
          if (items.length === 0) return null

          return (
            <div key={section.key} className="mt-6 first:mt-0">
              <h2 className="font-heading text-base font-bold text-foreground">{section.label}</h2>
              <div className="mt-3 flex flex-col gap-2">
                {items.map((resource) => (
                  <CourseResourceItem key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          )
        })}

        {course.resources.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <BookOpen className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">No lecture materials uploaded yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">Check back later or enable notifications.</p>
          </div>
        )}
      </section>
    </AppShell>
  )
}
