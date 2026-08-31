export default function LessonsLoading() {
  return (
    <main className="bg-paper px-4 py-10 text-tamarind" aria-busy="true" aria-label="Loading lessons">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-48 rounded bg-tamarind/10" />
        <div className="mt-5 h-14 max-w-xl rounded bg-tamarind/10" />
        <div className="mt-4 h-6 max-w-2xl rounded bg-tamarind/10" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((week) => (
            <div key={week} className="h-28 rounded-none border border-tamarind/10 bg-surface p-6">
              <div className="h-4 w-24 rounded bg-tamarind/10" />
              <div className="mt-4 h-6 w-3/4 rounded bg-tamarind/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
