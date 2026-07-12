'use client'

import { useEffect, useRef, useState } from 'react'
import { detectPitch, normalizeContour } from '@/lib/pitch'

interface ToneRecording {
  url: string
  contour: number[]
}

/**
 * Record the learner's voice and extract a normalized pitch contour.
 * Audio never leaves the device.
 */
export function useToneRecorder() {
  const [supported, setSupported] = useState(true)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ToneRecording | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const urlRef = useRef<string | null>(null)
  const busyRef = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined')) {
      setSupported(false)
    }
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  async function analyze(blob: Blob): Promise<number[]> {
    const ctx = new AudioContext()
    try {
      const buffer = await ctx.decodeAudioData(await blob.arrayBuffer())
      const samples = buffer.getChannelData(0)
      return normalizeContour(detectPitch(samples, buffer.sampleRate))
    } catch {
      return []
    } finally {
      void ctx.close()
    }
  }

  function reset() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setResult(null)
    setError(null)
  }

  async function toggle() {
    setError(null)
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop()
      return
    }
    if (busyRef.current) return
    busyRef.current = true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        const contour = await analyze(blob)
        setResult({ url, contour })
        setRecording(false)
        stream.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      recorder.start()
      setRecording(true)
    } catch {
      setError('Microphone access was blocked. Allow the microphone in your browser to practice speaking.')
    } finally {
      busyRef.current = false
    }
  }

  return { supported, recording, error, result, toggle, reset }
}
