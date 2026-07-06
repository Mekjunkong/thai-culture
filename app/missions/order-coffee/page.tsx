import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import OrderCoffeeMission from './OrderCoffeeMission'

export const metadata: Metadata = {
  title: 'Order Coffee in Thai | Free Chiang Mai Thai Mission',
  description:
    'Complete a free 5-minute Thai mission for Chiang Mai expats: choose your drink, choose sweetness, and order coffee politely in Thai.',
  alternates: {
    canonical: '/missions/order-coffee',
  },
  openGraph: {
    title: 'Order Coffee in Thai — Chiang Mai Mission',
    description: 'A fun, beginner-friendly Thai mission for expats: order coffee less sweet in Chiang Mai.',
    url: '/missions/order-coffee',
    type: 'article',
  },
}

export default function OrderCoffeePage() {
  return (
    <>
      <Navbar />
      <OrderCoffeeMission />
      <footer className="border-t border-tamarind/10 bg-surface px-4 py-8 text-center text-sm text-tamarind/65">
        <Link href="/" className="font-bold text-indigo hover:text-indigo-soft">
          ← Back to Thai Lessons Chiang Mai
        </Link>
      </footer>
    </>
  )
}
