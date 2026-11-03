import { demoMode } from '../config/demo'
import { resetLearningState } from '../services/learningStore'

export function DemoNotice() {
  if (!demoMode) return null

  const reset = () => {
    resetLearningState()
    window.location.reload()
  }

  return <aside className="demo-notice" aria-label="公开演示说明">
    <div>
      <strong>公开演示 · 虚构数据</strong>
      <span>不连接家庭云端账号；操作记录只保存在当前浏览器。录像不会上传。</span>
    </div>
    <button onClick={reset}>恢复示例进度</button>
  </aside>
}
