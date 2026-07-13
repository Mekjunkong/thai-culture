'use client'

import { useEffect, useState } from 'react'

/**
 * Picks the best-sounding installed Thai voice. Cloud-backed "online/natural/
 * neural" engines (Microsoft Premwadee Online (Natural), Google's network
 * voice) sound far less robotic than the on-device compact voices most OSes
 * ship by default, so those keywords are weighted well above a generic brand
 * match, and on-device voices lose a small tie-break bonus rather than gain one.
 */
export function chooseBestThaiVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const thaiVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('th'))
  if (thaiVoices.length === 0) return null

  const qualityKeywords = ['natural', 'online', 'neural', 'wavenet']
  const brandKeywords = ['google', 'microsoft']
  return [...thaiVoices].sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => {
      const name = voice.name.toLowerCase()
      const qualityScore = qualityKeywords.reduce((total, keyword) => total + (name.includes(keyword) ? 30 : 0), 0)
      const brandScore = brandKeywords.reduce((total, keyword) => total + (name.includes(keyword) ? 10 : 0), 0)
      const localPenalty = voice.localService ? 0 : 5
      return qualityScore + brandScore + localPenalty
    }
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
    // Values close to the engine's own default (rate/pitch = 1) sound least
    // robotic; slowing down or detuning pitch too far exaggerates the
    // artificial quality instead of improving clarity.
    utterance.rate = speed === 'slow' ? 0.78 : 0.97
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
    setVoiceName(selectedVoice.name)
    setMessage(`Computer voice: ${selectedVoice.name}. Still practice out loud yourself, this is just a pronunciation guide.`)
  }

  return { ready, voiceName, message, speak }
}
