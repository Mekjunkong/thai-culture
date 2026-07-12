'use client'

import { useEffect, useRef, useState } from 'react'
import { detectPitch, normalizeContour } from '@/lib/pitch'
import { getContour } from '@/lib/toneContours'
import PitchCanvas from '@/components/tones/PitchCanvas'

/**
 * Listen → record → compare: play the native audio, record yourself, then A/B
 * compare the rise and fall of your tones against the teacher's. Uses the
 * MediaRecorder API - recording never leaves the device.
 */
export default function RecordCompare({ nativeSrc }: { nativeSrc: string }) {
  const [supported, setSupported] = useState(true)
  const [recording, setRecording] = useState(false)
  const [myAudioUrl, setMyAudioUrl] = useState<string | null>(null)
  const [myContour, setMyContour] = useState<number[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const myAudioUrlRef = useRef<string | null>(null)
  const nativeContour = getContour(nativeSrc)

  useEffect(() => {
    if (typeof window !== 'undefined' && (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined')) {
      setSupported(false)
    }
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (myAudioUrlRef.current) URL.revokeObjectURL(myAudioUrlRef.current)
    }
  }, [])

  async function toggleRecording() {
    setError(null)
    if (recording) {
      recorderRef.current?.stop()
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        if (myAudioUrlRef.current) URL.revokeObjectURL(myAudioUrlRef.current)
        const url = URL.createObjectURL(blob)
        myAudioUrlRef.current = url
        setMyAudioUrl(url)
        setRecording(false)
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        void (async () => {
          const ctx = new AudioContext()
          try {
            const buffer = await ctx.decodeAudioData(await blob.arrayBuffer())
            setMyContour(normalizeContour(detectPitch(buffer.getChannelData(0), buffer.sampleRate)))
          } catch {
            setMyContour(null)
          } finally {
            void ctx.close()
          }
        })()
      }
      recorder.start()
      setRecording(true)
    } catch {
      setError('Microphone access was blocked. Allow the microphone in your browser to record yourself.')
    }
  }

  if (!supported) return null

  return (
    <div className="mt-3 rounded-xl border border-tamarind/10 bg-jasmine p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/60">
        🎙 Tone practice: listen → record → compare
      </p>
      {!myAudioUrl && (
        <p className="mt-1 text-xs text-tamarind/50">
          Your browser will ask for microphone access so you can hear your own voice. Nothing is uploaded - the recording stays on this device.
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleRecording}
          className={`min-h-11 rounded-2xl px-4 py-2 text-sm font-bold transition ${
            recording
              ? 'animate-pulse bg-temple text-surface'
              : 'bg-indigo text-surface hover:bg-indigo-soft'
          }`}
        >
          {recording ? '■ Stop recording' : myAudioUrl ? '🎙 Record again' : '🎙 Record yourself'}
        </button>
        {myAudioUrl && (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="text-xs font-semibold text-tamarind/60">You:</span>
            <audio controls src={myAudioUrl} className="h-9 min-w-0 flex-1" />
          </div>
        )}
      </div>
      {nativeContour && myAudioUrl && (
        <div className="mt-3">
          <PitchCanvas native={nativeContour} learner={myContour} />
        </div>
      )}
      {myAudioUrl && (
        <p className="mt-2 text-xs text-tamarind/60">
          Sounding different from the teacher at first is completely normal - that&apos;s exactly what practice is for. Play the teacher audio above, then your recording. Compare the <strong>rise and fall</strong> of each word - matching the melody matters more than speed. Happy with it? Send it to Mike on WhatsApp for real feedback.
        </p>
      )}
      {error && <p className="mt-2 text-xs text-temple">{error}</p>}
      <span className="sr-only">Recording stays on your device and is never uploaded to a server.</span>
    </div>
  )
}
