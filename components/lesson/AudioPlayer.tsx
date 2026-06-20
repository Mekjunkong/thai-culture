'use client'

interface AudioPlayerProps {
  src?: string
  label: string
}

export default function AudioPlayer({ src, label }: AudioPlayerProps) {
  if (src) {
    return (
      <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow">
        <span className="text-2xl">🎧</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
          <audio controls className="w-full h-8" src={src} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-dashed border-gray-300">
      <span className="text-2xl">🎧</span>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-xs text-gray-400">Recording slot prepared — final MP3 can be added here.</p>
      </div>
    </div>
  )
}
