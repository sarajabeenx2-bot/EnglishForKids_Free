import { useProgress, LEVEL_NAMES } from '../context/ProgressContext'
import './Rewards.css'

export default function Rewards() {
  const { profile, progress, getLevelName, getLevelProgress } = useProgress()

  const printCertificate = (title: string, childName?: string) => {
    const displayName = childName || profile.name || 'Young Learner'
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`
      <html><head><title>Certificate</title>
      <style>
        body { font-family: Georgia, serif; text-align: center; padding: 60px; background: #fffef5; }
        h1 { color: #5BA85E; font-size: 2.5rem; }
        .cert { border: 8px double #FFD93D; padding: 40px; max-width: 600px; margin: 0 auto; }
        .name { font-size: 2rem; color: #2D3748; margin: 20px 0; }
      </style></head><body>
      <div class="cert">
        <h1>🌻 Certificate of Achievement</h1>
        <p>This certifies that</p>
        <div class="name">${displayName}</div>
        <p>has earned: <strong>${title}</strong></p>
        <p>EnglishForKidsFree</p>
        <p>${new Date().toLocaleDateString()}</p>
      </div>
      <script>window.print()</script></body></html>
    `)
  }

  return (
    <div className="rewards-page">
      <div className="page-header">
        <h1>⭐ Rewards & Achievements</h1>
        <p>Your stars, badges, XP, and certificates!</p>
      </div>

      <div className="rewards-stats card-grid">
        <div className="card stat-card">
          <span className="stat-emoji">⭐</span>
          <h2>{progress.stars}</h2>
          <p>Stars</p>
        </div>
        <div className="card stat-card">
          <span className="stat-emoji">✨</span>
          <h2>{progress.xp}</h2>
          <p>XP Points</p>
        </div>
        <div className="card stat-card">
          <span className="stat-emoji">🔥</span>
          <h2>{progress.streak}</h2>
          <p>Day Streak</p>
        </div>
        <div className="card stat-card">
          <span className="stat-emoji">📚</span>
          <h2>{progress.completedLessons.length}</h2>
          <p>Lessons Done</p>
        </div>
      </div>

      <div className="level-progress card">
        <h2>🗺️ {getLevelName()}</h2>
        <div className="progress-bar" style={{ margin: '1rem 0' }}>
          <div className="progress-bar-fill" style={{ width: `${getLevelProgress()}%` }} />
        </div>
        <div className="levels-list">
          {LEVEL_NAMES.slice(1).map((name, i) => (
            <div key={name} className={`level-item ${progress.level > i + 1 ? 'earned' : ''}`}>
              {progress.level > i + 1 ? '🏅' : '🔒'} Level {i + 2}: {name}
            </div>
          ))}
        </div>
      </div>

      <div className="badges-section card">
        <h2>🏅 Badges ({progress.badges.length})</h2>
        {progress.badges.length === 0 ? (
          <p className="empty-msg">Complete lessons to earn badges!</p>
        ) : (
          <div className="badges-grid">
            {progress.badges.map(b => (
              <div key={b} className="badge-item">🏅 {b}</div>
            ))}
          </div>
        )}
      </div>

      <div className="certificates-section card">
        <h2>📜 Certificates ({progress.certificates.length})</h2>
        {progress.certificates.length === 0 ? (
          <p className="empty-msg">Level up to earn certificates!</p>
        ) : (
          <div className="cert-grid">
            {progress.certificates.map(c => (
              <div key={c.id} className="cert-item">
                <span>📜</span>
                <h4>{c.title}</h4>
                <p>{new Date(c.date).toLocaleDateString()}</p>
                <button className="btn btn-outline" onClick={() => printCertificate(c.title)}>🖨️ Print</button>
              </div>
            ))}
          </div>
        )}
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => printCertificate(getLevelName())}>
          Generate Level Certificate
        </button>
      </div>
    </div>
  )
}
