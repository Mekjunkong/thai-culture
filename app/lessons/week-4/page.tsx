import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import QuizBlock, { type QuizQuestion } from '@/components/quiz/QuizBlock'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import MarkdownContent from '@/components/lesson/MarkdownContent'

export const metadata = {
  title: 'Week 4: Transport, Temples, Markets & Local Etiquette | Thai Lessons Chiang Mai',
  description: 'Beginner Thai lesson for getting around Chiang Mai, talking to drivers, asking for help, and understanding temple and market etiquette.',
  alternates: { canonical: '/lessons/week-4' },
}

const week4Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you say “Stop here” to a driver?',
    options: ['จอดตรงนี้ครับ', 'คิดเงินครับ', 'หวานน้อยครับ', 'ไม่เผ็ดครับ'],
    correct: 0,
    explanation: 'จอดตรงนี้ครับ/ค่ะ (jawt dtrong nii khrap/kha) means stop here.',
  },
  {
    id: 2,
    question: 'What does ห้องน้ำอยู่ที่ไหน mean?',
    options: ['Where is the bathroom?', 'How much is this?', 'Can you help?', 'I live in Chiang Mai'],
    correct: 0,
    explanation: 'ห้องน้ำอยู่ที่ไหน means Where is the bathroom? Very useful in cafes, temples and markets.',
  },
  {
    id: 3,
    question: 'At temples, which behavior is usually correct?',
    options: ['Point feet at Buddha images', 'Speak louder than normal', 'Remove shoes when signs/local behavior show it', 'Bargain for entrance donations'],
    correct: 2,
    explanation: 'Remove shoes when signs or local behavior show it, dress modestly, and speak softly.',
  },
  {
    id: 4,
    question: 'Which phrase means “I do not understand”?',
    options: ['ไม่เข้าใจ', 'ไม่เป็นไร', 'ไม่เผ็ด', 'ไม่เอา'],
    correct: 0,
    explanation: 'ไม่เข้าใจ (mai khao jai) means I do not understand.',
  },
]

function getLessonContent() {
  try {
    return readFileSync(join(process.cwd(), 'content/lessons/week-4/content.md'), 'utf-8')
  } catch {
    return '# Lesson content loading...\n\nContent file not found.'
  }
}

export default function Week4Page() {
  const content = getLessonContent()

  return (
    <>
      <Navbar />
      <main className="bg-jasmine px-4 py-10 md:py-14 text-tamarind">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <section className="rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <Link href="/lessons" className="text-sm font-semibold text-clay hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                ← Back to all lessons
              </Link>
              <div className="mt-6">
                <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-semibold uppercase text-clay">
                  Week 4 · Chiang Mai survival Thai
                </span>
                <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-tamarind text-balance md:text-5xl">
                  Transport, Temples, Markets & Local Etiquette
                </h1>
                <p className="mt-4 text-tamarind/70 text-pretty">
                  Estimated time: <strong>40 min</strong> · Level: <strong>Beginner</strong> · Outcome: handle daily movement and polite local situations.
                </p>
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm">
              <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-semibold uppercase text-clay">
                Graduation module
              </span>
              <h2 className="mt-4 text-2xl font-bold text-tamarind text-balance">Put the starter course into real Chiang Mai life</h2>
              <p className="mt-2 max-w-2xl text-tamarind/70 text-pretty">
                This final beginner lesson combines direction Thai, help phrases, temple etiquette, and a three-scene graduation roleplay for live lessons.
              </p>
            </section>

            <article className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <MarkdownContent content={content} />
            </article>

            <section aria-labelledby="quiz-heading" className="mt-6 rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <h2 id="quiz-heading" className="text-2xl font-bold text-tamarind text-balance">
                Check your understanding
              </h2>
              <div className="mt-6">
                <QuizBlock questions={week4Questions} />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase text-clay">Lesson map</p>
            <ol className="mt-4 space-y-3 text-sm text-tamarind/60">
              <li className="rounded-xl bg-jasmine p-3 font-semibold text-tamarind">1. Transport and directions</li>
              <li className="rounded-xl bg-surface p-3">2. Help and problems</li>
              <li className="rounded-xl bg-surface p-3">3. Temple etiquette language</li>
              <li className="rounded-xl bg-surface p-3">4. Driver dialogue</li>
              <li className="rounded-xl bg-surface p-3">5. Graduation roleplay</li>
            </ol>
            <div className="mt-6 rounded-2xl bg-ink p-5 text-surface">
              <p className="font-bold">Course complete</p>
              <p className="mt-2 text-sm leading-6 text-surface/85">Next step: live speaking correction and a personalized Chiang Mai roleplay plan.</p>
              <CheckoutButton className="mt-4 block w-full rounded-lg bg-honey px-4 py-2 text-center font-semibold text-tamarind transition hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                Book Starter Pack
              </CheckoutButton>
            </div>
            <Link href="/lessons/week-1" className="mt-4 block text-center text-sm font-semibold text-clay hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
              Review Week 1
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
