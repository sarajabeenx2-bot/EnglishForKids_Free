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
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null)
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

  const seasonColors: Record<string, { bg: string; border: string; badge: string }> = {
    summer: { bg: 'linear-gradient(135deg, #FFF9C4, #FFECB3)', border: '#FFD54F', badge: '#FF8F00' },
    winter: { bg: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', border: '#64B5F6', badge: '#1565C0' },
    ramadan: { bg: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)', border: '#BA68C8', badge: '#6A1B9A' },
    holiday: { bg: 'linear-gradient(135deg, #FFEBEE, #FCE4EC)', border: '#EF9A9A', badge: '#B71C1C' },
  }

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

      <h2 className="section-title" style={{ marginTop: '2.5rem' }}>🎉 Seasonal Events & Challenges</h2>
      <p style={{ color: '#718096', marginBottom: '1.5rem', fontWeight: 600 }}>
        Click on a season to explore its creative learning challenges!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {seasonalEvents.map(e => {
          const colors = seasonColors[e.id] ?? { bg: 'linear-gradient(135deg,#f9f9f9,#f0f0f0)', border: '#ccc', badge: '#555' }
          const isOpen = expandedSeason === e.id
          return (
            <div
              key={e.id}
              className="card seasonal-event-card"
              style={{
                background: colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: '18px',
                overflow: 'hidden',
                padding: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Header (always visible) */}
              <button
                onClick={() => setExpandedSeason(isOpen ? null : e.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '2.4rem' }}>{e.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1a202c' }}>
                      {e.name}
                    </div>
                    <div style={{ color: '#4A5568', fontSize: '0.95rem', fontWeight: 500 }}>
                      {e.description}
                    </div>
                    {e.challenges && (
                      <span style={{
                        display: 'inline-block',
                        marginTop: '6px',
                        background: colors.badge,
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '2px 12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}>
                        {e.challenges.length} Challenges Inside
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: '1.5rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: colors.badge }}>
                  ▼
                </span>
              </button>

              {/* Expanded challenges list */}
              {isOpen && e.challenges && (
                <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px', borderTop: `1px solid ${colors.border}`, paddingTop: '20px', marginTop: '0' }}>
                  {e.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255,255,255,0.7)',
                        border: `1.5px solid ${colors.border}`,
                        borderRadius: '14px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                      }}
                    >
                      <div
                        style={{
                          background: colors.badge,
                          color: '#fff',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#1a202c', marginBottom: '4px' }}>
                          {ch.title}
                        </div>
                        <div style={{ color: '#4A5568', fontSize: '0.92rem', lineHeight: 1.6 }}>
                          {ch.task}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showReward && <RewardModal onClose={() => setShowReward(false)} />}
    </div>
  )
}
