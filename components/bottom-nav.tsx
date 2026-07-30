'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Store, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const { count } = useCart()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
    >
      <ul className="flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          const Icon = tab.icon
          const isMarketplace = tab.href === '/marketplace'
          return (
            <li key={tab.href} className="flex-1">
              {isMarketplace ? (
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex flex-col items-center gap-1 overflow-hidden rounded-full border px-3 py-2 text-[11px] font-medium marketplace-border-glow',
                    'active:scale-[0.97] transition-transform duration-150',
                    'text-navy-text',
                    active && 'text-white',
                  )}
                >
                  <span
                    className={cn(
                      'absolute inset-0 rounded-full marketplace-hover-fill transition-transform duration-300 ease-out',
                      'motion-reduce:transition-none',
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 origin-right group-hover:scale-x-100',
                    )}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex flex-col items-center gap-1">
                    <span className="relative">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    {tab.label}
                  </span>
                </Link>
              ) : (
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                    active ? 'text-primary marketplace-border-glow rounded-full border border-transparent' : 'text-muted-foreground',
                  )}
                >
                  <span className="relative">
                    <Icon className="size-5 relative z-10" aria-hidden="true" />
                    {tab.href === '/shop' && count > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground z-20">
                        {count}
                      </span>
                    )}
                  </span>
                  {tab.label}
                  {active && <span className="absolute -top-px h-0.5 w-8 rounded-full bg-primary" aria-hidden="true" />}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
