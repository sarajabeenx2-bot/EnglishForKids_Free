import { useProgress, LEVEL_NAMES } from '../context/ProgressContext'
import './Rewards.css'

export default function Rewards() {
  const { progress, getLevelName, getLevelProgress } = useProgress()

  return (
    <div className="rewards-page">
      <div className="page-header">
        <h1>⭐ Rewards & Achievements</h1>
        <p>Your stars, badges, XP, and learning streak!</p>
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
    </div>
  )

}
