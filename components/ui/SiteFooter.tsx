import Link from 'next/link'

const learnLinks = [
  { href: '/missions', label: 'Free 5-minute missions' },
  { href: '/practice', label: 'Practice app' },
  { href: '/lessons', label: 'Free 4-week course' },
  { href: '/products/50-thai-phrases-chiang-mai.html', label: '50 Chiang Mai phrases' },
]

const lessonLinks = [
  { href: '/#pricing', label: 'Lessons & pricing' },
  { href: '/products', label: 'All products' },
  { href: '/book', label: 'Book a trial' },
]

const whatsappHref =
  'https://wa.me/66929894495?text=' +
  encodeURIComponent('Hi, I want to learn Thai. Can I book a trial lesson?')

export default function SiteFooter() {
  return (
    <footer className="bg-tamarind px-4 pb-10 pt-14 text-jasmine md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-bold">
              Thai Lessons <span className="text-honey">Chiang Mai</span>
            </p>
            <p className="mt-3 max-w-xs leading-7 text-jasmine/70 text-pretty">
              Practical Thai for expats and travelers. Learn one real situation at
              a time, then get human correction online or in Chiang Mai.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-none bg-honey px-5 py-3 font-bold text-tamarind transition duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jasmine"
            >
              Message on WhatsApp
            </a>
          </div>

          <nav aria-label="Learn for free">
            <p className="text-sm font-bold text-honey">Learn free</p>
            <ul className="mt-4 space-y-1">
              {learnLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center leading-6 text-jasmine/75 transition duration-150 ease-out hover:text-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Lessons and booking">
            <p className="text-sm font-bold text-honey">Lessons</p>
            <ul className="mt-4 space-y-1">
              {lessonLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center leading-6 text-jasmine/75 transition duration-150 ease-out hover:text-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold text-honey">Contact</p>
            <ul className="mt-4 space-y-2 leading-7 text-jasmine/75">
              <li>Chiang Mai, Thailand</li>
              <li>Online lessons worldwide</li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-honey/60 underline-offset-4 transition duration-150 ease-out hover:text-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
                >
                  +66 92 989 4495
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-jasmine/15 pt-6 text-sm text-jasmine/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Thai Lessons Chiang Mai. All rights reserved.</p>
          <Link
            href="/teacher-dashboard"
            className="inline-flex min-h-10 items-center transition duration-150 ease-out hover:text-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            For teachers
          </Link>
        </div>
      </div>
    </footer>
  )
}
