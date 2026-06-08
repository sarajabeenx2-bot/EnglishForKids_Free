import { useState, useEffect } from 'react'
import { rewardChoices } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import './RewardModal.css'

interface Props {
  onClose: () => void
}

export default function RewardModal({ onClose }: Props) {
  const { addXP, addStars, addBadge, unlockColoring, playSound } = useProgress()
  const [chestState, setChestState] = useState<'closed' | 'shaking' | 'opened'>('closed')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOpenChest = () => {
    if (chestState !== 'closed') return
    setChestState('shaking')
    playSound('pop')
    setTimeout(() => {
      setChestState('opened')
      playSound('chestOpen')

      // Automatically choose a random reward
      const randomReward = rewardChoices[Math.floor(Math.random() * rewardChoices.length)]
      setSelected(randomReward.id)
      playSound('success')

      switch (randomReward.id) {
        case 'coloring':
          unlockColoring('flowers')
          break
        case 'badge': {
          const BADGES = ['Lesson Star', 'Super Scholar', 'Word Wizard', 'Alphabet Champion', 'Grammar Hero', 'Daily Champ']
          const randomBadge = BADGES[Math.floor(Math.random() * BADGES.length)]
          addBadge(randomBadge)
          break
        }
        case 'story':
          addXP(10)
          break
        case 'game':
          addXP(15)
          break
        case 'xp':
          addXP(30)
          break
        case 'surprise': {
          const BADGES = ['Lucky Learner', 'Treasure Hunter', 'Magic Finder', 'Confetti Popper']
          const randomBadge = BADGES[Math.floor(Math.random() * BADGES.length)]
          addStars(5)
          addXP(20)
          addBadge(randomBadge)
          break
        }
      }
    }, 1000)
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
        {chestState !== 'opened' ? (
          <div className="chest-intro">
            <h2 id="reward-title">🎁 You Found a Treasure Chest!</h2>
            <p>Tap the magical chest to unlock your rewards!</p>
            
            <button 
              className={`chest-button ${chestState === 'shaking' ? 'shake-anim' : 'bounce-anim'}`} 
              onClick={handleOpenChest}
              disabled={chestState === 'shaking'}
              aria-label="Open treasure chest"
            >
              🔒📦
            </button>
            
            {chestState === 'shaking' && <p className="chest-opening-text">Opening...</p>}
          </div>
        ) : (
          <div className="reward-claimed">
            <div className="emoji claimed-emoji float-anim">{chosen?.emoji}</div>
            <h2>You got: {chosen?.label}!</h2>
            <p style={{ marginBottom: '1.5rem' }}>Keep learning and earning more rewards! 🌟</p>
            <button className="btn btn-primary" onClick={onClose}>
              Awesome! ➔
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
