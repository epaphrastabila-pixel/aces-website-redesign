'use client'

import { useState } from 'react'
import { Download, Check, Eye, FileText, FileType, Video, Archive } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Resource } from '@/lib/courses-data'

const formatIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  pptx: FileType,
  docx: FileText,
  mp4: Video,
  zip: Archive,
}

const formatColor: Record<string, string> = {
  pdf: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  pptx: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  docx: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  mp4: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  zip: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
}

type Props = {
  resource: Resource
}

export function CourseResourceItem({ resource }: Props) {
  const [downloaded, setDownloaded] = useState(false)
  const Icon = formatIcon[resource.format] || FileText

  function handleDownload() {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/20 hover:bg-secondary/30">
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', formatColor[resource.format])}>
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{resource.name}</p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded bg-muted px-1.5 py-0.5 font-medium uppercase">{resource.format}</span>
          <span>{resource.fileSize}</span>
          <span className="hidden sm:inline">{resource.uploadDate}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleDownload}
          aria-label={`Download ${resource.name}`}
          className={cn(
            'flex size-9 items-center justify-center rounded-full transition-all duration-200 active:scale-[0.95]',
            downloaded
              ? 'bg-success/15 text-success'
              : 'bg-primary text-primary-foreground hover:opacity-90',
          )}
        >
          {downloaded ? <Check className="size-4" /> : <Download className="size-4" />}
        </button>
        <button
          type="button"
          onClick={() => {}}
          aria-label={`Preview ${resource.name}`}
          className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-accent active:scale-[0.95]"
        >
          <Eye className="size-4" />
        </button>
      </div>
    </div>
  )
}
