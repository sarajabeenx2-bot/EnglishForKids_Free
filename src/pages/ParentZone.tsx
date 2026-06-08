import { useState } from 'react'
import { useProgress, LEVEL_NAMES } from '../context/ProgressContext'
import './ParentZone.css'

const PARENT_PIN_ANSWER = 12

export default function ParentZone() {
  const { profile, progress, resetLearningProgress, resetAll, getLevelName } = useProgress()
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('efkf_parent') === '1')
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  const handleUnlock = () => {
    if (parseInt(pinInput, 10) === PARENT_PIN_ANSWER) {
      sessionStorage.setItem('efkf_parent', '1')
      setUnlocked(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  if (!unlocked) {
    return (
      <div className="parent-page">
        <div className="page-header">
          <h1>👨‍👩‍👧 Parent Zone</h1>
          <p>This area is for parents and guardians.</p>
        </div>
        <div className="card parent-gate">
          <h2>🔒 Parents Only</h2>
          <p>Please solve this to enter: <strong>What is 7 + 5?</strong></p>
          <input
            type="number"
            className="pin-input"
            value={pinInput}
            onChange={e => setPinInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            placeholder="Your answer"
            aria-label="Parent gate answer"
          />
          {pinError && <p className="pin-error">Incorrect answer. Please try again.</p>}
          <button className="btn btn-primary" onClick={handleUnlock}>Enter Parent Zone</button>
        </div>
      </div>
    )
  }

  const recommendations = []
  if (progress.performance.reading < 50) recommendations.push('📚 Extra reading practice recommended')
  if (progress.performance.speaking < 50) recommendations.push('🗣️ More speaking exercises would help')
  if (progress.performance.vocabulary < 50) recommendations.push('📝 Try vocabulary flashcards daily')
  if (progress.performance.spelling < 50) recommendations.push('✍️ Spelling games for extra practice')
  if (recommendations.length === 0) recommendations.push('🌟 Great progress! Ready for harder lessons!')

  return (
    <div className="parent-page">
      <div className="page-header">
        <h1>👨‍👩‍👧 Parent Zone</h1>
        <p>Track your child's learning progress and achievements.</p>
      </div>

      <div className="safe-banner card">
        <span>🛡️</span>
        <div>
          <h3>Safe Kids Mode Active</h3>
          <p>No advertisements • Child-safe environment • Progress saved locally on this device</p>
        </div>
      </div>

      {profile.name && (
        <div className="child-profile card">
          <h2>👤 Learner Profile</h2>
          <div className="profile-grid">
            <div><strong>Name:</strong> {profile.name}</div>
            <div><strong>Age Group:</strong> {profile.ageGroup} years</div>
            <div><strong>Learning Buddy:</strong> {profile.buddy}</div>
            <div><strong>Current Level:</strong> {getLevelName()}</div>
          </div>
        </div>
      )}

      <div className="report-grid card-grid">
        <div className="card report-card">
          <h3>📚 Total Lessons</h3>
          <span className="report-num">{progress.completedLessons.length}</span>
        </div>
        <div className="card report-card">
          <h3>📖 Reading</h3>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress.performance.reading}%` }} /></div>
          <span>{progress.performance.reading}%</span>
        </div>
        <div className="card report-card">
          <h3>🗣️ Speaking</h3>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress.performance.speaking}%` }} /></div>
          <span>{progress.performance.speaking}%</span>
        </div>
        <div className="card report-card">
          <h3>📝 Vocabulary</h3>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress.performance.vocabulary}%` }} /></div>
          <span>{progress.performance.vocabulary}%</span>
        </div>
        <div className="card report-card">
          <h3>✍️ Spelling</h3>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress.performance.spelling}%` }} /></div>
          <span>{progress.performance.spelling}%</span>
        </div>
      </div>

      <div className="weekly-report card">
        <h2>📊 Learning Summary</h2>
        <ul>
          <li>Total lessons completed: <strong>{progress.completedLessons.length}</strong></li>
          <li>Total XP earned: <strong>{progress.xp}</strong></li>
          <li>Current daily streak: <strong>{progress.streak} days</strong></li>
          <li>Badges earned: <strong>{progress.badges.length}</strong></li>
          <li>Certificates: <strong>{progress.certificates.length}</strong></li>
        </ul>
      </div>

      <div className="monthly-report card">
        <h2>📈 Level Progress</h2>
        <div className="monthly-stats">
          <div><span className="big">{progress.xp}</span> Total XP</div>
          <div><span className="big">{progress.stars}</span> Stars</div>
          <div><span className="big">Level {progress.level}</span> {LEVEL_NAMES[progress.level]}</div>
        </div>
      </div>

      <div className="recommendations card">
        <h2>💡 Personalized Recommendations</h2>
        <ul>
          {recommendations.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div className="parent-controls card">
        <h2>⚙️ Parent Controls</h2>
        <p>Progress is saved locally on this device. No account or login required.</p>
        <div className="control-buttons">
          <button className="btn btn-outline" onClick={() => {
            if (confirm('Reset learning progress (XP, badges, lessons)? Profile will be kept.')) {
              resetLearningProgress()
            }
          }}>
            Reset Learning Progress
          </button>
          <button className="btn btn-outline danger" onClick={() => {
            const answer = prompt('Type DELETE to reset everything including profile:')
            if (answer === 'DELETE') resetAll()
          }}>
            Reset Everything
          </button>
        </div>
      </div>
    </div>
  )
}
