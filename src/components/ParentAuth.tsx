import { type FormEvent, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export function ParentAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!supabase) return setMessage('云端数据库尚未连接。')
    setBusy(true)
    setMessage('')
    const result = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (result.error) return setMessage(result.error.message)
    setMessage('登录成功。')
  }

  return <section className="panel parent-auth">
    <p className="eyebrow dark">仅供家长使用</p>
    <h2>家长登录</h2>
    <p className="auth-intro">请使用已注册的家长账号登录。登录后，孩子就可以进入知识星球；学习记录与家长设置会安全保存在云端。</p>
    <form onSubmit={submit}>
      <label>邮箱<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="请输入家长邮箱" /></label>
      <label>密码<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="请输入家长账号密码" /></label>
      <button className="primary-button" disabled={busy}>{busy ? '请稍候…' : '登录'}</button>
    </form>
    {message && <p className="auth-message" role="status">{message}</p>}
  </section>
}
