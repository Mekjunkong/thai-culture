'use client'

import { useEffect, useMemo, useState } from 'react'

type Word = { thai: string; roman: string; english: string; emoji: string; note?: string }
type Category = { id: string; title: string; emoji: string; situation: string; words: Word[] }
type Screen = 'home' | 'flashcards' | 'quiz' | 'complete'
type Progress = { stars: number; completed: string[]; sessions: number; lastStudyDate: string; streak: number }

const STORAGE_KEY = 'thai-expat-practice-progress'

const categories: Category[] = [
  {
    id: 'cafe', title: 'Cafe Thai', emoji: '☕', situation: 'Order coffee, sweetness, ice, and bill.', words: [
      { thai: 'ขอกาแฟเย็นครับ', roman: 'khǎaw gaa-fae yen khrap', english: 'I would like iced coffee, please.', emoji: '☕' },
      { thai: 'หวานน้อย', roman: 'wǎan nói', english: 'Less sweet.', emoji: '🍯' },
      { thai: 'ไม่ใส่น้ำตาล', roman: 'mâi sài náam-dtaan', english: 'No sugar.', emoji: '🚫' },
      { thai: 'คิดเงินครับ', roman: 'khít ngoen khrap', english: 'Bill please.', emoji: '🧾' },
    ],
  },
  {
    id: 'market', title: 'Market Thai', emoji: '🥭', situation: 'Ask prices and buy fruit politely.', words: [
      { thai: 'ราคาเท่าไหร่ครับ', roman: 'raa-khaa thâo-rài khrap', english: 'How much is it?', emoji: '💰' },
      { thai: 'เอาหนึ่งกิโลครับ', roman: 'ao nèung gii-loh khrap', english: 'I will take one kilo.', emoji: '⚖️' },
      { thai: 'ลดได้นิดหน่อยไหมครับ', roman: 'lót dâai nít-nòi mái khrap', english: 'Can you discount a little?', emoji: '🤏' },
      { thai: 'ไม่เอา ขอบคุณครับ', roman: 'mâi ao, khàawp-khun khrap', english: 'I do not want it, thank you.', emoji: '🙏' },
    ],
  },
  {
    id: 'food', title: 'Restaurant Thai', emoji: '🍜', situation: 'Order food and control spice level.', words: [
      { thai: 'เอาข้าวซอยครับ', roman: 'ao khaao soi khrap', english: 'I will have khao soi, please.', emoji: '🍜' },
      { thai: 'ไม่เผ็ด', roman: 'mâi phèt', english: 'Not spicy.', emoji: '🌶️' },
      { thai: 'เผ็ดนิดหน่อย', roman: 'phèt nít-nòi', english: 'A little spicy.', emoji: '🔥' },
      { thai: 'กินที่นี่ครับ', roman: 'gin thîi-nîi khrap', english: 'Eat here, please.', emoji: '🍽️' },
    ],
  },
  {
    id: 'transport', title: 'Transport Thai', emoji: '🚗', situation: 'Talk to drivers and songthaews.', words: [
      { thai: 'จอดตรงนี้ครับ', roman: 'jàwt dtrong-níi khrap', english: 'Stop here, please.', emoji: '📍' },
      { thai: 'ตรงไปครับ', roman: 'dtrong bpai khrap', english: 'Go straight, please.', emoji: '⬆️' },
      { thai: 'เลี้ยวซ้ายครับ', roman: 'líao sáai khrap', english: 'Turn left, please.', emoji: '⬅️' },
      { thai: 'เลี้ยวขวาครับ', roman: 'líao khwǎa khrap', english: 'Turn right, please.', emoji: '➡️' },
    ],
  },
  {
    id: 'polite', title: 'Polite Basics', emoji: '🙏', situation: 'Daily kindness, slow speech, and help.', words: [
      { thai: 'สวัสดีครับ', roman: 'sà-wàt-dii khrap', english: 'Hello.', emoji: '👋' },
      { thai: 'ขอบคุณครับ', roman: 'khàawp-khun khrap', english: 'Thank you.', emoji: '🙏' },
      { thai: 'พูดช้าๆ ได้ไหมครับ', roman: 'phûut cháa-cháa dâai mái khrap', english: 'Can you speak slowly?', emoji: '🐢' },
      { thai: 'ช่วยได้ไหมครับ', roman: 'chûai dâai mái khrap', english: 'Can you help?', emoji: '🛟' },
    ],
  },
]

const defaultProgress: Progress = { stars: 0, completed: [], sessions: 0, lastStudyDate: '', streak: 0 }

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export default function ThaiPracticeApp() {
  const [screen, setScreen] = useState<Screen>('home')
  const [category, setCategory] = useState(categories[0])
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [sessionStars, setSessionStars] = useState(0)
  const [progress, setProgress] = useState<Progress>(defaultProgress)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress({ ...defaultProgress, ...JSON.parse(raw) })
    } catch {
      setProgress(defaultProgress)
    }
  }, [])

  const questions = useMemo(() => category.words.map((word) => ({
    word,
    options: shuffle([word.english, ...shuffle(category.words.filter((item) => item.english !== word.english).map((item) => item.english)).slice(0, 3)]),
  })), [category])

  const currentCard = category.words[cardIndex]
  const currentQuestion = questions[questionIndex]
  const completionPercent = Math.round((progress.completed.length / categories.length) * 100)

  function saveProgress(next: Progress) {
    setProgress(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function startFlashcards(nextCategory: Category) {
    setCategory(nextCategory)
    setCardIndex(0)
    setFlipped(false)
    setScreen('flashcards')
  }

  function startQuiz(nextCategory = category) {
    setCategory(nextCategory)
    setQuestionIndex(0)
    setSelected(null)
    setScore(0)
    setSessionStars(0)
    setScreen('quiz')
  }

  function completeSession(earnedStars: number) {
    const today = todayKey()
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const alreadyCompleted = progress.completed.includes(category.id)
    const nextCompleted = alreadyCompleted ? progress.completed : [...progress.completed, category.id]
    const nextStreak = progress.lastStudyDate === today ? progress.streak : progress.lastStudyDate === yesterday ? progress.streak + 1 : 1
    saveProgress({
      stars: progress.stars + earnedStars,
      completed: nextCompleted,
      sessions: progress.sessions + 1,
      lastStudyDate: today,
      streak: nextStreak,
    })
    setSessionStars(earnedStars)
    setScreen('complete')
  }

  function nextCard() {
    if (cardIndex + 1 >= category.words.length) {
      completeSession(2)
      return
    }
    setCardIndex((index) => index + 1)
    setFlipped(false)
  }

  function pickAnswer(option: string) {
    if (selected || !currentQuestion) return
    setSelected(option)
    const correct = option === currentQuestion.word.english
    const nextScore = correct ? score + 1 : score
    if (correct) setScore(nextScore)
    window.setTimeout(() => {
      if (questionIndex + 1 >= questions.length) {
        const earned = Math.max(1, nextScore)
        completeSession(earned)
      } else {
        setQuestionIndex((index) => index + 1)
        setSelected(null)
      }
    }, correct ? 650 : 1050)
  }

  if (screen === 'home') {
    return (
      <main className="bg-[oklch(95%_0.035_294)] px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px] rounded-[2rem] border-[3px] border-white/70 bg-[oklch(99%_0.006_294)] p-5 shadow-2xl shadow-indigo/15">
          <section className="rounded-[1.5rem] bg-gradient-to-br from-indigo to-indigo-soft p-6 text-surface">
            <p className="text-sm font-black uppercase text-turmeric">Kids-app style · built for Thai learners</p>
            <h1 className="mt-3 text-4xl font-black leading-none tracking-[-0.05em] text-balance">Thai practice app for Chiang Mai life.</h1>
            <p className="mt-4 leading-7 text-surface/80 text-pretty">Flashcards, quick quizzes, stars, streaks, and practical phrase categories — adapted from your kids learning app idea.</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-surface/10 p-3"><p className="text-2xl font-black text-turmeric">{progress.stars}</p><p className="text-xs font-bold">stars</p></div>
              <div className="rounded-2xl bg-surface/10 p-3"><p className="text-2xl font-black text-turmeric">{progress.streak}</p><p className="text-xs font-bold">streak</p></div>
              <div className="rounded-2xl bg-surface/10 p-3"><p className="text-2xl font-black text-turmeric">{completionPercent}%</p><p className="text-xs font-bold">done</p></div>
            </div>
          </section>

          <section className="mt-5 grid gap-3">
            {categories.map((item) => {
              const done = progress.completed.includes(item.id)
              return (
                <article key={item.id} className="rounded-[1.5rem] border-[3px] border-white/70 bg-jasmine p-4 shadow-lg shadow-indigo/8">
                  <div className="flex items-start gap-3">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-surface text-3xl shadow-inner" aria-hidden="true">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-black leading-tight">{item.title}</h2>
                        {done && <span className="rounded-full bg-banana/15 px-2 py-1 text-xs font-black text-banana">Done</span>}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-tamarind/65">{item.situation}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => startFlashcards(item)} className="min-h-11 rounded-2xl bg-indigo px-3 py-2 font-black text-surface shadow-md shadow-indigo/15 transition duration-150 active:scale-[0.98]">Flashcards</button>
                        <button type="button" onClick={() => startQuiz(item)} className="min-h-11 rounded-2xl bg-turmeric px-3 py-2 font-black text-tamarind shadow-md shadow-tamarind/10 transition duration-150 active:scale-[0.98]">Quiz</button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        </div>
      </main>
    )
  }

  if (screen === 'flashcards') {
    return (
      <main className="min-h-screen bg-[oklch(95%_0.035_294)] px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setScreen('home')} className="min-h-11 rounded-full bg-surface px-4 font-black shadow-sm">←</button>
            <p className="font-black text-indigo">{cardIndex + 1} / {category.words.length}</p>
          </div>
          <button type="button" onClick={() => setFlipped((value) => !value)} className="min-h-[360px] w-full rounded-[2rem] border-[3px] border-white/70 bg-surface p-6 text-center shadow-2xl shadow-indigo/15 transition duration-150 active:scale-[0.99]" aria-pressed={flipped}>
            <p className="text-6xl" aria-hidden="true">{currentCard.emoji}</p>
            {!flipped ? (
              <>
                <p className="mt-8 text-5xl font-black leading-tight text-indigo">{currentCard.thai}</p>
                <p className="mt-4 text-xl font-bold text-temple">{currentCard.roman}</p>
                <p className="mt-8 rounded-2xl bg-jasmine p-4 font-black text-tamarind/70">Tap to reveal meaning</p>
              </>
            ) : (
              <>
                <p className="mt-8 text-4xl font-black leading-tight text-indigo">{currentCard.english}</p>
                <p className="mt-5 rounded-2xl bg-jasmine p-4 text-lg font-bold text-tamarind/70">Say it 3 times, then use it today.</p>
              </>
            )}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setFlipped(false)} className="min-h-12 rounded-2xl border border-tamarind/10 bg-surface font-black text-indigo">Show Thai</button>
            <button type="button" onClick={nextCard} className="min-h-12 rounded-2xl bg-indigo font-black text-surface">Next card →</button>
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'quiz' && currentQuestion) {
    const quizPercent = Math.round(((questionIndex + (selected ? 1 : 0)) / questions.length) * 100)
    return (
      <main className="min-h-screen bg-[oklch(95%_0.035_294)] px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setScreen('home')} className="min-h-11 rounded-full bg-surface px-4 font-black shadow-sm">←</button>
            <p className="font-black text-indigo">⭐ {score}</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={quizPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
            <div className="h-full rounded-full bg-turmeric transition-all duration-150" style={{ width: `${quizPercent}%` }} />
          </div>
          <section className="mt-5 rounded-[2rem] border-[3px] border-white/70 bg-surface p-6 shadow-2xl shadow-indigo/15">
            <p className="text-sm font-black uppercase text-temple">Choose the meaning</p>
            <p className="mt-5 text-center text-6xl" aria-hidden="true">{currentQuestion.word.emoji}</p>
            <h1 className="mt-5 text-center text-5xl font-black leading-tight text-indigo">{currentQuestion.word.thai}</h1>
            <p className="mt-3 text-center text-lg font-bold text-temple">{currentQuestion.word.roman}</p>
            <div className="mt-6 grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selected === option
                const isCorrect = option === currentQuestion.word.english
                return (
                  <button key={option} type="button" onClick={() => pickAnswer(option)} className={`min-h-14 rounded-2xl border p-4 text-left font-black transition duration-150 ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-tamarind/10 bg-jasmine text-tamarind'}`} aria-pressed={isSelected}>
                    {option}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[oklch(95%_0.035_294)] px-4 py-8 text-tamarind">
      <section className="mx-auto max-w-[520px] rounded-[2rem] border-[3px] border-white/70 bg-surface p-6 text-center shadow-2xl shadow-indigo/15">
        <p className="text-7xl" aria-hidden="true">🏆</p>
        <p className="mt-5 text-sm font-black uppercase text-temple">Session complete</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em]">You earned {sessionStars} stars.</h1>
        <p className="mt-4 leading-7 text-tamarind/70">Completed: {category.title}. Keep the streak going with another small Chiang Mai situation.</p>
        <div className="mt-6 grid gap-3">
          <button type="button" onClick={() => startQuiz(category)} className="min-h-12 rounded-2xl bg-indigo font-black text-surface">Replay quiz</button>
          <button type="button" onClick={() => setScreen('home')} className="min-h-12 rounded-2xl bg-turmeric font-black text-tamarind">Choose another category</button>
          <a href="https://wa.me/66929894495?text=Hi%20Mike%2C%20I%20finished%20a%20Thai%20practice%20session.%20Can%20I%20send%20a%20voice%20note%20for%20correction%3F" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/10 bg-jasmine font-black text-indigo">Send voice note to Mike</a>
        </div>
      </section>
    </main>
  )
}
