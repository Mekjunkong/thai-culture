import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import LearnerHub from '@/components/learner/LearnerHub'

export const metadata: Metadata = {
  title: 'Learning Hub | Thai Lessons Chiang Mai',
  description: 'A device-local learning hub for the four-week Thai preview course, with lesson progress saved only in this browser.',
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Learning Hub | Thai Lessons Chiang Mai',
    description: 'Continue the four-week Thai preview course and keep lesson progress on this device.',
    url: '/learn',
    type: 'website',
  },
}

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <LearnerHub />
      <SiteFooter />
    </>
  )
}
