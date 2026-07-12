'use client'

import { useEffect, useRef } from 'react'

interface PitchCanvasProps {
  native: number[]
  learner?: number[] | null
  /** 0–1: how much of the native curve to reveal (playback animation). */
  progress?: number
}

const RANGE_SEMITONES = 6 // curve is clamped to ±6 st around the median

function drawCurve(ctx: CanvasRenderingContext2D, curve: number[], w: number, h: number, upTo: number, color: string, width: number) {
  const clampedUpTo = Math.min(1, Math.max(0, upTo))
  const n = Math.max(2, Math.floor(curve.length * clampedUpTo))
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const x = (i / (curve.length - 1)) * (w - 16) + 8
    const clamped = Math.max(-RANGE_SEMITONES, Math.min(RANGE_SEMITONES, curve[i]))
    const y = h / 2 - (clamped / RANGE_SEMITONES) * (h / 2 - 10)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

/** Overlays the learner's pitch curve on the native speaker's. Pure display. */
export default function PitchCanvas({ native, learner = null, progress = 1 }: PitchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)
    // midline
    ctx.strokeStyle = 'rgba(60,47,47,0.12)'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(8, h / 2)
    ctx.lineTo(w - 8, h / 2)
    ctx.stroke()
    ctx.setLineDash([])
    // Resolved sRGB values of the indigo/temple Tailwind tokens from tailwind.config.ts — must track tailwind.config.ts
    if (native.length > 1) drawCurve(ctx, native, w, h, progress, '#151655', 3.5) // indigo (oklch(25% 0.11 274)) — teacher
    if (learner && learner.length > 1) drawCurve(ctx, learner, w, h, 1, '#c13522', 2.5) // temple (oklch(54% 0.18 31)) — you
  }, [native, learner, progress])

  return (
    <div className="rounded-xl border border-tamarind/10 bg-surface p-2">
      <canvas ref={canvasRef} className="h-28 w-full" aria-label="Pitch curve comparison" />
      <div className="flex gap-4 px-1 text-[11px] font-semibold text-tamarind/60">
        <span><span className="mr-1 inline-block h-1 w-4 rounded bg-indigo align-middle" />Teacher</span>
        {learner && learner.length > 1 && <span><span className="mr-1 inline-block h-1 w-4 rounded bg-temple align-middle" />You</span>}
      </div>
    </div>
  )
}
