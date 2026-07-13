'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import BrandLogo from './BrandLogo'

const navItems = [
  { href: '/missions', label: 'Missions' },
  { href: '/practice', label: 'Practice app' },
  { href: '/lessons', label: 'Free course' },
  { href: '/products', label: 'Products' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="z-40 border-b border-ink/8 bg-paper text-ink">
      <nav aria-label="Main" className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-6 py-[18px]">
        <BrandLogo />

        <div className="hidden items-center gap-8 text-[13.5px] font-normal lg:flex">
          {navItems.map(item => {
            const active = item.href !== '/#pricing' && pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${
                  active
                    ? 'border-honey text-clay'
                    : 'border-transparent text-ink/65 hover:text-clay'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center bg-clay px-[22px] py-[11px] text-[13px] font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Book a trial
          </Link>
          <button
            type="button"
            onClick={() => setOpen(current => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center border border-ink/20 bg-paper text-ink transition duration-150 ease-out hover:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay lg:hidden"
          >
            {open ? (
              <XIcon className="size-5" weight="bold" aria-hidden="true" />
            ) : (
              <ListIcon className="size-5" weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-ink/8 bg-paper px-6 pb-5 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center px-3 font-semibold text-ink/75 transition duration-150 ease-out hover:bg-sand hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-12 items-center justify-center bg-clay px-4 font-semibold text-paper transition duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Book a trial
          </Link>
        </div>
      )}
    </header>
  )
}
