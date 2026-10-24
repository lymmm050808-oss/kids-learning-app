import type { LearningInsight } from '../services/answerTrackingService'

const subjectNames = { chinese: '语文', math: '数学', english: '英语' }

export function LearningInsights({ items }: { items: LearningInsight[] }) {
  const subjectRows = (Object.keys(subjectNames) as Array<keyof typeof subjectNames>).map((subject) => {
    const rows = items.filter((item) => item.subject === subject)
    const attempts = rows.reduce((sum, item) => sum + item.attempts, 0)
    const wrong = rows.reduce((sum, item) => sum + item.wrongCount, 0)
    return { subject, attempts, accuracy: attempts ? Math.round((attempts - wrong) / attempts * 100) : null }
  })
  const weakItems = items.filter((item) => item.wrongCount > 0).slice(0, 5)

  return <section className="panel insights-panel">
    <p className="eyebrow dark">根据云端答题明细生成</p>
    <h2>学习分析</h2>
    <div className="insight-subjects">{subjectRows.map((row) => <div key={row.subject}><strong>{subjectNames[row.subject]}</strong><span>{row.attempts} 次练习</span><b>{row.accuracy === null ? '尚无记录' : `正确率 ${row.accuracy}%`}</b></div>)}</div>
    <div className="weak-list"><h3>建议复习</h3>{weakItems.length === 0 ? <p>目前还没有错题记录，继续探索吧！</p> : weakItems.map((item) => <article key={`${item.subject}-${item.prompt}-${item.questionText}`}><span>{subjectNames[item.subject]}</span><div><strong>{item.prompt} · {item.questionText}</strong><small>练习 {item.attempts} 次，答错 {item.wrongCount} 次，正确率 {item.accuracy}%</small></div></article>)}</div>
  </section>
}
