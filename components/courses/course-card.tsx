'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Check, ExternalLink, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

  useEffect(() => {
    setDownloaded(getDownloads().includes(course.code))
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
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: theme.light, color: theme.primary }}
        >
          {course.code}
        </span>
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: theme.soft, color: theme.primary }}
        >
          {course.credits} Credits
        </span>
      </div>

      <h3 className="mt-2 font-heading text-base font-semibold text-foreground">{course.title}</h3>

      <Link
        href={`/courses/${course.code}`}
        className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors"
        style={{ backgroundColor: theme.light, color: theme.primary }}
      >
        <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="flex-1">{course.title} — Course Materials</span>
        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
      </Link>

      <div className="mt-3 flex items-center justify-end gap-2">
        <Button
          type="button"
          onClick={handleDownload}
          aria-label={downloaded ? `Already downloaded ${course.code}` : `Download ${course.code} materials`}
          variant="ghost"
          size="sm"
          className={cn(
            'size-8 rounded-full p-0',
            downloaded ? 'bg-success/15 text-success hover:bg-success/25' : 'text-muted-foreground hover:bg-secondary',
          )}
        >
          {downloaded ? <Check className="size-3.5" aria-hidden="true" /> : <Download className="size-3.5" aria-hidden="true" />}
        </Button>
      </div>
    </div>
  )
}
