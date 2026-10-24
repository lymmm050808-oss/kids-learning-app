import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabasePublishableKey &&
  !supabasePublishableKey.includes('请在这里粘贴'),
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null

export async function checkSupabaseConnection() {
  if (!supabase) {
    return { ok: false, message: '尚未填写 Supabase Publishable key' }
  }

  const { error } = await supabase.from('profiles').select('user_id').limit(1)
  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: 'Supabase 已连接' }
}
