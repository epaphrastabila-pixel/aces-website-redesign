'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getYears, getSemesters } from '@/lib/courses-data'

type Props = {
  year: number
  semester: string
  search: string
  onYearChange: (y: number) => void
  onSemesterChange: (s: string) => void
  onSearchChange: (q: string) => void
}

const years = getYears()
const semesters = getSemesters()

export function CourseFilterBar({ year, semester, search, onYearChange, onSemesterChange, onSearchChange }: Props) {
  return (
    <section className="sticky top-[61px] z-30 bg-background/95 px-4 pt-4 backdrop-blur">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search by course code or title…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-2xl border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Year + Semester pills */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar pb-3" role="tablist">
        {years.map((y) => (
          <button
            key={y}
            type="button"
            role="tab"
            aria-selected={year === y}
            onClick={() => onYearChange(y)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200',
              year === y
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-background text-foreground hover:border-primary/30 hover:bg-secondary',
            )}
          >
            Year {y}
          </button>
        ))}

        <span className="mx-1 shrink-0 text-muted-foreground/30">|</span>

        {semesters.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={semester === s}
            onClick={() => onSemesterChange(s)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200',
              semester === s
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-background text-foreground hover:border-primary/30 hover:bg-secondary',
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </section>
  )
}
