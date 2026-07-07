import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = {
  className?: string
  compact?: boolean
}

export default function BrandLogo({ className = '', compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex min-h-11 items-center gap-3 text-tamarind focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${className}`}
      aria-label="Thai Lessons Chiang Mai home"
    >
      <Image
        src="/assets/brand/logo-mark.svg"
        alt=""
        width={48}
        height={48}
        priority
        className="size-12 shrink-0 rounded-2xl shadow-inner"
      />
      {!compact && (
        <span className="leading-tight">
          <span className="block text-base font-black tracking-[-0.03em] md:text-lg">Thai Lessons</span>
          <span className="block text-base font-black tracking-[-0.03em] text-indigo md:text-lg">Chiang Mai</span>
        </span>
      )}
    </Link>
  )
}
