interface AppHeaderProps { stars: number; demo?: boolean }
export function AppHeader({ stars, demo = false }: AppHeaderProps) {
  return <header className="topbar"><div><p className="eyebrow">{demo ? '知识宇宙 · 作品集演示' : '知识宇宙 · 正式软件工程'}</p><h1>幼儿启蒙</h1></div><div className="star-box" aria-label={`获得 ${stars} 颗星`}><span aria-hidden="true">⭐</span><strong>{stars}</strong></div></header>
}
