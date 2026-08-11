import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | Roo Ngee Publisher',
  description: 'How to request deletion of data associated with Roo Ngee Publisher.',
  alternates: { canonical: '/roo-ngee-data-deletion' },
  robots: { index: true, follow: true },
}

const requestText = 'Data deletion request for Roo Ngee Publisher: '
const whatsappHref = 'https://wa.me/66929894495?text=' + encodeURIComponent(requestText)

export default function RooNgeeDataDeletion() {
  return (
    <main className="min-h-screen bg-jasmine px-4 py-12 text-tamarind sm:px-6 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-tamarind/10 bg-white p-6 shadow-xl shadow-tamarind/5 sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo">
          Roo Ngee Publisher
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
          Data Deletion Instructions
        </h1>
        <p className="mt-4 text-sm text-tamarind/60">Last updated: 11 August 2026</p>

        <div className="mt-10 space-y-8 text-base leading-8 text-tamarind/80">
          <section>
            <h2 className="text-2xl font-black text-tamarind">How to request deletion</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-6">
              <li>
                Send a WhatsApp message to{' '}
                <a className="font-bold text-indigo underline underline-offset-4" href={whatsappHref} target="_blank" rel="noreferrer">
                  +66 92 989 4495
                </a>
                .
              </li>
              <li>Start the message with: <strong>Data deletion request for Roo Ngee Publisher</strong>.</li>
              <li>
                Include enough information to locate the relevant record, such as your Facebook
                profile name and the URL of the Page post, comment, or interaction concerned. Do
                not send your Facebook password, access token, or payment information.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">What happens next</h2>
            <p className="mt-3">
              We will acknowledge the request and may ask for reasonable verification to prevent
              unauthorized deletion. Data controlled by Roo Ngee Publisher will be deleted or
              anonymized as soon as reasonably practical, normally within 30 days, unless retention
              is required for security, fraud prevention, legal compliance, or another lawful reason.
            </p>
            <p className="mt-3">
              Content held directly by Facebook is also subject to Meta&apos;s own privacy and deletion
              controls. Removing information from Roo Ngee Publisher does not necessarily remove
              the original Facebook post or information retained by Meta.
            </p>
          </section>

          <p>
            Read the full{' '}
            <Link href="/roo-ngee-privacy" className="font-bold text-indigo underline underline-offset-4">
              Roo Ngee Publisher Privacy Policy
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  )
}
