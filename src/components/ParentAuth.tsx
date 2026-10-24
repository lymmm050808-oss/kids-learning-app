import { type FormEvent, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export function ParentAuth() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!supabase) return setMessage('云端数据库尚未连接。')
    setBusy(true)
    setMessage('')
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        })
    setBusy(false)
    if (result.error) return setMessage(result.error.message)
    if (mode === 'register' && !result.data.session) {
      setMessage('注册成功。请到邮箱中点击确认链接，然后返回这里登录。')
    } else {
      setMessage(mode === 'login' ? '登录成功。' : '注册并登录成功。')
    }
  }

  return <section className="panel parent-auth">
    <p className="eyebrow dark">仅供家长使用</p>
    <h2>{mode === 'login' ? '家长登录' : '创建家长账号'}</h2>
    <p className="auth-intro">登录后，孩子的学习记录与家长设置可以在云端安全保存。</p>
    <form onSubmit={submit}>
      <label>邮箱<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="请输入家长邮箱" /></label>
      <label>密码<input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="至少 6 位" /></label>
      <button className="primary-button" disabled={busy}>{busy ? '请稍候…' : mode === 'login' ? '登录' : '注册'}</button>
    </form>
    {message && <p className="auth-message" role="status">{message}</p>}
    <button className="text-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage('') }}>{mode === 'login' ? '还没有账号？创建一个' : '已有账号？返回登录'}</button>
  </section>
}
