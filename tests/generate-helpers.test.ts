import { describe, expect, it } from 'vitest'
import { contentHash, ssmlFor } from '../scripts/generate-tone-audio.mts'

describe('generation helpers', () => {
  it('builds SSML with the voice and escaped text', () => {
    const ssml = ssmlFor('ข้าว & ไข่', 'th-TH-PremwadeeNeural')
    expect(ssml).toContain('th-TH-PremwadeeNeural')
    expect(ssml).toContain('ข้าว &amp; ไข่')
    expect(ssml).toContain('xml:lang="th-TH"')
  })

  it('hash changes when text or voice changes', () => {
    const a = contentHash('ข้าว', 'th-TH-PremwadeeNeural')
    expect(contentHash('ข้าว', 'th-TH-PremwadeeNeural')).toBe(a)
    expect(contentHash('ไข่', 'th-TH-PremwadeeNeural')).not.toBe(a)
    expect(contentHash('ข้าว', 'th-TH-NiwatNeural')).not.toBe(a)
  })
})
