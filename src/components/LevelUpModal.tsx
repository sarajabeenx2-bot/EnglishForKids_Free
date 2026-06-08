import { LEVEL_NAMES } from '../context/ProgressContext'
import './LevelUpModal.css'

interface Props {
  oldLevel: number
  newLevel: number
  onClose: () => void
}

export default function LevelUpModal({ oldLevel, newLevel, onClose }: Props) {
  const oldTitle = LEVEL_NAMES[oldLevel] ?? 'Beginner Explorer'
  const newTitle = LEVEL_NAMES[newLevel] ?? 'Word Adventurer'

  // Generate 50 confetti particles
  const confettiArray = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    delay: Math.random() * 2 + 's',
    duration: Math.random() * 2 + 2 + 's',
    color: ['#FF6B6B', '#FFD93D', '#7BC67E', '#6ECFFF', '#C9A0FF', '#FFB6C1'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 8 + 'px',
    rotation: Math.random() * 360 + 'deg',
  }))

  return (
    <div className="level-up-overlay">
      <div className="confetti-container">
        {confettiArray.map((p) => (
          <div
            key={p.id}
            className="confetti-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              transform: `rotate(${p.rotation})`,
            }}
          />
        ))}
      </div>

      <div className="level-up-card card">
        <div className="level-up-badge">🎉 LEVEL UP! 🎉</div>
        <h2 className="level-up-title">You are getting smarter!</h2>
        
        <div className="level-up-comparison">
          <div className="level-box old">
            <span className="lvl-num">Level {oldLevel}</span>
            <span className="lvl-name">{oldTitle}</span>
          </div>
          <span className="lvl-arrow">➔</span>
          <div className="level-box new">
            <span className="lvl-num">Level {newLevel}</span>
            <span className="lvl-name">{newTitle}</span>
          </div>
        </div>

        <p className="level-up-msg">You have unlocked new challenges and rewards! Keep exploring! 🚀</p>

        <button className="btn btn-primary btn-large btn-level-continue" onClick={onClose}>
          Continue Journey!
        </button>
      </div>
    </div>
  )
}
