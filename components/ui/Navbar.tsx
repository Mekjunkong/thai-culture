import Link from 'next/link'

const navItems = [
  { href: '/missions', label: 'Free missions' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-tamarind/10 bg-surface/94 px-4 py-3 text-tamarind shadow-sm shadow-tamarind/5 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link href="/" className="flex min-h-11 items-center gap-2 text-base font-black tracking-[-0.02em] text-balance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric md:text-lg">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-jasmine text-sm shadow-inner" aria-hidden="true">ไทย</span>
          <span className="leading-tight">Thai Lessons Chiang Mai</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-tamarind/68 transition hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#pricing"
            className="inline-flex min-h-11 items-center rounded-xl bg-indigo px-4 py-2 font-black text-surface transition hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
          >
            Book
          </Link>
        </div>
      </div>
    </nav>
  )
}
