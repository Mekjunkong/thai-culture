import { describe, expect, it } from 'vitest'
import { maleVariant, TONE_CURRICULUM } from '@/data/tone-curriculum'

describe('tone curriculum', () => {
  it('has 100+ items with unique ids', () => {
    expect(TONE_CURRICULUM.length).toBeGreaterThanOrEqual(100)
    const ids = TONE_CURRICULUM.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every pairWith id resolves to a real item', () => {
    const ids = new Set(TONE_CURRICULUM.map((i) => i.id))
    for (const item of TONE_CURRICULUM) {
      for (const ref of item.pairWith ?? []) {
        expect(ids.has(ref), `${item.id} → ${ref}`).toBe(true)
      }
    }
  })

  it('tone-id and minimal-pair items always carry a tone; minimal-pair carries pairWith', () => {
    for (const item of TONE_CURRICULUM) {
      if (item.kind !== 'production') expect(item.tone, item.id).toBeDefined()
      if (item.kind === 'minimal-pair') expect(item.pairWith?.length, item.id).toBeGreaterThan(0)
    }
  })

  it('audio paths follow the /audio/tones/<id>.mp3 convention', () => {
    for (const item of TONE_CURRICULUM) {
      expect(item.audio, item.id).toBe(`/audio/tones/${item.id}.mp3`)
    }
    expect(maleVariant('/audio/tones/x.mp3')).toBe('/audio/tones/x-m.mp3')
  })

  it('each level has content', () => {
    for (const level of [1, 2, 3] as const) {
      expect(TONE_CURRICULUM.filter((i) => i.level === level).length).toBeGreaterThan(10)
    }
  })
})
