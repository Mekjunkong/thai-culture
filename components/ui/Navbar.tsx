import Link from 'next/link'
import BrandLogo from './BrandLogo'

const navItems = [
  { href: '/practice', label: 'Practice app' },
  { href: '/missions', label: 'Missions' },
  { href: '/products', label: 'Products' },
  { href: '/book', label: 'Intake' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-tamarind/10 bg-surface/95 px-4 py-3 text-tamarind shadow-sm shadow-tamarind/5 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <BrandLogo />

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
            href="/practice"
            className="hidden min-h-11 items-center rounded-xl border border-tamarind/12 bg-surface px-4 py-2 font-black text-indigo transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric sm:inline-flex"
          >
            Practice free
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-xl bg-indigo px-4 py-2 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
          >
            Book lesson
          </Link>
        </div>
      </div>
    </nav>
  )
}
