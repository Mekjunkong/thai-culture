'use client'

interface CheckoutButtonProps {
  children?: React.ReactNode
  className?: string
}

const whatsappNumber = '66929894495'
const checkoutMessage = encodeURIComponent(
  'Hi, I want to learn Thai. Can I book a trial lesson or Starter Pack for Thai Lessons Chiang Mai?'
)

export default function CheckoutButton({ children, className }: CheckoutButtonProps) {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${checkoutMessage}`}
      target="_blank"
      rel="noreferrer"
      className={className ?? 'inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 font-bold text-tamarind transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface'}
    >
      {children ?? 'Get lifetime access'}
    </a>
  )
}
