import { worksheets } from '../data/content'
import { printWorksheet } from '../utils/worksheetPrint'
import './Worksheets.css'

const WORKSHEET_EMOJI: Record<string, string> = {
  'ws-alpha': '🔤',
  'ws-alpha2': '🔤',
  'ws-trace': '✏️',
  'ws-vocab': '🐾',
  'ws-read': '📖',
  'ws-grammar': '📝',
  'ws-spell': '✍️',
  'ws-color': '🎨',
}

export default function Worksheets() {
  const categories = [...new Set(worksheets.map(w => w.category))]

  return (
    <div className="worksheets-page">
      <div className="page-header">
        <h1>📄 Worksheet Library</h1>
        <p>Beautiful printable worksheets with tracing, diagrams, and fun activities!</p>
      </div>

      {categories.map(cat => (
        <section key={cat} className="worksheet-category">
          <h2 className="section-title">{cat}</h2>
          <div className="card-grid">
            {worksheets.filter(w => w.category === cat).map(ws => (
              <div key={ws.id} className="card worksheet-card">
                <span className="ws-emoji">{WORKSHEET_EMOJI[ws.id] ?? '📄'}</span>
                <h3>{ws.title}</h3>
                <p>{ws.content}</p>
                <ul className="ws-features">
                  {ws.id.includes('alpha') || ws.id === 'ws-trace' ? <li>✏️ Letter & word tracing</li> : null}
                  {ws.id === 'ws-vocab' || ws.id === 'ws-color' ? <li>🎨 Pictures to color</li> : null}
                  {ws.id === 'ws-read' ? <li>📖 Reading & questions</li> : null}
                  {ws.id === 'ws-grammar' ? <li>📝 Grammar exercises</li> : null}
                  {ws.id === 'ws-spell' ? <li>✍️ Spelling blanks</li> : null}
                </ul>
                <button className="btn btn-primary" onClick={() => printWorksheet(ws.id, ws.title, ws.content)}>
                  🖨️ Print Worksheet
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
