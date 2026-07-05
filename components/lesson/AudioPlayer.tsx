'use client'

interface AudioPlayerProps {
  src?: string
  label: string
}

export default function AudioPlayer({ src, label }: AudioPlayerProps) {
  if (src) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm shadow-tamarind/5">
        <span className="text-2xl">🎧</span>
        <div className="flex-1">
          <p className="text-sm font-semibold mb-2 text-tamarind">{label}</p>
          <audio controls className="h-9 w-full" preload="none" src={src} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-tamarind/20 bg-jasmine p-4">
      <span className="text-2xl">🎧</span>
      <div>
        <p className="text-sm font-semibold text-tamarind/70">{label}</p>
        <p className="text-xs text-tamarind/50">This practice audio is coming soon.</p>
      </div>
    </div>
  )
}
