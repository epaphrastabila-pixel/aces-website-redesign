'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Check, WifiOff, ExternalLink, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Course, type YearTheme } from '@/lib/courses-data'

const DOWNLOADS_KEY = 'aces_downloaded_courses'

function getDownloads(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DOWNLOADS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveDownload(code: string) {
  try {
    const existing = getDownloads()
    if (!existing.includes(code)) {
      localStorage.setItem(DOWNLOADS_KEY, JSON.stringify([...existing, code]))
    }
  } catch {
    /* noop */
  }
}

export function CourseCard({ course, theme }: { course: Course; theme: YearTheme }) {
  const [downloaded, setDownloaded] = useState(false)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    setDownloaded(getDownloads().includes(course.code))
    setOffline(!navigator.onLine)
    const handler = () => setOffline(!navigator.onLine)
    window.addEventListener('online', handler)
    window.addEventListener('offline', handler)
    return () => {
      window.removeEventListener('online', handler)
      window.removeEventListener('offline', handler)
    }
  }, [course.code])

  function handleDownload(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const content = [
      `${course.code} - ${course.title}`,
      `Year ${course.year} · ${course.semester}`,
      `Lecturer: ${course.lecturer}`,
      `Credits: ${course.credits}`,
      `Resources: ${course.resources.length} files`,
      '',
      '--- Course Materials ---',
      ...course.resources.map((r, i) => `${i + 1}. ${r.name} (${r.format.toUpperCase()}, ${r.fileSize})`),
      '',
      'Downloaded from ACES KNUST digital library.',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${course.code}-materials.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    saveDownload(course.code)
    setDownloaded(true)
  }

  return (
    <div
      className="group rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1"
      style={{ borderTop: `3px solid ${theme.primary}`, boxShadow: `0 0 0 rgba(0,0,0,0)`, transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 10px 25px -5px ${theme.shadow}`; e.currentTarget.style.borderColor = theme.border }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '' }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: theme.light, color: theme.primary }}
        >
          {course.code}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">{course.semester}</span>
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: theme.soft, color: theme.primary }}
          >
            {course.credits} Cr
          </span>
        </div>
      </div>

      <h3 className="mt-2 font-heading text-base font-semibold text-foreground line-clamp-2">{course.title}</h3>

      <p className="mt-1 text-xs text-muted-foreground">{course.lecturer}</p>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground text-pretty line-clamp-2">{course.description}</p>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="size-3.5" aria-hidden="true" />
        <span>{course.resources.length} resource{course.resources.length !== 1 ? 's' : ''}</span>
        {downloaded && (
          <span className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-semibold text-success">
            <Check className="size-2.5" aria-hidden="true" /> Downloaded
          </span>
        )}
        {offline && (
          <span className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-semibold text-warning">
            <WifiOff className="size-2.5" aria-hidden="true" /> Offline
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/courses/${course.code}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
        >
          <ExternalLink className="size-3.5" aria-hidden="true" />
          View Resources
        </Link>
        <button
          type="button"
          onClick={handleDownload}
          aria-label={downloaded ? `Already downloaded ${course.code}` : `Download ${course.code} materials`}
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 active:scale-[0.95]',
            downloaded
              ? 'bg-success/15 text-success'
              : '',
          )}
          style={!downloaded ? { backgroundColor: theme.light, color: theme.primary } : undefined}
        >
          {downloaded ? <Check className="size-4" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
