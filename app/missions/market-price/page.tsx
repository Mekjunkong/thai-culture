import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import MarketPriceMission from './MarketPriceMission'

export const metadata: Metadata = {
  title: 'Ask the Price in Thai | Free Chiang Mai Market Mission',
  description:
    'Complete a free 5-minute Thai mission for Chiang Mai expats: ask the price, choose fruit, understand simple prices, and buy at a local market.',
  alternates: {
    canonical: '/missions/market-price',
  },
  openGraph: {
    title: 'Ask the Price in Thai - Chiang Mai Market Mission',
    description: 'A fun, beginner-friendly Thai mission for expats: ask how much and buy fruit at a Chiang Mai market.',
    url: '/missions/market-price',
    type: 'article',
  },
}

export default function MarketPricePage() {
  return (
    <>
      <Navbar />
      <MarketPriceMission />
      <footer className="border-t border-tamarind/10 bg-surface px-4 py-8 text-center text-sm text-tamarind/65">
        <Link href="/missions" className="font-bold text-indigo hover:text-indigo-soft">
          ← Back to mission library
        </Link>
      </footer>
    </>
  )
}
