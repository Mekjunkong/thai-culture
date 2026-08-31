import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

function cleanEnv(value: string | undefined) {
  const trimmed = value?.trim() ?? ''
  return trimmed === '""' || trimmed === "''" ? '' : trimmed
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.toLowerCase().includes('your_project_ref') &&
  supabaseUrl.includes('.supabase.co')
)

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

/** Verify a bearer access token with Supabase; never trust a caller-supplied user id. */
export async function getAuthenticatedUser(accessToken: string) {
  if (!isSupabaseConfigured) throw new Error('Supabase auth is not configured')
  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { data, error } = await client.auth.getUser(accessToken)
  if (error || !data.user) return null
  return data.user
}

export function createAdminClient() {
  const url = supabaseUrl
  const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
