'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-0 text-3xl font-bold text-tamarind text-balance md:text-4xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 border-t border-tamarind/10 pt-8 text-2xl font-bold text-indigo text-balance">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-xl font-bold text-tamarind text-balance">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="my-4 leading-8 text-tamarind/75 text-pretty">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 pl-5 text-tamarind/75 marker:text-turmeric">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-5 text-tamarind/75 marker:text-turmeric">{children}</ol>
        ),
        li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-tamarind">{children}</strong>,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-2xl border border-tamarind/10 bg-surface shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-jasmine text-tamarind">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
        td: ({ children }) => <td className="px-4 py-3 align-top text-tamarind/75">{children}</td>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 rounded-2xl border border-turmeric/40 bg-jasmine px-5 py-4 text-tamarind/85">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
