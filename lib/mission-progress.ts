export type MissionProgressStorage = Storage

function getStorage(storage?: MissionProgressStorage) {
  return storage ?? (typeof window === 'undefined' ? undefined : window.localStorage)
}

export function readMissionProgress<T extends Record<string, unknown>>(
  stateKey: string,
  defaults: T,
  legacyCompleteKey: string,
  storage?: MissionProgressStorage,
): T {
  const target = getStorage(storage)
  if (!target) return defaults

  try {
    const saved = JSON.parse(target.getItem(stateKey) ?? 'null') as unknown
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      return { ...defaults, ...(saved as Partial<T>) }
    }

    // Keep the old completion marker readable while newer visits use the full checklist state.
    if (target.getItem(legacyCompleteKey) === 'true' && 'completed' in defaults) {
      return { ...defaults, completed: true } as T
    }
  } catch {
    // Corrupt or unavailable local storage leaves the learner at the defaults.
  }

  return defaults
}

export function writeMissionProgress<T extends Record<string, unknown>>(
  stateKey: string,
  state: T,
  storage?: MissionProgressStorage,
  legacyCompleteKey?: string,
) {
  const target = getStorage(storage)
  if (!target) return

  try {
    target.setItem(stateKey, JSON.stringify(state))
    if (legacyCompleteKey && state.completed === true) target.setItem(legacyCompleteKey, 'true')
  } catch {
    // A blocked or full local storage should not interrupt mission practice.
  }
}
