import { useMemo, useState } from 'react'
import { searchKnowledge } from '../services/knowledgeSearch'
import type { KnowledgeAgeGroup, KnowledgeSubject } from '../data/learningKnowledge'

const subjects: Array<{ value: KnowledgeSubject | 'all'; label: string }> = [
  { value: 'all', label: '全部科目' },
  { value: 'chinese', label: '语文' },
  { value: 'math', label: '数学' },
  { value: 'english', label: '英语' },
]
const subjectNames: Record<KnowledgeSubject, string> = { chinese: '语文', math: '数学', english: '英语' }
const quickQuestions = [
  '孩子不喜欢看书怎么办？',
  '数学怎么融入日常生活？',
  '英语启蒙从哪里开始？',
  '孩子不愿意开口说英语怎么办？',
  '怎样用积木玩分类和规律？',
]

export function KnowledgeSearch({ ageGroup }: { ageGroup: KnowledgeAgeGroup }) {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState<KnowledgeSubject | 'all'>('all')
  const results = useMemo(() => searchKnowledge(query, { subject, ageGroup, limit: 4 }), [query, subject, ageGroup])
  const hasQuery = query.trim().length > 0

  return <section className="panel knowledge-panel">
    <p className="eyebrow dark">家长专属 · 资料检索</p>
    <h2>启蒙知识库</h2>
    <p className="knowledge-intro">输入问题或关键词，查看资料库中匹配的建议和出处。优先显示适合当前年龄段的内容；这里只检索已收录资料，不会生成资料库之外的回答。</p>
    <form className="knowledge-search-form" onSubmit={(event) => event.preventDefault()}>
      <label className="sr-only" htmlFor="knowledge-query">搜索启蒙资料</label>
      <input id="knowledge-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="试试：孩子不喜欢看书怎么办？" />
      <label className="sr-only" htmlFor="knowledge-subject">筛选科目</label>
      <select id="knowledge-subject" value={subject} onChange={(event) => setSubject(event.target.value as KnowledgeSubject | 'all')}>
        {subjects.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
      </select>
    </form>
    {!hasQuery && <div className="knowledge-suggestion-area">
      <div className="knowledge-empty"><span>🔎</span><p>输入问题开始搜索，或点下面的示例试试。</p></div>
      <div className="knowledge-prompts">{quickQuestions.map((question) => <button type="button" key={question} onClick={() => setQuery(question)}>{question}</button>)}</div>
    </div>}
    {hasQuery && results.length === 0 && <div className="knowledge-suggestion-area">
      <div className="knowledge-empty"><span>🌱</span><p>暂时没有找到匹配资料。可以换个关键词，或选择“全部科目”再试试。</p></div>
      {subject !== 'all' && <button className="knowledge-clear-filter" type="button" onClick={() => setSubject('all')}>清除科目筛选</button>}
      <div className="knowledge-prompts">{quickQuestions.map((question) => <button type="button" key={question} onClick={() => setQuery(question)}>{question}</button>)}</div>
    </div>}
    {hasQuery && results.length > 0 && <div className="knowledge-results" aria-live="polite">{results.map((item) => <article className="knowledge-result" key={item.id}>
      <div className="knowledge-result-meta"><span>{subjectNames[item.subject]}</span><span>{item.ageGroup}岁</span></div>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <a href={item.sourceUrl} target="_blank" rel="noreferrer">资料出处：{item.sourceTitle} ↗</a>
    </article>)}</div>}
    <small className="knowledge-note">检索结果来自已整理的公开启蒙资料。若没有匹配内容，说明资料库暂未收录相关主题。</small>
  </section>
}
