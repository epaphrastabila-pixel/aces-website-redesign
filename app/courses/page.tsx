'use client'

import { useState, useEffect, useCallback } from 'react'
import { BookOpen, GraduationCap, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/app-shell'
import { CourseFilterBar } from '@/components/courses/course-filter-bar'
import { CourseCard } from '@/components/courses/course-card'
import { courses, getYears } from '@/lib/courses-data'
import { useNotifications } from '@/lib/notification-context'

export default function CoursesPage() {
  const [year, setYear] = useState(1)
  const [semester, setSemester] = useState('Sem 1')
  const [search, setSearch] = useState('')
  const [notified, setNotified] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('aces_notify_slides') === 'true'
  })
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotifications()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const q = search.toLowerCase().trim()
  const visible = courses.filter((c) => {
    if (c.year !== year) return false
    if (c.semester !== semester) return false
    if (q && !c.code.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q)) return false
    return true
  })

  const onNotify = useCallback(() => {
    try {
      localStorage.setItem('aces_notify_slides', 'true')
    } catch { /* noop */ }
    setNotified(true)
    addNotification({
      title: 'Slides notification enabled',
      body: "We'll let you know when new lecture slides are uploaded.",
      icon: '📚',
    })
  }, [addNotification])

  const uniqueYears = getYears()

  return (
    <AppShell title="Courses">
      {/* Gradient banner */}
      <section className="mx-4 mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-800 p-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xs">
            <h1 className="font-heading text-xl font-bold">Computer Engineering</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">
              Access lecture slides, past questions, and study materials for every course.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-2.5">
              <span className="font-heading text-lg font-bold">{courses.filter((c) => c.semester === semester).length}</span>
              <span className="text-[10px] text-white/80">Courses</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-2.5">
              <span className="font-heading text-lg font-bold">{uniqueYears.length}</span>
              <span className="text-[10px] text-white/80">Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <CourseFilterBar
        year={year}
        semester={semester}
        search={search}
        onYearChange={setYear}
        onSemesterChange={setSemester}
        onSearchChange={setSearch}
      />

      {/* Course grid */}
      <section className="px-4 pt-2 pb-8">
        {loading ? (
          <div className="mt-4 flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : visible.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${year}-${semester}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {visible.map((course) => (
                <CourseCard key={course.code} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <Layers className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">No lecture materials uploaded yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check back later or enable notifications.
            </p>
            {!notified && (
              <button
                onClick={onNotify}
                className="mt-4 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              >
                Notify Me
              </button>
            )}
          </motion.div>
        )}
      </section>
    </AppShell>
  )
}
