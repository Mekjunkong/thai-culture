import Link from 'next/link'

type BrandLogoProps = {
  className?: string
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center font-serif text-xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${className}`}
      aria-label="Thai Lessons Chiang Mai home"
    >
      Thai Lessons <span className="ml-1 font-bold italic text-clay">Chiang Mai</span>
    </Link>
  )
}
