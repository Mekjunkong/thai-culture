'use client'

import { useEffect, useMemo, useState } from 'react'
import { getDueIds, getLearnedCount, gradeCard, localDateKey, localYesterdayKey, type Grade } from '@/lib/srs'

type Word = { id: string; thai: string; roman: string; english: string; emoji: string; note?: string }
type Category = { id: string; title: string; emoji: string; situation: string; words: Word[] }
type Screen = 'home' | 'flashcards' | 'quiz' | 'review' | 'complete'
type Progress = { stars: number; completed: string[]; sessions: number; lastStudyDate: string; streak: number }

const STORAGE_KEY = 'thai-expat-practice-progress'

function withIds(categoryId: string, words: Omit<Word, 'id'>[]): Word[] {
  return words.map((word, index) => ({ ...word, id: `${categoryId}-${index}` }))
}

const categories: Category[] = [
  {
    id: 'cafe', title: 'Cafe Thai', emoji: '☕', situation: 'Order coffee, sweetness, ice, and bill.', words: withIds('cafe', [
      { thai: 'ขอกาแฟเย็นครับ', roman: 'khǎaw gaa-fae yen khrap', english: 'I would like iced coffee, please.', emoji: '☕' },
      { thai: 'หวานน้อย', roman: 'wǎan nói', english: 'Less sweet.', emoji: '🍯' },
      { thai: 'ไม่ใส่น้ำตาล', roman: 'mâi sài náam-dtaan', english: 'No sugar.', emoji: '🚫' },
      { thai: 'คิดเงินครับ', roman: 'khít ngoen khrap', english: 'Bill please.', emoji: '🧾' },
    ]),
  },
  {
    id: 'market', title: 'Market Thai', emoji: '🥭', situation: 'Ask prices and buy fruit politely.', words: withIds('market', [
      { thai: 'ราคาเท่าไหร่ครับ', roman: 'raa-khaa thâo-rài khrap', english: 'How much is it?', emoji: '💰' },
      { thai: 'เอาหนึ่งกิโลครับ', roman: 'ao nèung gii-loh khrap', english: 'I will take one kilo.', emoji: '⚖️' },
      { thai: 'ลดได้นิดหน่อยไหมครับ', roman: 'lót dâai nít-nòi mái khrap', english: 'Can you discount a little?', emoji: '🤏' },
      { thai: 'ไม่เอา ขอบคุณครับ', roman: 'mâi ao, khàawp-khun khrap', english: 'I do not want it, thank you.', emoji: '🙏' },
    ]),
  },
  {
    id: 'food', title: 'Restaurant Thai', emoji: '🍜', situation: 'Order food and control spice level.', words: withIds('food', [
      { thai: 'เอาข้าวซอยครับ', roman: 'ao khaao soi khrap', english: 'I will have khao soi, please.', emoji: '🍜' },
      { thai: 'ไม่เผ็ด', roman: 'mâi phèt', english: 'Not spicy.', emoji: '🌶️' },
      { thai: 'เผ็ดนิดหน่อย', roman: 'phèt nít-nòi', english: 'A little spicy.', emoji: '🔥' },
      { thai: 'กินที่นี่ครับ', roman: 'gin thîi-nîi khrap', english: 'Eat here, please.', emoji: '🍽️' },
    ]),
  },
  {
    id: 'transport', title: 'Transport Thai', emoji: '🚗', situation: 'Talk to drivers and songthaews.', words: withIds('transport', [
      { thai: 'จอดตรงนี้ครับ', roman: 'jàwt dtrong-níi khrap', english: 'Stop here, please.', emoji: '📍' },
      { thai: 'ตรงไปครับ', roman: 'dtrong bpai khrap', english: 'Go straight, please.', emoji: '⬆️' },
      { thai: 'เลี้ยวซ้ายครับ', roman: 'líao sáai khrap', english: 'Turn left, please.', emoji: '⬅️' },
      { thai: 'เลี้ยวขวาครับ', roman: 'líao khwǎa khrap', english: 'Turn right, please.', emoji: '➡️' },
    ]),
  },
  {
    id: 'polite', title: 'Polite Basics', emoji: '🙏', situation: 'Daily kindness, slow speech, and help.', words: withIds('polite', [
      { thai: 'สวัสดีครับ', roman: 'sà-wàt-dii khrap', english: 'Hello.', emoji: '👋' },
      { thai: 'ขอบคุณครับ', roman: 'khàawp-khun khrap', english: 'Thank you.', emoji: '🙏' },
      { thai: 'พูดช้าๆ ได้ไหมครับ', roman: 'phûut cháa-cháa dâai mái khrap', english: 'Can you speak slowly?', emoji: '🐢' },
      { thai: 'ช่วยได้ไหมครับ', roman: 'chûai dâai mái khrap', english: 'Can you help?', emoji: '🛟' },
    ]),
  },
]

const allWords: Word[] = categories.flatMap((category) => category.words)

const defaultProgress: Progress = { stars: 0, completed: [], sessions: 0, lastStudyDate: '', streak: 0 }

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

const allWordIds = allWords.map((word) => word.id)
const wordById = new Map(allWords.map((word) => [word.id, word]))

export default function ThaiPracticeApp() {
  const [screen, setScreen] = useState<Screen>('home')
  const [category, setCategory] = useState(categories[0])
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [sessionStars, setSessionStars] = useState(0)
  const [lastSessionType, setLastSessionType] = useState<'category' | 'review'>('category')
  const [progress, setProgress] = useState<Progress>(defaultProgress)
  const [reviewQueue, setReviewQueue] = useState<Word[]>([])
  const [reviewRevealed, setReviewRevealed] = useState(false)
  const [reviewDoneCount, setReviewDoneCount] = useState(0)
  const [dueCount, setDueCount] = useState(0)
  const [learnedCount, setLearnedCount] = useState(0)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress({ ...defaultProgress, ...JSON.parse(raw) })
    } catch {
      setProgress(defaultProgress)
    }
  }, [])

  // Refresh due/learned counts whenever we land back on the home screen.
  useEffect(() => {
    if (screen !== 'home') return
    setDueCount(getDueIds(allWordIds).due.length)
    setLearnedCount(getLearnedCount(allWordIds))
  }, [screen])

  const questions = useMemo(() => category.words.map((word) => ({
    word,
    options: shuffle([word.english, ...shuffle(category.words.filter((item) => item.english !== word.english).map((item) => item.english)).slice(0, 3)]),
  })), [category])

  const currentCard = category.words[cardIndex]
  const currentQuestion = questions[questionIndex]
  const completionPercent = Math.round((progress.completed.length / categories.length) * 100)
  const reviewCard = reviewQueue[0]

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
    setLastSessionType('category')
    setScreen('quiz')
  }

  function startReview() {
    const { due } = getDueIds(allWordIds)
    if (due.length === 0) {
      setScreen('home')
      return
    }
    setReviewQueue(due.map((id) => wordById.get(id)).filter((word): word is Word => Boolean(word)))
    setReviewRevealed(false)
    setReviewDoneCount(0)
    setLastSessionType('review')
    setScreen('review')
  }

  /** Streak/stars/sessions update shared by category quizzes and daily review. */
  function recordSession(earnedStars: number, categoryIdToComplete?: string) {
    const today = localDateKey()
    const yesterday = localYesterdayKey()
    const alreadyCompleted = categoryIdToComplete ? progress.completed.includes(categoryIdToComplete) : true
    const nextCompleted = categoryIdToComplete && !alreadyCompleted
      ? [...progress.completed, categoryIdToComplete]
      : progress.completed
    const nextStreak = progress.lastStudyDate === today ? progress.streak : progress.lastStudyDate === yesterday ? progress.streak + 1 : 1
    saveProgress({
      stars: progress.stars + earnedStars,
      completed: nextCompleted,
      sessions: progress.sessions + 1,
      lastStudyDate: today,
      streak: nextStreak,
    })
    setSessionStars(earnedStars)
  }

  function completeSession(earnedStars: number) {
    recordSession(earnedStars, category.id)
    setScreen('complete')
  }

  function gradeReview(grade: Grade) {
    const card = reviewQueue[0]
    if (!card) return
    gradeCard(card.id, grade)
    const rest = reviewQueue.slice(1)
    const doneNow = grade === 'again' ? reviewDoneCount : reviewDoneCount + 1
    setReviewQueue(grade === 'again' ? [...rest, card] : rest)
    setReviewRevealed(false)
    setReviewDoneCount(doneNow)
    if (rest.length === 0 && grade !== 'again') {
      recordSession(Math.max(1, doneNow))
      setScreen('complete')
    }
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
      <main className="bg-paper px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[1180px]">
          <section className="grid gap-8 bg-ink px-6 py-10 text-surface md:grid-cols-[1fr_0.7fr] md:px-10 md:py-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.14em] text-honey">Daily speaking practice</p>
              <h1 className="mt-4 max-w-[14ch] font-serif text-4xl font-bold leading-[1.08] text-balance md:text-6xl">Thai practice for Chiang Mai life.</h1>
              <p className="mt-5 max-w-[48ch] leading-7 text-surface/75 text-pretty">Review practical phrases, hear the rhythm, and test what you can recall before you use it in a cafe, market, restaurant, or taxi.</p>
            </div>
            <div className="grid grid-cols-3 self-end border border-surface/15 text-center">
              <div className="rounded-none bg-surface/10 p-3"><p className="text-2xl font-bold text-honey">{progress.stars}</p><p className="text-xs font-bold">stars</p></div>
              <div className="border-x border-surface/15 bg-surface/10 p-3"><p className="text-2xl font-bold text-honey">{progress.streak}</p><p className="text-xs font-bold">streak</p></div>
              <div className="bg-surface/10 p-3"><p className="text-2xl font-bold text-honey">{completionPercent}%</p><p className="text-xs font-bold">done</p></div>
            </div>
          </section>

          <section className="mt-5 rounded-none border border-honey/50 bg-jasmine p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-none bg-surface text-3xl shadow-inner" aria-hidden="true">🧠</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-serif font-normal leading-tight">Daily review</h2>
                <p className="mt-1 text-sm leading-6 text-tamarind/65">
                  {dueCount === 0
                    ? `All caught up! ${learnedCount}/${allWordIds.length} phrases learned. Come back tomorrow.`
                    : `${dueCount} phrase${dueCount === 1 ? '' : 's'} due right now, mixed from every category - the words you're about to forget.`}
                </p>
                {dueCount > 0 && (
                  <button
                    type="button"
                    onClick={startReview}
                    className="mt-3 min-h-11 w-full rounded-none bg-ink px-3 py-2 font-bold text-surface transition duration-150 active:scale-[0.98]"
                  >
                    Start review ({dueCount})
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-3 md:grid-cols-2">
            {categories.map((item) => {
              const done = progress.completed.includes(item.id)
              return (
                  <article key={item.id} className="rounded-none border border-ink/10 bg-surface p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex size-14 shrink-0 items-center justify-center bg-sand text-3xl" aria-hidden="true">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-xl font-serif font-normal leading-tight">{item.title}</h2>
                          {done && <span className="rounded-full bg-sand/15 px-2 py-1 text-xs font-bold text-honey">Done</span>}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-tamarind/65">{item.situation}</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <button type="button" onClick={() => startFlashcards(item)} className="min-h-11 rounded-none bg-ink px-3 py-2 font-bold text-surface transition duration-150 active:scale-[0.98]">Flashcards</button>
                          <button type="button" onClick={() => startQuiz(item)} className="min-h-11 rounded-none bg-honey px-3 py-2 font-bold text-tamarind transition duration-150 active:scale-[0.98]">Quiz</button>
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
      <main className="min-h-screen bg-paper px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setScreen('home')} className="min-h-11 rounded-full bg-surface px-4 font-bold shadow-sm">←</button>
            <p className="font-bold text-clay">{cardIndex + 1} / {category.words.length}</p>
          </div>
          <button type="button" onClick={() => setFlipped((value) => !value)} className="min-h-[360px] w-full rounded-none border border-surface/70 bg-surface p-6 text-center transition duration-150 active:scale-[0.99]" aria-pressed={flipped}>
            <p className="text-6xl" aria-hidden="true">{currentCard.emoji}</p>
            {!flipped ? (
              <>
                <p className="mt-8 text-5xl font-bold leading-tight text-clay">{currentCard.thai}</p>
                <p className="mt-4 text-xl font-bold text-clay">{currentCard.roman}</p>
                <p className="mt-8 rounded-none bg-jasmine p-4 font-bold text-tamarind/70">Tap to reveal meaning</p>
              </>
            ) : (
              <>
                <p className="mt-8 text-4xl font-bold leading-tight text-clay">{currentCard.english}</p>
                <p className="mt-5 rounded-none bg-jasmine p-4 text-lg font-bold text-tamarind/70">Say it 3 times, then use it today.</p>
              </>
            )}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setFlipped(false)} className="min-h-12 rounded-none border border-tamarind/10 bg-surface font-bold text-clay">Show Thai</button>
            <button type="button" onClick={nextCard} className="min-h-12 rounded-none bg-ink font-bold text-surface">Next card →</button>
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'quiz' && currentQuestion) {
    const quizPercent = Math.round(((questionIndex + (selected ? 1 : 0)) / questions.length) * 100)
    return (
      <main className="min-h-screen bg-paper px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setScreen('home')} className="min-h-11 rounded-full bg-surface px-4 font-bold shadow-sm">←</button>
            <p className="font-bold text-clay">⭐ {score}</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={quizPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
            <div className="h-full rounded-full bg-honey transition-all duration-150" style={{ width: `${quizPercent}%` }} />
          </div>
          <section className="mt-5 rounded-none border border-surface/70 bg-surface p-6">
            <p className="text-sm font-bold text-clay">Choose the meaning</p>
            <p className="mt-5 text-center text-6xl" aria-hidden="true">{currentQuestion.word.emoji}</p>
            <h1 className="mt-5 text-center text-5xl font-bold leading-tight text-clay">{currentQuestion.word.thai}</h1>
            <p className="mt-3 text-center text-lg font-bold text-clay">{currentQuestion.word.roman}</p>
            <div className="mt-6 grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selected === option
                const isCorrect = option === currentQuestion.word.english
                return (
                  <button key={option} type="button" onClick={() => pickAnswer(option)} className={`min-h-14 rounded-none border p-4 text-left font-bold transition duration-150 ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind'}`} aria-pressed={isSelected}>
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

  if (screen === 'review') {
    if (!reviewCard) {
      // Queue was empty (nothing due) - bounce back to home rather than render blank.
      setScreen('home')
      return null
    }
    return (
      <main className="min-h-screen bg-paper px-4 py-8 text-tamarind">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setScreen('home')} className="min-h-11 rounded-full bg-surface px-4 font-bold shadow-sm">←</button>
            <p className="font-bold text-clay">{reviewQueue.length} left</p>
          </div>
          <div className="min-h-[360px] w-full rounded-none border border-surface/70 bg-surface p-6 text-center">
            <p className="text-6xl" aria-hidden="true">{reviewCard.emoji}</p>
            {!reviewRevealed ? (
              <>
                <p className="mt-8 text-5xl font-bold leading-tight text-clay">{reviewCard.thai}</p>
                <p className="mt-4 text-xl font-bold text-clay">{reviewCard.roman}</p>
                <p className="mt-8 text-tamarind/60">Say it out loud, then reveal the meaning.</p>
                <button
                  type="button"
                  onClick={() => setReviewRevealed(true)}
                  className="mt-6 min-h-12 w-full rounded-none bg-ink font-bold text-surface"
                >
                  Show answer
                </button>
              </>
            ) : (
              <>
                <p className="mt-8 text-4xl font-bold leading-tight text-clay">{reviewCard.english}</p>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  <button type="button" onClick={() => gradeReview('again')} className="min-h-12 rounded-none border-2 border-clay/40 bg-clay/10 text-sm font-bold text-clay">Again</button>
                  <button type="button" onClick={() => gradeReview('hard')} className="min-h-12 rounded-none border-2 border-honey/50 bg-honey/15 text-sm font-bold text-tamarind">Hard</button>
                  <button type="button" onClick={() => gradeReview('good')} className="min-h-12 rounded-none border-2 border-honey/50 bg-sand/12 text-sm font-bold text-honey">Good</button>
                  <button type="button" onClick={() => gradeReview('easy')} className="min-h-12 rounded-none border-2 border-clay/40 bg-ink/10 text-sm font-bold text-clay">Easy</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-paper px-4 py-8 text-tamarind">
      <section className="mx-auto max-w-[520px] rounded-none border border-surface/70 bg-surface p-6 text-center">
        <p className="text-7xl" aria-hidden="true">🏆</p>
        <p className="mt-5 text-sm font-bold text-clay">Session complete</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight">You earned {sessionStars} stars.</h1>
        <p className="mt-4 leading-7 text-tamarind/70">
          {lastSessionType === 'review'
            ? `Daily review done - ${reviewDoneCount} phrase${reviewDoneCount === 1 ? '' : 's'} reviewed across every category. Each one will resurface right before you'd forget it.`
            : `Completed: ${category.title}. Keep the streak going with another small Chiang Mai situation.`}
        </p>
        <div className="mt-6 grid gap-3">
          {lastSessionType === 'review' ? (
            <button type="button" onClick={startReview} className="min-h-12 rounded-none bg-ink font-bold text-surface">Review more</button>
          ) : (
            <button type="button" onClick={() => startQuiz(category)} className="min-h-12 rounded-none bg-ink font-bold text-surface">Replay quiz</button>
          )}
          <button type="button" onClick={() => setScreen('home')} className="min-h-12 rounded-none bg-honey font-bold text-tamarind">
            {lastSessionType === 'review' ? 'Back to categories' : 'Choose another category'}
          </button>
          <a href="https://wa.me/66929894495?text=Hi%20Mike%2C%20I%20finished%20a%20Thai%20practice%20session.%20Can%20I%20send%20a%20voice%20note%20for%20correction%3F" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-none border border-tamarind/10 bg-jasmine font-bold text-clay">Send voice note to Mike</a>
        </div>
      </section>
    </main>
  )
}
