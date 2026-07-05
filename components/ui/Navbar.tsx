import Link from 'next/link'
import AuthStatus from '@/components/auth/AuthStatus'

const navItems = [
  { href: '/lessons/week-1', label: 'Free lesson' },
  { href: '/#curriculum', label: 'Curriculum' },
  { href: '/#pricing', label: 'Lessons & pricing' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-tamarind/10 bg-surface/92 px-4 py-3 text-tamarind shadow-sm shadow-tamarind/5 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 text-lg font-black tracking-[-0.02em] text-balance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jasmine text-base shadow-inner" aria-hidden="true">ไทย</span>
          <span>Thai Lessons Chiang Mai</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-tamarind/68 transition hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
              {item.label}
            </Link>
          ))}
          <AuthStatus />
          <Link
            href="/#pricing"
            className="inline-flex min-h-11 items-center rounded-xl bg-indigo px-4 py-2 font-bold text-surface transition hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
          >
            Book Thai lesson
          </Link>
        </div>
      </div>
    </nav>
  )
}
