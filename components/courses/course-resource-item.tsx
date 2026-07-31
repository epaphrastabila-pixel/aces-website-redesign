'use client'

import { useState } from 'react'
import { Download, Check, Eye, FileText, FileType, Video, Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Resource, type YearTheme } from '@/lib/courses-data'

const formatIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  pptx: FileType,
  docx: FileText,
  mp4: Video,
  zip: Archive,
}

type Props = {
  resource: Resource
  theme: YearTheme
}

export function CourseResourceItem({ resource, theme }: Props) {
  const [downloaded, setDownloaded] = useState(false)
  const Icon = formatIcon[resource.format] || FileText
  const href = resource.url ? encodeURI(resource.url) : undefined

  function handleDownload() {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  function handlePreview(e: React.MouseEvent) {
    if (!href || resource.format !== 'pptx') return
    e.preventDefault()
    const absolute = new URL(resource.url!, window.location.origin).href
    window.open(
      'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(absolute),
      '_blank',
      'noopener',
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:bg-secondary/30" style={{ borderColor: theme.border }}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: theme.light, color: theme.primary }}>
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
        {href ? (
          <a
            href={href}
            download
            aria-label={`Download ${resource.name}`}
            className="flex size-9 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: theme.primary, color: '#fff' }}
          >
            <Download className="size-4" />
          </a>
        ) : (
          <Button
            type="button"
            onClick={handleDownload}
            aria-label={`Download ${resource.name}`}
            variant="default"
            size="icon"
            className={cn('size-9 rounded-full border-none', downloaded ? 'bg-success/15 text-success' : '')}
            style={!downloaded ? { backgroundColor: theme.primary, color: '#fff' } as React.CSSProperties : undefined}
          >
            {downloaded ? <Check className="size-4" /> : <Download className="size-4" />}
          </Button>
        )}
        {href ? (
          <a
            href={href}
            onClick={handlePreview}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preview ${resource.name}`}
            className="flex size-9 items-center justify-center rounded-full border-none bg-secondary text-foreground transition-colors hover:bg-accent"
          >
            <Eye className="size-4" />
          </a>
        ) : (
          <Button
            type="button"
            onClick={() => {}}
            aria-label={`Preview ${resource.name}`}
            variant="secondary"
            size="icon"
            className="size-9 rounded-full border-none hover:bg-accent"
          >
            <Eye className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
