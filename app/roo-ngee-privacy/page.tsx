import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Roo Ngee Publisher',
  description: 'Privacy Policy for the Roo Ngee Publisher Facebook Page management application.',
  alternates: { canonical: '/roo-ngee-privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | Roo Ngee Publisher',
    description: 'Privacy Policy for the Roo Ngee Publisher Facebook Page management application.',
    url: '/roo-ngee-privacy',
    siteName: 'Roo Ngee Publisher',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Roo Ngee Publisher',
    description: 'Privacy Policy for the Roo Ngee Publisher Facebook Page management application.',
  },
}

const whatsappHref =
  'https://wa.me/66929894495?text=' +
  encodeURIComponent('Privacy request for Roo Ngee Publisher: ')

export default function RooNgeePrivacyPolicy() {
  return (
    <main className="min-h-screen bg-jasmine px-4 py-12 text-tamarind sm:px-6 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-tamarind/10 bg-white p-6 shadow-xl shadow-tamarind/5 sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo">
          Roo Ngee Publisher
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-tamarind/60">Effective date: 11 August 2026</p>

        <div className="mt-10 space-y-9 text-base leading-8 text-tamarind/80">
          <section>
            <h2 className="text-2xl font-black text-tamarind">1. About this application</h2>
            <p className="mt-3">
              Roo Ngee Publisher is a private Page-management application used by the operator of
              the Facebook Page <strong><span lang="th">รู้งี้</span> (Roo Ngee)</strong>. It helps the operator publish
              and manage Page content through Meta&apos;s official tools. It is not offered as a
              public consumer application.
            </p>
            <p className="mt-3">
              <strong>Data controller:</strong> Pasuthun Junkong, Chiang Mai, Thailand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">2. Information we access</h2>
            <p className="mt-3">Depending on the permissions granted by Meta, the application may access:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Facebook Page identifiers, Page name, and Page access authorization;</li>
              <li>Page posts, photos, videos, captions, comments, reactions, and related engagement data;</li>
              <li>
                Basic Facebook profile and authorization details supplied by Meta, which may
                include the authorizing user&apos;s Facebook user ID, name, and profile picture;
              </li>
              <li>
                Information supplied with a privacy or deletion request, such as the requester&apos;s
                WhatsApp account or phone number, Facebook profile name, and relevant post or
                comment URLs; and
              </li>
              <li>Technical logs needed to diagnose publishing errors and protect the service.</li>
            </ul>
            <p className="mt-3">
              The application does not intentionally request Facebook passwords, payment-card
              information, or sensitive personal information from Page visitors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">3. How information is used</h2>
            <p className="mt-3">Information is used only to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>publish and manage content on the Roo Ngee Facebook Page;</li>
              <li>read, respond to, or moderate Page interactions when authorized;</li>
              <li>maintain security and troubleshoot technical problems;</li>
              <li>identify, verify, respond to, and document privacy or deletion requests; and</li>
              <li>comply with legal obligations and Meta Platform requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">4. Sharing and sale of data</h2>
            <p className="mt-3">
              We do not sell personal information. Information is not shared with advertisers or
              data brokers. It may be processed by Meta as the Facebook platform provider and by
              infrastructure providers only as needed to operate and secure the application.
              Privacy-request messages are processed through WhatsApp, a Meta service, when that
              contact method is used. Information may also be disclosed when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">5. Storage, security, and retention</h2>
            <p className="mt-3">
              Access credentials are kept in restricted server configuration and are not placed in
              public content. Information and technical logs are retained only for as long as they
              are reasonably needed for Page management, security, troubleshooting, or legal
              compliance. Access credentials are replaced or removed when authorization is revoked
              or they are no longer needed. Privacy-request messages and verification details are
              kept only while the request is handled and for a reasonable period afterward to
              document the response, then deleted or minimized unless longer retention is required
              by law or for security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">6. Your choices and data deletion</h2>
            <p className="mt-3">
              You may ask what information we hold about you, request correction or deletion, or
              object to its use. See our{' '}
              <Link href="/roo-ngee-data-deletion" className="font-bold text-indigo underline underline-offset-4">
                data-deletion instructions
              </Link>
              . Page administrators can also revoke the application&apos;s Facebook permissions in
              their Meta or Facebook settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">7. Contact</h2>
            <p className="mt-3">
              For privacy questions or requests, contact Pasuthun Junkong, the Roo Ngee operator
              in Chiang Mai, Thailand, through WhatsApp at{' '}
              <a className="font-bold text-indigo underline underline-offset-4" href={whatsappHref} target="_blank" rel="noreferrer">
                +66 92 989 4495
              </a>
              . Please write “Privacy request for Roo Ngee Publisher” and describe your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-tamarind">8. Updates</h2>
            <p className="mt-3">
              This policy may be updated when the application, applicable law, or Meta Platform
              requirements change. The effective date above will be revised when material changes
              are made.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
