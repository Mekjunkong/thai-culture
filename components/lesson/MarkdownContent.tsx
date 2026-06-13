'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-0 text-3xl font-bold text-slate-950 text-balance md:text-4xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 border-t border-slate-200 pt-8 text-2xl font-bold text-thai-navy text-balance">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-xl font-bold text-slate-900 text-balance">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="my-4 leading-8 text-slate-700 text-pretty">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 pl-5 text-slate-700 marker:text-thai-gold">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-5 text-slate-700 marker:text-thai-gold">{children}</ol>
        ),
        li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-thai-cream text-slate-900">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
        td: ({ children }) => <td className="px-4 py-3 align-top text-slate-700">{children}</td>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 rounded-2xl border-l-4 border-thai-gold bg-thai-cream px-5 py-4 text-slate-800">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
