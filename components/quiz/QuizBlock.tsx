'use client'

import { useState } from 'react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: QuizQuestion[] = [
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
    explanation: '"ไม่เป็นไร" literally means "it is nothing" — a very common Thai expression of relaxed acceptance.',
  },
]

export default function QuizBlock() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]

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
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <div className="text-5xl mb-4">{score === questions.length ? '🏆' : '📚'}</div>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-gray-600 mb-4">
          You scored <span className="font-bold text-thai-navy">{score}/{questions.length}</span>
        </p>
        {score === questions.length ? (
          <p className="text-green-600 font-semibold">Perfect score! ยอดเยี่ยม (Excellent!)</p>
        ) : (
          <p className="text-gray-500">Review the lesson and try again to reinforce your memory.</p>
        )}
        <button
          onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false) }}
          className="mt-6 px-6 py-2 bg-thai-navy text-white rounded-lg hover:bg-blue-900 transition"
        >
          Retry Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Question {current + 1} of {questions.length}</span>
        <span className="text-sm font-semibold text-thai-navy">Score: {score}</span>
      </div>
      <h3 className="text-xl font-bold mb-6">{q.question}</h3>
      <div className="grid gap-3 mb-6">
        {q.options.map((opt, idx) => {
          let cls = 'w-full text-left px-4 py-3 rounded-lg border-2 transition font-medium '
          if (selected === null) {
            cls += 'border-gray-200 hover:border-thai-gold hover:bg-yellow-50 cursor-pointer'
          } else if (idx === q.correct) {
            cls += 'border-green-500 bg-green-50 text-green-800'
          } else if (idx === selected) {
            cls += 'border-red-400 bg-red-50 text-red-700'
          } else {
            cls += 'border-gray-200 text-gray-400'
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
          <strong>Explanation:</strong> {q.explanation}
        </div>
      )}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-thai-navy text-white font-semibold rounded-lg hover:bg-blue-900 transition"
        >
          {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
