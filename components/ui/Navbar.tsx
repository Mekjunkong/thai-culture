import Link from 'next/link'

const navItems = [
  { href: '/lessons/week-1', label: 'Free lesson' },
  { href: '/#curriculum', label: 'Curriculum' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 text-slate-900 shadow-sm md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-balance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
          <span aria-hidden="true">🇹🇭</span>
          <span>Thai Culture & Language</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-thai-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#pricing"
            className="rounded-lg bg-thai-navy px-4 py-2 font-semibold text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold"
          >
            Get full access
          </Link>
        </div>
      </div>
    </nav>
  )
}
