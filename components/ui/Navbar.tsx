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
    <header className="sticky top-0 z-40 border-b border-tamarind/10 bg-surface/95 text-tamarind shadow-sm shadow-tamarind/5 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <BrandLogo />

        <div className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          {navItems.map(item => {
            const active = item.href !== '/#pricing' && pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${
                  active
                    ? 'border-turmeric text-indigo'
                    : 'border-transparent text-tamarind/68 hover:text-indigo'
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
            className="inline-flex min-h-11 items-center rounded-xl bg-indigo px-4 py-2 text-sm font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
          >
            Book a trial
          </Link>
          <button
            type="button"
            onClick={() => setOpen(current => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-tamarind/12 bg-surface text-tamarind transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric lg:hidden"
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
        <div id="mobile-menu" className="border-t border-tamarind/10 bg-surface px-4 pb-5 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 font-bold text-tamarind/80 transition duration-150 ease-out hover:bg-jasmine hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-indigo px-4 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric"
          >
            Book a trial
          </Link>
        </div>
      )}
    </header>
  )
}
