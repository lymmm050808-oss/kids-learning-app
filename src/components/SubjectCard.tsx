import type { SubjectSummary } from '../types/domain'
interface SubjectCardProps { subject: SubjectSummary; onSelect: (id: SubjectSummary['id']) => void }
export function SubjectCard({ subject, onSelect }: SubjectCardProps) {
  return <button className={`subject-card ${subject.className}`} onClick={() => onSelect(subject.id)}><span className="planet"><span>{subject.planetLabel}</span></span><strong>{subject.name}</strong><small>{subject.description}</small></button>
}
