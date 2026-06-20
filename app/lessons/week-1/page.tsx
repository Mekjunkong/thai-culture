import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import AudioPlayer from '@/components/lesson/AudioPlayer'
import QuizBlock from '@/components/quiz/QuizBlock'
import Navbar from '@/components/ui/Navbar'
import MarkdownContent from '@/components/lesson/MarkdownContent'

export const metadata = {
  title: 'Week 1: Greetings & Politeness Particles | Thai Culture & Language',
  description: 'Free beginner Thai lesson covering sawasdee, wai, khrap, kha, and mai pen rai with cultural context and a quiz.',
}

function getLessonContent() {
  try {
    return readFileSync(
      join(process.cwd(), 'content/lessons/week-1/content.md'),
      'utf-8'
    )
  } catch {
    return '# Lesson content loading...\n\nContent file not found.'
  }
}

export default function Week1Page() {
  const content = getLessonContent()

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <Link href="/" className="text-sm font-semibold text-thai-navy hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
                ← Back to course overview
              </Link>
              <div className="mt-6">
                <span className="rounded-full bg-thai-cream px-3 py-1 text-xs font-semibold uppercase text-thai-red">
                  Week 1 · Free lesson
                </span>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 text-balance md:text-5xl">
                  Greetings & Politeness Particles
                </h1>
                <p className="mt-4 text-slate-600 text-pretty">
                  Estimated time: <strong>25 min</strong> · Level: <strong>Absolute Beginner</strong>
                </p>
              </div>
            </section>

            <section aria-labelledby="audio-practice" className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="rounded-full bg-thai-cream px-3 py-1 text-xs font-semibold uppercase text-thai-red">
                    Audio-first module
                  </span>
                  <h2 id="audio-practice" className="mt-4 text-2xl font-bold text-slate-950 text-balance">Listen, repeat, then read</h2>
                  <p className="mt-2 max-w-2xl text-slate-600 text-pretty">
                    This course is being built audio-first. Add final MP3 files in <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">/public/assets/audio</code>; the lesson is already structured for short guided listening blocks.
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-thai-navy text-3xl text-white" aria-hidden="true">🎧</span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <AudioPlayer label="Sawasdee khrap / sawasdee kha — greeting practice" />
                <AudioPlayer label="Wai etiquette — when to bow and when not to" />
                <AudioPlayer label="Khrap, kha and mai pen rai — social tone practice" />
              </div>
            </section>

            <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <MarkdownContent content={content} />
            </article>

            <section aria-labelledby="quiz-heading" className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 id="quiz-heading" className="text-2xl font-bold text-slate-950 text-balance">
                Check your understanding
              </h2>
              <div className="mt-6">
                <QuizBlock />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase text-thai-red">Lesson map</p>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="rounded-xl bg-thai-cream p-3 font-semibold text-slate-950">1. Sawasdee in real life</li>
              <li className="rounded-xl bg-slate-50 p-3">2. Wai etiquette</li>
              <li className="rounded-xl bg-slate-50 p-3">3. Khrap, kha and social tone</li>
              <li className="rounded-xl bg-slate-50 p-3">4. Quick quiz</li>
            </ol>
            <div className="mt-6 rounded-2xl bg-thai-navy p-5 text-white">
              <p className="font-bold">Continue to Week 2</p>
              <p className="mt-2 text-sm leading-6 text-blue-50">Numbers, colors, prices and everyday objects.</p>
              <Link href="/lessons/week-2" className="mt-4 block w-full rounded-lg bg-thai-gold px-4 py-2 text-center font-semibold text-slate-950 transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Open Week 2 →
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
