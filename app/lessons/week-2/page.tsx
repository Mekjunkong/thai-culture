import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import AudioPlayer from '@/components/lesson/AudioPlayer'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import QuizBlock, { type QuizQuestion } from '@/components/quiz/QuizBlock'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import MarkdownContent from '@/components/lesson/MarkdownContent'

export const metadata = {
  title: 'Week 2: Numbers, Prices, Colors & Everyday Objects | Thai Culture & Language',
  description: 'Beginner Thai lesson covering numbers, prices, colors, everyday objects, market phrases, and a quick quiz.',
  alternates: { canonical: '/lessons/week-2' },
}

const week2Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does ห้า (haa) mean?',
    options: ['3', '5', '8', '10'],
    correct: 1,
    explanation: 'ห้า (haa) means 5. Thai people also type 555 online because it sounds like hahaha.',
  },
  {
    id: 2,
    question: 'How do you ask “How much is this one?” politely?',
    options: ['สบายดีไหมครับ', 'อันนี้เท่าไหร่ครับ', 'ไม่เป็นไรครับ', 'ขอโทษครับ'],
    correct: 1,
    explanation: 'อันนี้เท่าไหร่ครับ/คะ (an nii thao-rai khrap/kha) means “How much is this one?”',
  },
  {
    id: 3,
    question: 'Which Thai phrase means “red”?',
    options: ['สีเขียว', 'สีฟ้า', 'สีแดง', 'สีขาว'],
    correct: 2,
    explanation: 'สีแดง (sii daeng) means red. สี (sii) means color.',
  },
  {
    id: 4,
    question: 'What is the special Thai number form for 20?',
    options: ['สองสิบ', 'ยี่สิบ', 'สิบสอง', 'หนึ่งร้อย'],
    correct: 1,
    explanation: '20 is ยี่สิบ (yii sip), not สองสิบ.',
  },
]

function getLessonContent() {
  try {
    return readFileSync(
      join(process.cwd(), 'content/lessons/week-2/content.md'),
      'utf-8'
    )
  } catch {
    return '# Lesson content loading...\n\nContent file not found.'
  }
}

export default function Week2Page() {
  const content = getLessonContent()

  return (
    <>
      <Navbar />
      <main className="bg-jasmine px-4 py-10 md:py-14 text-tamarind">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <section className="rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <Link href="/lessons" className="text-sm font-semibold text-indigo hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                ← Back to all lessons
              </Link>
              <div className="mt-6">
                <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-semibold uppercase text-temple">
                  Week 2 · Beginner lesson
                </span>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-tamarind text-balance md:text-5xl">
                  Numbers, Prices, Colors & Everyday Objects
                </h1>
                <p className="mt-4 text-tamarind/70 text-pretty">
                  Estimated time: <strong>30 min</strong> · Level: <strong>Absolute Beginner</strong>
                </p>
              </div>
            </section>

            <section aria-labelledby="audio-practice" className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-semibold uppercase text-temple">
                    Audio-first module
                  </span>
                  <h2 id="audio-practice" className="mt-4 text-2xl font-bold text-tamarind text-balance">Numbers you can hear in real shops</h2>
                  <p className="mt-2 max-w-2xl text-tamarind/70 text-pretty">
                    Two real MP3 practice tracks are ready: one for numbers and one for market phrases. Listen once, repeat slowly, then try the quiz.
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo text-3xl text-surface" aria-hidden="true">🎧</span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <AudioPlayer src="/assets/audio/week-2-numbers.mp3" label="Thai numbers 0-10 - slow repeat practice" />
                <AudioPlayer src="/assets/audio/week-2-market-phrases.mp3" label="Price questions - an nii thao-rai khrap/kha" />
              </div>
            </section>

            <article className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <MarkdownContent content={content} />
            </article>

            <section aria-labelledby="quiz-heading" className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <h2 id="quiz-heading" className="text-2xl font-bold text-tamarind text-balance">
                Check your understanding
              </h2>
              <div className="mt-6">
                <QuizBlock questions={week2Questions} />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase text-temple">Lesson map</p>
            <ol className="mt-4 space-y-3 text-sm text-tamarind/60">
              <li className="rounded-xl bg-jasmine p-3 font-semibold text-tamarind">1. Numbers 0-10</li>
              <li className="rounded-xl bg-surface p-3">2. Building 11-100</li>
              <li className="rounded-xl bg-surface p-3">3. Prices and shopping phrases</li>
              <li className="rounded-xl bg-surface p-3">4. Colors and everyday objects</li>
              <li className="rounded-xl bg-surface p-3">5. Quick quiz</li>
            </ol>
            <div className="mt-6 rounded-2xl bg-indigo p-5 text-surface">
              <p className="font-bold">Next: Week 3</p>
              <p className="mt-2 text-sm leading-6 text-surface/85">Ordering food, spice levels and café Thai.</p>
              <CheckoutButton className="mt-4 w-full rounded-lg bg-turmeric px-4 py-2 font-semibold text-tamarind transition hover:bg-turmeric-bright disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                Unlock lifetime access - ฿690
              </CheckoutButton>
            </div>
            <Link href="/lessons/week-1" className="mt-4 block text-center text-sm font-semibold text-indigo hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
              Review Week 1
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
