'use client'

import { useState } from 'react'
import RecordCompare from '@/components/lesson/RecordCompare'

interface AudioPlayerProps {
  src?: string
  label: string
}

export default function AudioPlayer({ src, label }: AudioPlayerProps) {
  const [showPractice, setShowPractice] = useState(false)

  if (src) {
    return (
      <div className="rounded-none border border-tamarind/10 bg-surface p-4 shadow-sm shadow-tamarind/5">
        <div className="flex items-center gap-4">
          <span className="text-2xl" aria-hidden="true">🎧</span>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm font-semibold text-tamarind">{label}</p>
            <audio controls className="h-9 w-full" preload="none" src={src} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowPractice((value) => !value)}
          className="mt-3 text-sm font-semibold text-clay underline-offset-2 hover:underline"
        >
          {showPractice ? 'Hide tone practice' : '🎙 Practice speaking this (record & compare)'}
        </button>
        {showPractice && <RecordCompare nativeSrc={src} />}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-none border border-dashed border-tamarind/20 bg-jasmine p-4">
      <span className="text-2xl">🎧</span>
      <div>
        <p className="text-sm font-semibold text-tamarind/70">{label}</p>
        <p className="text-xs text-tamarind/50">This practice audio is coming soon.</p>
      </div>
    </div>
  )
}
