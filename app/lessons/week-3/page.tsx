import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import QuizBlock, { type QuizQuestion } from '@/components/quiz/QuizBlock'
import Navbar from '@/components/ui/Navbar'
import MarkdownContent from '@/components/lesson/MarkdownContent'

export const metadata = {
  title: 'Week 3: Ordering Food, Coffee & Spice Levels | Thai Lessons Chiang Mai',
  description: 'Beginner Thai lesson for ordering food and coffee in Chiang Mai: spice levels, sweetness, eat here, takeaway, and bill please.',
}

const week3Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does ไม่เผ็ด mean?',
    options: ['Very spicy', 'Not spicy', 'Less sweet', 'Take away'],
    correct: 1,
    explanation: 'ไม่เผ็ด (mai phet) means not spicy. If you need zero chili, say ไม่ใส่พริกเลย.',
  },
  {
    id: 2,
    question: 'How do you say “less sweet” for coffee or Thai tea?',
    options: ['หวานน้อย', 'คิดเงิน', 'กินที่นี่', 'เอาอันนี้'],
    correct: 0,
    explanation: 'หวานน้อย (waan noi) means less sweet — very useful in Thai cafes.',
  },
  {
    id: 3,
    question: 'Which phrase means “bill please”?',
    options: ['กลับบ้านครับ', 'คิดเงินครับ', 'พูดช้าๆครับ', 'เลี้ยวซ้ายครับ'],
    correct: 1,
    explanation: 'คิดเงินครับ/ค่ะ (khit ngoen khrap/kha) is the common way to ask for the bill.',
  },
  {
    id: 4,
    question: 'What does กินที่นี่ mean?',
    options: ['Eat here', 'Take away', 'No milk', 'One cup'],
    correct: 0,
    explanation: 'กินที่นี่ means eat here. กลับบ้าน means take away / to go.',
  },
]

function getLessonContent() {
  try {
    return readFileSync(join(process.cwd(), 'content/lessons/week-3/content.md'), 'utf-8')
  } catch {
    return '# Lesson content loading...\n\nContent file not found.'
  }
}

export default function Week3Page() {
  const content = getLessonContent()

  return (
    <>
      <Navbar />
      <main className="bg-jasmine px-4 py-10 md:py-14 text-tamarind">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <section className="rounded-3xl border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
              <Link href="/" className="text-sm font-semibold text-thai-navy hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
                ← Back to course overview
              </Link>
              <div className="mt-6">
                <span className="rounded-full bg-thai-cream px-3 py-1 text-xs font-semibold uppercase text-thai-red">
                  Week 3 · Food and cafe Thai
                </span>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-tamarind text-balance md:text-5xl">
                  Ordering Food, Coffee & Spice Levels
                </h1>
                <p className="mt-4 text-tamarind/70 text-pretty">
                  Estimated time: <strong>35 min</strong> · Level: <strong>Beginner</strong> · Outcome: order one meal or drink politely.
                </p>
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="rounded-full bg-thai-cream px-3 py-1 text-xs font-semibold uppercase text-thai-red">
                Speaking-first class
              </span>
              <h2 className="mt-4 text-2xl font-bold text-tamarind text-balance">Useful Thai for the first meal you order alone</h2>
              <p className="mt-2 max-w-2xl text-tamarind/70 text-pretty">
                This module turns phrase knowledge into a real restaurant/cafe roleplay: choose an item, specify sweetness or spice, answer staff questions, and ask for the bill.
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
                <QuizBlock questions={week3Questions} />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase text-thai-red">Lesson map</p>
            <ol className="mt-4 space-y-3 text-sm text-tamarind/60">
              <li className="rounded-xl bg-thai-cream p-3 font-semibold text-tamarind">1. Food ordering survival phrases</li>
              <li className="rounded-xl bg-surface p-3">2. Spice levels</li>
              <li className="rounded-xl bg-surface p-3">3. Coffee and sweetness</li>
              <li className="rounded-xl bg-surface p-3">4. Restaurant roleplay</li>
              <li className="rounded-xl bg-surface p-3">5. Real-life mission</li>
            </ol>
            <div className="mt-6 rounded-2xl bg-thai-navy p-5 text-white">
              <p className="font-bold">Next: Week 4</p>
              <p className="mt-2 text-sm leading-6 text-blue-50">Transport, temples, markets and local etiquette.</p>
              <Link href="/lessons/week-4" className="mt-4 block w-full rounded-lg bg-thai-gold px-4 py-2 text-center font-semibold text-tamarind transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Open Week 4 →
              </Link>
            </div>
            <CheckoutButton className="mt-4 block w-full rounded-lg bg-thai-navy px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
              Book live practice
            </CheckoutButton>
          </aside>
        </div>
      </main>
    </>
  )
}
