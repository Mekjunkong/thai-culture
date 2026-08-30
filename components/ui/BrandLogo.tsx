import Link from 'next/link'

type BrandLogoProps = {
  className?: string
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-3 font-serif text-xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${className}`}
      aria-label="Thai Lessons Chiang Mai home"
    >
      <img className="h-11 w-11 shrink-0 object-contain" src="/assets/brand/thai-lessons-chiang-mai-doisuthep-icon.svg" alt="" aria-hidden="true" />
      <span>Thai Lessons <span className="ml-1 font-bold italic text-clay">Chiang Mai</span><small className="mt-1 block font-sans text-[8px] font-bold uppercase tracking-[0.18em] text-muted">Tua Mueang · Online</small></span>
    </Link>
  )
}
