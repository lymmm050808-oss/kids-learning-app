import { useEffect, useRef, useState } from 'react'

type RecorderStatus = 'idle' | 'starting' | 'recording' | 'stopping' | 'ready'
interface Props { onUnsavedChange: (pending: boolean) => void }

function permissionMessage(error: unknown) {
  if (!(error instanceof DOMException)) return '摄像头或麦克风暂时无法启动，请检查设备后再试。'
  if (error.name === 'NotAllowedError' || error.name === 'SecurityError') return '没有获得摄像头或麦克风权限。请家长在浏览器提示中选择允许，再开始录像。'
  if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') return '没有找到可用的摄像头或麦克风。'
  if (error.name === 'NotReadableError' || error.name === 'TrackStartError') return '摄像头或麦克风可能正在被其他应用使用，请关闭后重试。'
  return '摄像头或麦克风暂时无法启动，请检查设备后再试。'
}

export function LearningRecorder({ onUnsavedChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordingUrlRef = useRef<string | null>(null)
  const recordingMimeRef = useRef('video/webm')
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null)
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [message, setMessage] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (liveStream) {
      video.srcObject = liveStream
      video.removeAttribute('src')
      void video.play().catch(() => undefined)
    } else {
      video.srcObject = null
      video.src = recordingUrl || ''
    }
  }, [liveStream, recordingUrl])

  useEffect(() => {
    if (status !== 'recording') return
    const timer = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [status])

  useEffect(() => () => {
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive') {
      recorder.ondataavailable = null
      recorder.onstop = null
      try { recorder.stop() } catch { /* The browser may already have stopped it. */ }
    }
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current)
  }, [])

  const startRecording = async () => {
    if (status === 'starting' || status === 'recording' || status === 'stopping' || recordingUrlRef.current) return
    setStatus('starting')
    setMessage('')
    setElapsedSeconds(0)
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current)
    recordingUrlRef.current = null
    setRecordingUrl(null)

    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        throw new Error('unsupported')
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      })
      streamRef.current = stream
      setLiveStream(stream)

      const formats = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4']
      const mimeType = formats.find((format) => MediaRecorder.isTypeSupported?.(format))
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onerror = () => setMessage('录像中断了，请检查摄像头后重试。')
      recorder.onstop = () => {
        const type = recorder.mimeType || chunksRef.current[0]?.type || 'video/webm'
        recordingMimeRef.current = type
        const clip = new Blob(chunksRef.current, { type })
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        recorderRef.current = null
        setLiveStream(null)
        if (clip.size > 0) {
          const url = URL.createObjectURL(clip)
          recordingUrlRef.current = url
          setRecordingUrl(url)
          setStatus('ready')
          setMessage('录像已暂存在此页面。请家长点击“下载到本机”保存。')
        } else {
          setStatus('idle')
          setMessage('这次没有录到画面，请检查摄像头后重试。')
        }
      }
      recorder.start(1000)
      setStatus('recording')
      onUnsavedChange(true)
    } catch (error) {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      recorderRef.current = null
      setLiveStream(null)
      setStatus('idle')
      setMessage(error instanceof Error && error.message === 'unsupported'
        ? '当前浏览器暂不支持录像。请使用最新版浏览器，并通过 HTTPS 或本机预览地址打开。'
        : permissionMessage(error))
    }
  }

  const stopRecording = () => {
    const recorder = recorderRef.current
    if (!recorder || recorder.state === 'inactive') return
    setStatus('stopping')
    recorder.stop()
  }

  const downloadRecording = () => {
    if (!recordingUrl || !recordingUrlRef.current) return
    const extension = recordingMimeRef.current.includes('mp4') ? 'mp4' : 'webm'
    const link = document.createElement('a')
    link.href = recordingUrl
    link.download = `幼儿启蒙_学习记录_${new Date().toISOString().slice(0, 10)}.${extension}`
    document.body.appendChild(link)
    link.click()
    link.remove()
    onUnsavedChange(false)
  }

  const discardRecording = () => {
    if (!window.confirm('确定删除这段尚未下载的录像吗？删除后无法恢复。')) return
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current)
    recordingUrlRef.current = null
    setRecordingUrl(null)
    onUnsavedChange(false)
    setMessage('')
    setStatus('idle')
    setElapsedSeconds(0)
  }

  const timeLabel = `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(elapsedSeconds % 60).padStart(2, '0')}`

  return <section className="learning-recorder" aria-label="学习过程录像">
    <div className="recorder-heading"><strong>📹 记录学习瞬间</strong>{status === 'recording' && <span className="recording-indicator"><i /> 正在录像 {timeLabel}</span>}</div>
    <p className="recorder-note">家长已开启本次录像。开始时会请求摄像头和麦克风权限；视频和声音只暂存在本页，不会上传。停止后请家长下载到本机，离开或刷新页面前未下载的片段会清除。</p>
    {(liveStream || recordingUrl) && <video ref={videoRef} className="recorder-preview" autoPlay={Boolean(liveStream)} muted={Boolean(liveStream)} playsInline controls={Boolean(recordingUrl)} aria-label="摄像头预览或刚录制的视频" />}
    <div className="recorder-actions">
      {status === 'recording' || status === 'stopping'
        ? <button className="recorder-stop" onClick={stopRecording} disabled={status === 'stopping'}>{status === 'stopping' ? '正在保存片段…' : '停止录像'}</button>
        : !recordingUrl && <button className="recorder-start" onClick={startRecording} disabled={status === 'starting'}>{status === 'starting' ? '正在打开摄像头和麦克风…' : '开始录像'}</button>}
      {recordingUrl && <><button className="recorder-save" onClick={downloadRecording}>下载到本机</button><button className="recorder-discard" onClick={discardRecording}>删除这段录像</button></>}
    </div>
    {message && <p className="recorder-message" role="status">{message}</p>}
  </section>
}
