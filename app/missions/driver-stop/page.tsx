import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import DriverStopMission from './DriverStopMission'

export const metadata: Metadata = {
  title: 'Tell a Driver Where to Stop in Thai | Chiang Mai Transport Mission',
  description:
    'Complete a free Thai transport mission for Chiang Mai expats: tell a driver to stop here, go straight, turn left, and turn right.',
  alternates: { canonical: '/missions/driver-stop' },
  openGraph: {
    title: 'Tell a Driver Where to Stop in Thai — Chiang Mai Mission',
    description: 'A practical Thai transport mission for Grab, songthaew, taxi, and local drivers in Chiang Mai.',
    url: '/missions/driver-stop',
    type: 'article',
  },
}

export default function DriverStopPage() {
  return (
    <>
      <Navbar />
      <DriverStopMission />
      <footer className="border-t border-tamarind/10 bg-surface px-4 py-8 text-center text-sm text-tamarind/65">
        <Link href="/missions" className="font-bold text-indigo hover:text-indigo-soft">
          ← Back to mission library
        </Link>
      </footer>
    </>
  )
}
