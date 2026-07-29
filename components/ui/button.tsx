'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type Ripple = { id: number; x: number; y: number }

type Props = ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & {
  animations?: boolean
  iconType?: 'arrow' | 'download' | 'external' | 'none'
  isLoading?: boolean
  showSuccess?: boolean
  successText?: string
  magnetic?: boolean
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  animations = true,
  iconType = 'none',
  isLoading = false,
  showSuccess = false,
  successText = 'Done',
  magnetic = false,
  children,
  disabled,
  ...restProps
}: Props) {
  const reduced = useReducedMotion()
  const animEnabled = animations && !reduced

  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = buttonRef.current
    if (!el || !animEnabled) return

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = nextId.current++
      setRipples((prev) => [...prev, { id, x, y }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [animEnabled])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!magnetic || !animEnabled || !buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientX - cx) / (rect.width / 2)) * 6
    const y = ((e.clientY - cy) / (rect.height / 2)) * 6
    buttonRef.current.style.transform = `translate(${x}px, ${y}px)`
    buttonRef.current.style.transition = 'none'
  }, [magnetic, animEnabled])

  const handlePointerLeave = useCallback(() => {
    if (!magnetic || !animEnabled || !buttonRef.current) return
    buttonRef.current.style.transform = ''
    buttonRef.current.style.transition = ''
  }, [magnetic, animEnabled])

  const sweepEnabled = animEnabled && variant === 'default' && !isLoading && !showSuccess

  return (
    <ButtonPrimitive
      ref={buttonRef}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        animEnabled && [
          'transition-all duration-200 ease-out',
          'hover:-translate-y-0.5 hover:scale-[1.02]',
          'active:scale-[0.97]',
          variant === 'default' && 'hover:shadow-lg hover:shadow-primary/25',
          variant === 'outline' && 'hover:shadow-md',
          iconType === 'arrow' && 'group-hover/button:[&_svg]:translate-x-1',
          iconType === 'download' && 'group-hover/button:[&_svg]:translate-y-0.5',
          iconType === 'external' && [
            'group-hover/button:[&_svg]:translate-x-0.5',
            'group-hover/button:[&_svg]:-translate-y-0.5',
          ],
          iconType !== 'none' && '[&_svg]:transition-transform [&_svg]:duration-200',
        ],
        animEnabled && 'relative overflow-hidden',
        showSuccess && 'bg-success text-white border-success hover:bg-success',
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...restProps}
    >
      {sweepEnabled && (
        <span
          className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/[0.12] to-transparent translate-x-[-100%] transition-transform duration-700 ease-in-out group-hover/button:translate-x-[100%]"
          aria-hidden="true"
        />
      )}

      {animEnabled && ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/25"
          style={{ left: r.x, top: r.y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1.5"
          >
            <Loader2 className="size-4 animate-spin" />
            {children}
          </motion.span>
        ) : showSuccess ? (
          <motion.span
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-1.5"
          >
            <Check className="size-4" />
            <span>{successText}</span>
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1.5"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
