import type { Tone } from '@/lib/pitch'

export interface ToneItem {
  id: string
  kind: 'tone-id' | 'minimal-pair' | 'production'
  thai: string
  roman: string
  gloss: string
  tone?: Tone
  audio: string
  pairWith?: string[]
  level: 1 | 2 | 3
}

export const TONE_LABELS: Record<Tone, { label: string; glyph: string; hook: string }> = {
  mid: { label: 'Mid', glyph: '→', hook: 'Flat and steady, like counting "one, two, three".' },
  low: { label: 'Low', glyph: '↘', hook: 'Starts low and relaxes down — a flat "meh".' },
  falling: { label: 'Falling', glyph: '⌢', hook: 'Up then firmly down — like a satisfied "ahh".' },
  high: { label: 'High', glyph: '↗', hook: 'Squeezed high, straining upward at the end.' },
  rising: { label: 'Rising', glyph: '⌣', hook: 'Dips then rises — like asking "yes?".' },
}

export function maleVariant(audio: string): string {
  return audio.replace(/\.mp3$/, '-m.mp3')
}

type Row = [id: string, kind: ToneItem['kind'], thai: string, roman: string, gloss: string, level: 1 | 2 | 3, tone?: Tone, pairWith?: string[]]

function items(rows: Row[]): ToneItem[] {
  return rows.map(([id, kind, thai, roman, gloss, level, tone, pairWith]) => ({
    id, kind, thai, roman, gloss, level, tone, pairWith, audio: `/audio/tones/${id}.mp3`,
  }))
}

export const TONE_CURRICULUM: ToneItem[] = items([
  // ── Level 1: Meet the tones (tone-id) ────────────────────────────────
  // khaa set — the classic five-way contrast
  ['khaa-mid', 'tone-id', 'คา', 'khaa', 'to be stuck', 1, 'mid'],
  ['khaa-low', 'tone-id', 'ข่า', 'khàa', 'galangal', 1, 'low'],
  ['khaa-falling', 'tone-id', 'ค่า', 'khâa', 'value, fee', 1, 'falling'],
  ['khaa-high', 'tone-id', 'ค้า', 'kháa', 'to trade', 1, 'high'],
  ['khaa-rising', 'tone-id', 'ขา', 'khăa', 'leg', 1, 'rising'],
  // bpaa set
  ['bpaa-mid', 'tone-id', 'ปา', 'bpaa', 'to throw', 1, 'mid'],
  ['bpaa-low', 'tone-id', 'ป่า', 'bpàa', 'forest', 1, 'low'],
  ['bpaa-falling', 'tone-id', 'ป้า', 'bpâa', 'aunt', 1, 'falling'],
  ['bpaa-high', 'tone-id', 'ป๊า', 'bpáa', 'dad (informal)', 1, 'high'],
  ['bpaa-rising', 'tone-id', 'ป๋า', 'bpăa', 'daddy (informal)', 1, 'rising'],
  // mai set
  ['mai-mid', 'tone-id', 'ไมล์', 'mai', 'mile', 1, 'mid'],
  ['mai-low', 'tone-id', 'ใหม่', 'mài', 'new', 1, 'low'],
  ['mai-falling', 'tone-id', 'ไม่', 'mâi', 'not, no', 1, 'falling'],
  ['mai-high', 'tone-id', 'ไม้', 'mái', 'wood', 1, 'high'],
  ['mai-rising', 'tone-id', 'ไหม', 'măi', 'question word', 1, 'rising'],
  // maa set (three-way)
  ['maa-mid', 'tone-id', 'มา', 'maa', 'to come', 1, 'mid'],
  ['maa-high', 'tone-id', 'ม้า', 'máa', 'horse', 1, 'high'],
  ['maa-rising', 'tone-id', 'หมา', 'măa', 'dog', 1, 'rising'],
  // suea set
  ['suea-rising', 'tone-id', 'เสือ', 'sŭea', 'tiger', 1, 'rising'],
  ['suea-low', 'tone-id', 'เสื่อ', 'sùea', 'mat', 1, 'low'],
  ['suea-falling', 'tone-id', 'เสื้อ', 'sûea', 'shirt', 1, 'falling'],
  // khao set
  ['khao-rising', 'tone-id', 'ขาว', 'khăao', 'white', 1, 'rising'],
  ['khao-low', 'tone-id', 'ข่าว', 'khàao', 'news', 1, 'low'],
  ['khao-falling', 'tone-id', 'ข้าว', 'khâao', 'rice', 1, 'falling'],
  // naa set
  ['naa-mid', 'tone-id', 'นา', 'naa', 'rice field', 1, 'mid'],
  ['naa-high', 'tone-id', 'น้า', 'náa', 'aunt/uncle (younger)', 1, 'high'],
  ['naa-falling', 'tone-id', 'หน้า', 'nâa', 'face, front', 1, 'falling'],
  // yaa set
  ['yaa-mid', 'tone-id', 'ยา', 'yaa', 'medicine', 1, 'mid'],
  ['yaa-low', 'tone-id', 'อย่า', 'yàa', "don't", 1, 'low'],
  ['yaa-falling', 'tone-id', 'ย่า', 'yâa', 'grandma (paternal)', 1, 'falling'],
  ['yaa-grass', 'tone-id', 'หญ้า', 'yâa', 'grass', 1, 'falling'],

  // ── Level 2: Train your ear (minimal pairs) ──────────────────────────
  // Tone pairs (reference level-1 items as confusables)
  ['mp-glai-near', 'minimal-pair', 'ใกล้', 'glâi', 'near', 2, 'falling', ['mp-glai-far']],
  ['mp-glai-far', 'minimal-pair', 'ไกล', 'glai', 'far', 2, 'mid', ['mp-glai-near']],
  ['mp-paa-forest', 'minimal-pair', 'ป่า', 'bpàa', 'forest', 2, 'low', ['mp-paa-aunt', 'bpaa-mid']],
  ['mp-paa-aunt', 'minimal-pair', 'ป้า', 'bpâa', 'aunt', 2, 'falling', ['mp-paa-forest', 'bpaa-mid']],
  ['mp-khao-white', 'minimal-pair', 'ขาว', 'khăao', 'white', 2, 'rising', ['mp-khao-news', 'mp-khao-rice']],
  ['mp-khao-news', 'minimal-pair', 'ข่าว', 'khàao', 'news', 2, 'low', ['mp-khao-white', 'mp-khao-rice']],
  ['mp-khao-rice', 'minimal-pair', 'ข้าว', 'khâao', 'rice', 2, 'falling', ['mp-khao-white', 'mp-khao-news']],
  ['mp-mai-not', 'minimal-pair', 'ไม่', 'mâi', 'not, no', 2, 'falling', ['mp-mai-wood', 'mai-rising']],
  ['mp-mai-wood', 'minimal-pair', 'ไม้', 'mái', 'wood', 2, 'high', ['mp-mai-not', 'mai-rising']],
  ['mp-maa-dog', 'minimal-pair', 'หมา', 'măa', 'dog', 2, 'rising', ['mp-maa-horse', 'maa-mid']],
  ['mp-maa-horse', 'minimal-pair', 'ม้า', 'máa', 'horse', 2, 'high', ['mp-maa-dog', 'maa-mid']],
  ['mp-suea-tiger', 'minimal-pair', 'เสือ', 'sŭea', 'tiger', 2, 'rising', ['mp-suea-shirt', 'suea-low']],
  ['mp-suea-shirt', 'minimal-pair', 'เสื้อ', 'sûea', 'shirt', 2, 'falling', ['mp-suea-tiger', 'suea-low']],
  ['mp-khaa-value', 'minimal-pair', 'ค่า', 'khâa', 'value, fee', 2, 'falling', ['mp-khaa-trade', 'khaa-rising']],
  ['mp-khaa-trade', 'minimal-pair', 'ค้า', 'kháa', 'to trade', 2, 'high', ['mp-khaa-value', 'khaa-rising']],
  ['mp-khao-he', 'minimal-pair', 'เขา', 'khăo', 'he, she', 2, 'rising', ['mp-khao-knee', 'mp-khao-enter']],
  ['mp-khao-knee', 'minimal-pair', 'เข่า', 'khào', 'knee', 2, 'low', ['mp-khao-he', 'mp-khao-enter']],
  // Vowel-length pairs
  ['mp-khao-enter', 'minimal-pair', 'เข้า', 'khâo', 'to enter (short vowel)', 2, 'falling', ['mp-khao-rice']],
  ['mp-gao-nine', 'minimal-pair', 'เก้า', 'gâo', 'nine (short vowel)', 2, 'falling', ['mp-gao-step']],
  ['mp-gao-step', 'minimal-pair', 'ก้าว', 'gâao', 'step (long vowel)', 2, 'falling', ['mp-gao-nine']],
  ['mp-gao-old', 'minimal-pair', 'เก่า', 'gào', 'old', 2, 'low', ['mp-gao-nine', 'mp-gao-scratch']],
  ['mp-gao-scratch', 'minimal-pair', 'เกา', 'gao', 'to scratch', 2, 'mid', ['mp-gao-old', 'mp-gao-nine']],
  ['mp-wan-day', 'minimal-pair', 'วัน', 'wan', 'day (short vowel)', 2, 'mid', ['mp-waan-sweet']],
  ['mp-waan-sweet', 'minimal-pair', 'หวาน', 'wăan', 'sweet (long vowel)', 2, 'rising', ['mp-wan-day']],
  // Aspiration / consonant pairs
  ['mp-bpaa-throw', 'minimal-pair', 'ปา', 'bpaa', 'to throw (unaspirated)', 2, 'mid', ['mp-phaa-take']],
  ['mp-phaa-take', 'minimal-pair', 'พา', 'phaa', 'to take someone (aspirated)', 2, 'mid', ['mp-bpaa-throw']],
  ['mp-dtaa-eye', 'minimal-pair', 'ตา', 'dtaa', 'eye (unaspirated)', 2, 'mid', ['mp-thaa-apply']],
  ['mp-thaa-apply', 'minimal-pair', 'ทา', 'thaa', 'to apply (aspirated)', 2, 'mid', ['mp-dtaa-eye']],
  ['mp-gai-chicken', 'minimal-pair', 'ไก่', 'gài', 'chicken (unaspirated)', 2, 'low', ['mp-khai-egg']],
  ['mp-khai-egg', 'minimal-pair', 'ไข่', 'khài', 'egg (aspirated)', 2, 'low', ['mp-gai-chicken']],
  ['mp-baa-crazy', 'minimal-pair', 'บ้า', 'bâa', 'crazy (b sound)', 2, 'falling', ['mp-bpaa-aunt2']],
  ['mp-bpaa-aunt2', 'minimal-pair', 'ป้า', 'bpâa', 'aunt (bp sound)', 2, 'falling', ['mp-baa-crazy']],
  ['mp-bpuu-crab', 'minimal-pair', 'ปู', 'bpuu', 'crab', 2, 'mid', ['mp-bpuu-grandpa']],
  ['mp-bpuu-grandpa', 'minimal-pair', 'ปู่', 'bpùu', 'grandpa (paternal)', 2, 'low', ['mp-bpuu-crab']],

  // ── Level 3: Say it right (production) ───────────────────────────────
  // Single words with clear tones first (hints available)…
  ['num-1', 'production', 'หนึ่ง', 'nùeng', 'one', 3, 'low'],
  ['num-2', 'production', 'สอง', 'sŏong', 'two', 3, 'rising'],
  ['num-3', 'production', 'สาม', 'săam', 'three', 3, 'rising'],
  ['num-4', 'production', 'สี่', 'sìi', 'four', 3, 'low'],
  ['num-5', 'production', 'ห้า', 'hâa', 'five', 3, 'falling'],
  ['num-6', 'production', 'หก', 'hòk', 'six', 3, 'low'],
  ['num-7', 'production', 'เจ็ด', 'jèt', 'seven', 3, 'low'],
  ['num-8', 'production', 'แปด', 'bpàet', 'eight', 3, 'low'],
  ['num-9', 'production', 'เก้า', 'gâo', 'nine', 3, 'falling'],
  ['num-10', 'production', 'สิบ', 'sìp', 'ten', 3, 'low'],
  ['num-20', 'production', 'ยี่สิบ', 'yîi-sìp', 'twenty', 3],
  ['num-100', 'production', 'ร้อย', 'rói', 'hundred', 3, 'high'],
  ['word-dai', 'production', 'ได้', 'dâi', 'can, okay', 3, 'falling'],
  ['word-mai-dai', 'production', 'ไม่ได้', 'mâi dâi', 'cannot', 3],
  ['word-mii-mai', 'production', 'มีไหม', 'mii măi', 'do you have…?', 3],
  ['word-mai-mii', 'production', 'ไม่มี', 'mâi mii', "there isn't / don't have", 3],
  ['word-mai-ruu', 'production', 'ไม่รู้', 'mâi rúu', "I don't know", 3],
  ['word-dii-maak', 'production', 'ดีมาก', 'dii mâak', 'very good', 3],
  // …then phrases from the four missions and daily life (overlay only, no shape hint)
  ['ph-sawatdee-krap', 'production', 'สวัสดีครับ', 'sà-wàt-dii khráp', 'hello (male speaker)', 3],
  ['ph-sawatdee-ka', 'production', 'สวัสดีค่ะ', 'sà-wàt-dii khâ', 'hello (female speaker)', 3],
  ['ph-khopkhun-krap', 'production', 'ขอบคุณครับ', 'khàawp-khun khráp', 'thank you (male)', 3],
  ['ph-khopkhun-ka', 'production', 'ขอบคุณค่ะ', 'khàawp-khun khâ', 'thank you (female)', 3],
  ['ph-mai-pen-rai', 'production', 'ไม่เป็นไร', 'mâi bpen rai', "it's okay / no worries", 3],
  ['ph-thao-rai', 'production', 'เท่าไหร่ครับ', 'thâo-rài khráp', 'how much?', 3],
  ['ph-lot-noi', 'production', 'ลดหน่อยได้ไหม', 'lót nòi dâi măi', 'can you lower the price a little?', 3],
  ['ph-phaeng-pai', 'production', 'แพงไปหน่อย', 'phaaeng bpai nòi', "that's a bit expensive", 3],
  ['ph-ao-an-nii', 'production', 'เอาอันนี้', 'ao an níi', "I'll take this one", 3],
  ['ph-mai-ao-thung', 'production', 'ไม่เอาถุงครับ', 'mâi ao thŭng khráp', 'no bag, please', 3],
  ['ph-nueng-kilo', 'production', 'หนึ่งกิโล', 'nùeng gì-loo', 'one kilo', 3],
  ['ph-gluai-nueng-luuk', 'production', 'กล้วยหนึ่งลูก', 'glûai nùeng lûuk', 'one banana', 3],
  ['ph-mamuang-nueng-kilo', 'production', 'มะม่วงหนึ่งกิโล', 'má-mûang nùeng gì-loo', 'one kilo of mangoes', 3],
  ['ph-saam-sip-haa-baht', 'production', 'สามสิบห้าบาท', 'săam-sìp-hâa bàat', 'thirty-five baht', 3],
  ['ph-gaafae-yen', 'production', 'กาแฟเย็น', 'gaa-faae yen', 'iced coffee', 3],
  ['ph-latte-ron', 'production', 'ลาเต้ร้อน', 'laa-dtêe ráawn', 'hot latte', 3],
  ['ph-waan-noi', 'production', 'หวานน้อย', 'wăan nói', 'less sweet', 3],
  ['ph-mai-waan', 'production', 'ไม่หวาน', 'mâi wăan', 'no sugar', 3],
  ['ph-gaew-yai', 'production', 'แก้วใหญ่', 'gâaeo yài', 'large cup', 3],
  ['ph-phet-nit-noi', 'production', 'เผ็ดนิดหน่อย', 'phèt nít nòi', 'a little spicy', 3],
  ['ph-mai-phet', 'production', 'ไม่เผ็ด', 'mâi phèt', 'not spicy', 3],
  ['ph-phet-pokati', 'production', 'เผ็ดปกติ', 'phèt bpòk-gà-dtì', 'normal spicy', 3],
  ['ph-aroi-maak', 'production', 'อร่อยมาก', 'à-ròi mâak', 'delicious!', 3],
  ['ph-khao-soi', 'production', 'ข้าวซอยหนึ่งชาม', 'khâao-soi nùeng chaam', 'one bowl of khao soi', 3],
  ['ph-kho-nam-plao', 'production', 'ขอน้ำเปล่า', 'khăaw náam bplàao', 'water, please', 3],
  ['ph-check-bin', 'production', 'เช็คบิลครับ', 'chék bin khráp', 'the bill, please', 3],
  ['ph-hong-nam-yuu-nai', 'production', 'ห้องน้ำอยู่ไหน', 'hâawng-náam yùu năi', 'where is the restroom?', 3],
  ['ph-jot-naa-seven', 'production', 'จอดหน้าเซเว่น', 'jàawt nâa see-wên', 'stop in front of the 7-Eleven', 3],
  ['ph-jot-trong-nii', 'production', 'จอดตรงนี้', 'jàawt dtrong níi', 'stop right here', 3],
  ['ph-trong-pai', 'production', 'ตรงไป', 'dtrong bpai', 'go straight', 3],
  ['ph-liao-sai', 'production', 'เลี้ยวซ้าย', 'líao sáai', 'turn left', 3],
  ['ph-liao-khwa', 'production', 'เลี้ยวขวา', 'líao khwăa', 'turn right', 3],
  ['ph-thueng-laeo', 'production', 'ถึงแล้ว', 'thŭeng láaeo', "we've arrived", 3],
  ['ph-pai-nai', 'production', 'ไปไหน', 'bpai năi', 'where are you going?', 3],
  ['ph-hiu-khao', 'production', 'หิวข้าว', 'hĭu khâao', "I'm hungry", 3],
  ['ph-ron-maak', 'production', 'ร้อนมาก', 'ráawn mâak', "it's very hot", 3],
])
