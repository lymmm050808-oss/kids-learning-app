import { useEffect, useState } from 'react'

interface InstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

export function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(window.matchMedia('(display-mode: standalone)').matches)
  useEffect(() => {
    const ready = (event: Event) => { event.preventDefault(); setPromptEvent(event as InstallPromptEvent) }
    const done = () => { setInstalled(true); setPromptEvent(null) }
    window.addEventListener('beforeinstallprompt', ready); window.addEventListener('appinstalled', done)
    return () => { window.removeEventListener('beforeinstallprompt', ready); window.removeEventListener('appinstalled', done) }
  }, [])
  if (installed || !promptEvent) return null
  const install = async () => { await promptEvent.prompt(); const choice = await promptEvent.userChoice; if (choice.outcome === 'accepted') setPromptEvent(null) }
  return <button className="install-app-button" onClick={install}>⬇ 安装“幼儿启蒙”</button>
}
