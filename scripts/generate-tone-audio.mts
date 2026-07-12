// Build-time generator: neural TTS → public/audio/tones/*.mp3 + pitch contours.
// Usage:
//   AZURE_SPEECH_KEY=... npx tsx scripts/generate-tone-audio.mts
//   npx tsx scripts/generate-tone-audio.mts --local-only   (re-extract contours only)
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MPEGDecoder } from 'mpg123-decoder'
import { detectPitch, normalizeContour } from '../lib/pitch'
import { maleVariant, TONE_CURRICULUM } from '../data/tone-curriculum'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const AUDIO_DIR = path.join(ROOT, 'public')
const CONTOURS_PATH = path.join(ROOT, 'data', 'tone-contours.json')
const MANIFEST_PATH = path.join(ROOT, 'data', 'tone-audio-manifest.json')

const FEMALE_VOICE = 'th-TH-PremwadeeNeural'
const MALE_VOICE = 'th-TH-NiwatNeural'

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function ssmlFor(text: string, voice: string): string {
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="th-TH"><voice name="${voice}"><prosody rate="-10%">${escapeXml(text)}</prosody></voice></speak>`
}

export function contentHash(text: string, voice: string): string {
  return createHash('sha256').update(`${text}|${voice}|rate:-10%`).digest('hex').slice(0, 16)
}

async function synthesize(text: string, voice: string, key: string, region: string): Promise<Buffer> {
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
    },
    body: ssmlFor(text, voice),
  })
  if (!res.ok) throw new Error(`TTS ${res.status} for "${text}" (${voice}): ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

async function extractContour(mp3: Uint8Array): Promise<number[]> {
  const decoder = new MPEGDecoder()
  await decoder.ready
  const { channelData, sampleRate } = decoder.decode(mp3)
  decoder.free()
  return normalizeContour(detectPitch(channelData[0], sampleRate))
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T
  } catch {
    return fallback
  }
}

async function persist(contours: Record<string, number[]>, manifest: Record<string, string>): Promise<void> {
  await writeFile(CONTOURS_PATH, JSON.stringify(contours, null, 1))
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 1))
}

async function main() {
  const localOnly = process.argv.includes('--local-only')
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION ?? 'southeastasia'
  if (!localOnly && !key) throw new Error('AZURE_SPEECH_KEY is not set (or pass --local-only)')

  const contours = await readJson<Record<string, number[]>>(CONTOURS_PATH, {})
  const manifest = await readJson<Record<string, string>>(MANIFEST_PATH, {})
  await mkdir(path.join(AUDIO_DIR, 'audio', 'tones'), { recursive: true })

  // Every (audio path, voice, text) triple we need.
  const targets = TONE_CURRICULUM.flatMap((item) => {
    const t: Array<{ audio: string; voice: string; text: string }> = [{ audio: item.audio, voice: FEMALE_VOICE, text: item.thai }]
    if (item.kind === 'minimal-pair') t.push({ audio: maleVariant(item.audio), voice: MALE_VOICE, text: item.thai })
    return t
  })

  let generated = 0
  let extracted = 0
  try {
    for (const { audio, voice, text } of targets) {
      const filePath = path.join(AUDIO_DIR, audio)
      const hash = contentHash(text, voice)
      const upToDate = manifest[audio] === hash && existsSync(filePath)
      if (!localOnly && !upToDate) {
        const mp3 = await synthesize(text, voice, key as string, region)
        await writeFile(filePath, mp3)
        manifest[audio] = hash
        generated++
        console.log(`tts  ${audio}  (${text})`)
      }
      if (existsSync(filePath) && (!upToDate || localOnly || !contours[audio]?.length)) {
        contours[audio] = await extractContour(new Uint8Array(await readFile(filePath)))
        extracted++
        if (contours[audio].length === 0) console.warn(`warn: empty contour for ${audio}`)
      }
    }
  } finally {
    await persist(contours, manifest)
  }
  console.log(`done: ${generated} synthesized, ${extracted} contours extracted, ${targets.length} total files`)
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1]?.includes('generate-tone-audio')) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
