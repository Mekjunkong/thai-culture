'use client'

import { useState } from 'react'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you say "Hello" in Thai?',
    options: ['ขอบคุณ', 'สวัสดี', 'ขอโทษ', 'สบายดี'],
    correct: 1,
    explanation: 'สวัสดี (sawasdee) is the standard Thai greeting.',
  },
  {
    id: 2,
    question: 'Which politeness particle is used by male speakers?',
    options: ['ค่ะ', 'คะ', 'ครับ', 'นะ'],
    correct: 2,
    explanation: 'ครับ (khrap) is the male politeness particle. Women use ค่ะ (kha) for statements and คะ (kha, falling tone) for questions.',
  },
  {
    id: 3,
    question: 'What does "ไม่เป็นไร" (mai pen rai) mean?',
    options: ['I am fine', 'No worries / Never mind', 'Excuse me', 'Good morning'],
    correct: 1,
    explanation: '"ไม่เป็นไร" literally means "it is nothing", a very common Thai expression of relaxed acceptance.',
  },
]

interface QuizBlockProps {
  questions?: QuizQuestion[]
}

export default function QuizBlock({ questions = defaultQuestions }: QuizBlockProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]

  function resetQuiz() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  function handleSelect(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore((s) => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <div className="mb-4 text-5xl" aria-hidden="true">{score === questions.length ? '🏆' : '📚'}</div>
        <h3 className="mb-2 text-2xl font-bold text-slate-950 text-balance">Quiz complete!</h3>
        <p className="mb-4 text-slate-600">
          You scored <span className="font-bold text-thai-navy tabular-nums">{score}/{questions.length}</span>
        </p>
        {score === questions.length ? (
          <p className="font-semibold text-green-700">Perfect score! ยอดเยี่ยม (Excellent!)</p>
        ) : (
          <p className="text-slate-500 text-pretty">Review the lesson and try again to reinforce your memory.</p>
        )}
        <button
          type="button"
          onClick={resetQuiz}
          className="mt-6 rounded-lg bg-thai-navy px-6 py-2 font-semibold text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold"
        >
          Retry quiz
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-500">Question <span className="tabular-nums">{current + 1}</span> of <span className="tabular-nums">{questions.length}</span></span>
        <span className="text-sm font-semibold text-thai-navy">Score: <span className="tabular-nums">{score}</span></span>
      </div>
      <h3 className="mb-6 text-xl font-bold text-slate-950 text-balance">{q.question}</h3>
      <div className="mb-6 grid gap-3">
        {q.options.map((opt, idx) => {
          let cls = 'w-full rounded-lg border-2 px-4 py-3 text-left font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold '
          if (selected === null) {
            cls += 'cursor-pointer border-slate-200 hover:border-thai-gold hover:bg-yellow-50'
          } else if (idx === q.correct) {
            cls += 'border-green-600 bg-green-50 text-green-900'
          } else if (idx === selected) {
            cls += 'border-red-500 bg-red-50 text-red-800'
          } else {
            cls += 'border-slate-200 text-slate-400'
          }
          return (
            <button key={`${q.id}-${opt}`} type="button" className={cls} onClick={() => handleSelect(idx)}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm leading-6 text-blue-900" role="status">
          <strong>Explanation:</strong> {q.explanation}
        </div>
      )}
      {selected !== null && (
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-lg bg-thai-navy py-3 font-semibold text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold"
        >
          {current + 1 >= questions.length ? 'See results' : 'Next question →'}
        </button>
      )}
    </div>
  )
}
