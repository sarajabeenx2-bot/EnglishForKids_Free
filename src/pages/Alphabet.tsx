import { useState } from 'react'
import { alphabetData } from '../data/content'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import RewardModal from '../components/RewardModal'
import './Alphabet.css'

export default function Alphabet() {
  const [selected, setSelected] = useState(0)
  const [mode, setMode] = useState<'upper' | 'lower' | 'trace'>('upper')
  const [showReward, setShowReward] = useState(false)
  const { completeLesson, isLessonCompleted, isYoungMode } = useProgress()
  const letter = alphabetData[selected]
  const lessonId = `alpha-${letter.letter}`
  const alreadyLearned = isLessonCompleted(lessonId)

  const handleSpeak = () => {
    speak(`${letter.letter}. ${letter.letter} is for ${letter.word}`)
  }

  const handleComplete = () => {
    if (alreadyLearned) return
    const wasNew = completeLesson(lessonId, 10)
    if (wasNew) setShowReward(true)
  }

  return (
    <div className="alphabet-page">
      <div className="page-header">
        <h1>🔤 Alphabet Adventure</h1>
        <p>Learn A–Z with sounds, tracing, and fun examples!</p>
      </div>

      <div className="mode-tabs">
        {(['upper', 'lower', 'trace'] as const).map(m => (
          <button key={m} className={`btn ${mode === m ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode(m)}>
            {m === 'upper' ? 'ABC' : m === 'lower' ? 'abc' : '✏️ Trace'}
          </button>
        ))}
      </div>

      <div className="alphabet-main card">
        <div className="letter-display">
          {mode === 'trace' ? (
            <div className="trace-area">
              <span className="trace-letter">{letter.letter}</span>
              <svg viewBox="0 0 200 200" className="trace-svg">
                <text x="50%" y="55%" textAnchor="middle" fontSize="140" fill="none" stroke="#ccc" strokeWidth="2" strokeDasharray="8 4" fontFamily="Fredoka">
                  {letter.letter}
                </text>
              </svg>
              <p>Trace the letter with your finger or mouse!</p>
            </div>
          ) : (
            <span className={`big-letter ${isYoungMode() ? 'young' : ''}`}>
              {mode === 'upper' ? letter.letter : letter.lowercase}
            </span>
          )}
          <span className="letter-emoji">{letter.emoji}</span>
          <h2>{letter.word}</h2>
        </div>

        <div className="letter-actions">
          <button className={`btn btn-secondary ${isYoungMode() ? 'btn-young' : ''}`} onClick={handleSpeak}>
            🔊 Hear Sound
          </button>
          <button className="btn btn-primary" onClick={handleComplete} disabled={alreadyLearned}>
            {alreadyLearned ? '✅ Already Learned!' : '✅ I Learned This Letter!'}
          </button>
        </div>
      </div>

      <div className="letter-grid">
        {alphabetData.map((l, i) => (
          <button
            key={l.letter}
            className={`letter-card ${selected === i ? 'active' : ''}`}
            onClick={() => { setSelected(i); speak(l.letter) }}
          >
            <span>{l.letter}</span>
            <small>{l.emoji}</small>
          </button>
        ))}
      </div>

      {showReward && <RewardModal onClose={() => setShowReward(false)} />}
    </div>
  )
}
