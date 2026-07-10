'use client'

import { useEffect, useState } from 'react'

/** Picks the best-sounding installed Thai voice, preferring known good engines. */
export function chooseBestThaiVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const thaiVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('th'))
  if (thaiVoices.length === 0) return null

  const preferredNames = ['google', 'microsoft', 'premwadee', 'kanya', 'narisa', 'thai']
  return [...thaiVoices].sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => preferredNames.reduce(
      (total, keyword, index) => total + (voice.name.toLowerCase().includes(keyword) ? 20 - index : 0),
      voice.localService ? 3 : 0,
    )
    return score(b) - score(a)
  })[0]
}

export type SpeechSpeed = 'slow' | 'natural'

/**
 * Free browser text-to-speech for Thai phrases. Shared across the practice
 * app, quizzes, and missions so there is one voice-selection implementation.
 */
export function useThaiVoice() {
  const [voiceName, setVoiceName] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setReady(true)
      return
    }

    const loadVoices = () => {
      const voice = chooseBestThaiVoice(window.speechSynthesis.getVoices())
      setVoiceName(voice?.name ?? null)
      setReady(true)
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  function speak(text: string, speed: SpeechSpeed = 'natural') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const selectedVoice = chooseBestThaiVoice(window.speechSynthesis.getVoices())

    if (!selectedVoice) {
      setMessage('This browser has no Thai voice installed. Read the phrase out loud yourself, then send a voice note for real correction.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = selectedVoice
    utterance.lang = selectedVoice.lang || 'th-TH'
    utterance.rate = speed === 'slow' ? 0.68 : 0.88
    utterance.pitch = 0.96
    window.speechSynthesis.speak(utterance)
    setVoiceName(selectedVoice.name)
    setMessage(`Computer voice: ${selectedVoice.name}. Still practice out loud yourself, this is just a pronunciation guide.`)
  }

  return { ready, voiceName, message, speak }
}
