'use client'

import { SpeakerHighIcon } from '@phosphor-icons/react/ssr'
import { useThaiVoice, type SpeechSpeed } from '@/lib/speech'

interface SpeakButtonProps {
  text: string
  speed?: SpeechSpeed
  className?: string
  label?: string
  onSpeak?: () => void
}

/** Compact icon button that speaks a Thai phrase with free browser text-to-speech. */
export default function SpeakButton({ text, speed = 'natural', className = '', label = 'Listen', onSpeak }: SpeakButtonProps) {
  const { speak } = useThaiVoice()

  return (
    <button
      type="button"
      onClick={() => { speak(text, speed); onSpeak?.() }}
      aria-label={`${label}: ${text}`}
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border border-tamarind/15 bg-surface px-3 py-1.5 text-xs font-bold text-indigo transition duration-150 ease-out hover:border-turmeric hover:bg-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric ${className}`}
    >
      <SpeakerHighIcon className="size-4" weight="bold" aria-hidden="true" />
      {label}
    </button>
  )
}
