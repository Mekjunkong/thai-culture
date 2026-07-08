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
      className={`group flex min-h-11 items-center gap-3 text-tamarind focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${className}`}
      aria-label="Thai Lessons Chiang Mai home"
    >
      <Image
        src="/assets/brand/logo-mark.svg"
        alt=""
        width={48}
        height={48}
        priority
        className="size-12 shrink-0 rounded-[1.35rem] shadow-[0_14px_34px_rgba(21,26,51,0.14)] ring-1 ring-tamarind/10 transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_42px_rgba(21,26,51,0.18)]"
      />
      {!compact && (
        <span className="leading-none">
          <span className="block font-serif text-lg font-bold tracking-[-0.04em] text-[#151A33] md:text-xl">Thai Lessons</span>
          <span className="mt-1 block text-[0.63rem] font-black uppercase tracking-[0.22em] text-[#8A6926] md:text-[0.68rem]">Chiang Mai</span>
        </span>
      )}
    </Link>
  )
}
