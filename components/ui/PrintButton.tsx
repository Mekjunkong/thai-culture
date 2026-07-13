'use client'

interface PrintButtonProps {
  children?: React.ReactNode
  className?: string
}

export default function PrintButton({ children = 'Print', className }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? 'inline-flex min-h-11 items-center rounded-xl bg-ink px-4 py-2 font-black text-surface'}
    >
      {children}
    </button>
  )
}
