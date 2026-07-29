'use client'

import { useState, useRef, type RefObject } from 'react'

type RippleItem = { id: number; x: number; y: number; size: number }

export function useRipple<T extends HTMLElement>() {
  const [ripples, setRipples] = useState<RippleItem[]>([])
  const idRef = useRef(0)
  const elRef = useRef<T>(null)

  function createRipple(clientX: number, clientY: number) {
    const btn = elRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const id = idRef.current++
    setRipples((prev) => [...prev, { id, x: clientX - rect.left - size / 2, y: clientY - rect.top - size / 2, size }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
  }

  const rippleSpans = ripples.map((r) => (
    <span
      key={r.id}
      className="pointer-events-none absolute rounded-full bg-white/25 animate-ripple"
      style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
    />
  ))

  return { createRipple, rippleSpans, elRef }
}
