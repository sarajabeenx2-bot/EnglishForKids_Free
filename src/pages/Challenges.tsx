import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dailyChallenges, seasonalEvents } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import { getDailyChallengeIndex } from '../utils/dateHelpers'
import RewardModal from '../components/RewardModal'
import './Challenges.css'

export default function Challenges() {
  const { progress, completeDailyChallenge } = useProgress()
  const [showReward, setShowReward] = useState(false)
  const today = new Date().toDateString()
  const dailyChallenge = dailyChallenges[getDailyChallengeIndex(dailyChallenges.length)]
  const alreadyDone = progress.dailyChallengeCompleted && progress.lastChallengeDate === today

  const handleClaimReward = () => {
    if (alreadyDone) return
    const wasNew = completeDailyChallenge()
    if (wasNew) setShowReward(true)
  }

  const streakMessage = progress.streak === 0
    ? 'Start a new streak today!'
    : `${progress.streak} day streak — keep it going!`

  return (
    <div className="challenges-page">
      <div className="page-header">
        <h1>🏆 Daily Challenges</h1>
        <p>Complete today's activity, then come back to claim your reward!</p>
      </div>

      <div className="streak-banner card">
        <div className="streak-info">
          <span className="streak-fire">🔥</span>
          <div>
            <h2>{progress.streak > 0 ? `${progress.streak} Day Streak!` : 'No Streak Yet'}</h2>
            <p>{streakMessage}</p>
          </div>
        </div>
        <div className="streak-stats">
          <div><strong>{progress.xp}</strong> XP</div>
          <div><strong>{progress.stars}</strong> ⭐</div>
        </div>
      </div>

      <div className="daily-challenge card highlight">
        <span className="challenge-badge">Today's Challenge</span>
        <h2>{dailyChallenge.emoji} {dailyChallenge.type}</h2>
        <p>{dailyChallenge.task}</p>
        <div className="challenge-actions">
          <Link to={dailyChallenge.path} className="btn btn-secondary btn-large">
            Go to Activity →
          </Link>
          <button
            className="btn btn-primary btn-large"
            disabled={alreadyDone}
            onClick={handleClaimReward}
          >
            {alreadyDone ? '✅ Reward Claimed Today!' : 'I Finished — Claim Reward!'}
          </button>
        </div>
        {!alreadyDone && (
          <p className="challenge-hint">Complete the activity first, then claim your +25 XP and +3 stars!</p>
        )}
      </div>

      <h2 className="section-title">📋 Challenge Types</h2>
      <div className="card-grid">
        {dailyChallenges.map(c => (
          <div key={c.id} className="card challenge-card">
            <span className="challenge-emoji">{c.emoji}</span>
            <h3>{c.type}</h3>
            <p>{c.task}</p>
            <Link to={c.path} className="btn btn-outline">Go Practice →</Link>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: '2rem' }}>🎉 Seasonal Events</h2>
      <div className="card-grid">
        {seasonalEvents.map(e => (
          <div key={e.id} className="card seasonal-event-card">
            <span style={{ fontSize: '2.5rem' }}>{e.emoji}</span>
            <h3>{e.name}</h3>
            <p>{e.description}</p>
            <Link to="/challenges" className="btn btn-secondary">View Challenge</Link>
          </div>
        ))}
      </div>

      {showReward && <RewardModal onClose={() => setShowReward(false)} />}
    </div>
  )
}
