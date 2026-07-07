import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import OrderFoodSpiceMission from './OrderFoodSpiceMission'

export const metadata: Metadata = {
  title: 'Order Food in Thai | Free Chiang Mai Restaurant Mission',
  description:
    'Complete a free 6-minute Thai mission for Chiang Mai expats: order food, choose spice level, say eat here or takeaway, and ask for the bill.',
  alternates: {
    canonical: '/missions/order-food-spice',
  },
  openGraph: {
    title: 'Order Food and Choose Spice Level in Thai — Chiang Mai Mission',
    description: 'A practical Thai restaurant mission for expats: order food, control spice level, and ask for the bill.',
    url: '/missions/order-food-spice',
    type: 'article',
  },
}

export default function OrderFoodSpicePage() {
  return (
    <>
      <Navbar />
      <OrderFoodSpiceMission />
      <footer className="border-t border-tamarind/10 bg-surface px-4 py-8 text-center text-sm text-tamarind/65">
        <Link href="/missions" className="font-bold text-indigo hover:text-indigo-soft">
          ← Back to mission library
        </Link>
      </footer>
    </>
  )
}
