'use client'

interface VideoPlayerProps {
  title: string
  videoId?: string
  thumbnailUrl?: string
}

export default function VideoPlayer({ title, videoId, thumbnailUrl }: VideoPlayerProps) {
  if (videoId) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-ink flex flex-col items-center justify-center text-surface">
      <div className="text-6xl mb-4">🎬</div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-honey mt-2">Video coming soon, audio lesson below</p>
    </div>
  )
}
