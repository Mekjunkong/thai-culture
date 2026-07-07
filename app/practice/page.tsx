import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import ThaiPracticeApp from './ThaiPracticeApp'

export const metadata: Metadata = {
  title: 'Thai Practice App for Expats | Thai Lessons Chiang Mai',
  description:
    'A mobile-friendly Thai learning app for Chiang Mai expats with flashcards, quizzes, stars, streaks, and practical daily-life categories.',
  alternates: { canonical: '/practice' },
  openGraph: {
    title: 'Thai Practice App for Expats in Chiang Mai',
    description: 'Practice useful Thai with flashcards, mini quizzes, stars, and Chiang Mai daily-life categories.',
    url: '/practice',
    type: 'website',
  },
}

export default function PracticePage() {
  return (
    <>
      <Navbar />
      <ThaiPracticeApp />
    </>
  )
}
