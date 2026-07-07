import Link from 'next/link'

const navItems = [
  { href: '/missions', label: 'Missions' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-tamarind/10 bg-surface/95 px-4 py-3 text-tamarind shadow-sm shadow-tamarind/5 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 text-base font-black tracking-[-0.02em] text-balance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric md:text-lg"
          aria-label="Thai Lessons Chiang Mai home"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-jasmine text-sm shadow-inner" aria-hidden="true">ไทย</span>
          <span className="leading-tight">Thai Lessons Chiang Mai</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-tamarind/68 transition duration-150 ease-out hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/missions"
            className="hidden min-h-11 items-center rounded-xl border border-tamarind/12 bg-surface px-4 py-2 font-black text-indigo transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric sm:inline-flex"
          >
            Start free
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex min-h-11 items-center rounded-xl bg-indigo px-4 py-2 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
          >
            Book lesson
          </Link>
        </div>
      </div>
    </nav>
  )
}
