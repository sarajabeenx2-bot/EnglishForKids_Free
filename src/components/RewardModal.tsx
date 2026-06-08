import { useState, useEffect } from 'react'
import { rewardChoices } from '../data/content'
import { useProgress } from '../context/ProgressContext'

interface Props {
  onClose: () => void
}

export default function RewardModal({ onClose }: Props) {
  const { addXP, addStars, addBadge, unlockColoring } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleChoose = (id: string) => {
    if (claimed) return
    setClaimed(true)
    setSelected(id)
    switch (id) {
      case 'coloring':
        unlockColoring('flowers')
        break
      case 'badge':
        addBadge('Lesson Star')
        break
      case 'story':
        addXP(10)
        break
      case 'game':
        addXP(15)
        break
      case 'xp':
        addXP(30)
        break
      case 'surprise':
        addStars(5)
        addXP(20)
        addBadge('Lucky Learner')
        break
    }
    setTimeout(onClose, 2000)
  }

  const chosen = rewardChoices.find(r => r.id === selected)

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content reward-popup"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-title"
      >
        {!selected ? (
          <>
            <h2 id="reward-title">🎉 Great Job! Choose Your Reward!</h2>
            <p>Pick one special reward for completing your lesson.</p>
            <div className="card-grid" style={{ marginTop: '1.5rem' }}>
              {rewardChoices.map(r => (
                <button key={r.id} className="card reward-choice" onClick={() => handleChoose(r.id)} disabled={claimed}>
                  <span style={{ fontSize: '2.5rem' }}>{r.emoji}</span>
                  <span style={{ fontWeight: 700 }}>{r.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="emoji">{chosen?.emoji}</div>
            <h2>You got: {chosen?.label}!</h2>
            <p>Keep learning and earning more rewards! 🌟</p>
          </>
        )}
      </div>
    </div>
  )
}
