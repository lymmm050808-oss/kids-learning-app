import { SubjectCard } from '../components/SubjectCard'
import { subjects } from '../data/subjects'
import type { AgeGroup, DailyProgress, SubjectId } from '../types/domain'
interface HomePageProps { ageGroup: AgeGroup; daily: DailyProgress; goal: number; onSelectSubject: (subject: SubjectId) => void; onOpenParent: () => void }
export function HomePage({ ageGroup, daily, goal, onSelectSubject, onOpenParent }: HomePageProps) {
  return <section><div className="welcome-hero"><img src="/girl-astronaut.png" alt="小女孩宇航员" /><div><h2>准备出发，小小宇航员 🚀</h2><p>驾驶小飞船，探索知识星球<br />摘下属于你的小星星吧！</p></div><img src="/boy-astronaut.png" alt="小男孩宇航员" /></div><div className="age-badge">{ageGroup === '3-4' ? '🌱 3–4岁 · 启蒙探索' : '🚀 5–6岁 · 进阶挑战'}</div><div className="subject-grid">{subjects.map((subject) => <SubjectCard key={subject.id} subject={subject} onSelect={onSelectSubject} />)}</div><section className="progress-card"><div><h2>🚀 今日探索记录</h2><button onClick={onOpenParent}>家长入口</button></div><p>语文 {daily.correct.chinese}/{goal}　数学 {daily.correct.math}/{goal}　英语 {daily.correct.english}/{goal}　⏱ {Math.floor(daily.activeSeconds / 60)} 分钟</p></section></section>
}
