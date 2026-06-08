import { useState } from 'react'
import { phonicsData } from '../data/content'
import { speak, speakSlow } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './Phonics.css'

export default function Phonics() {
  const [index, setIndex] = useState(0)
  const [blendMode, setBlendMode] = useState(false)
  const { completeLesson, isLessonCompleted } = useProgress()
  const phonicsDone = isLessonCompleted('phonics-complete')
  const item = phonicsData[index]

  const practiceBlend = () => {
    setBlendMode(true)
    const parts = item.blend.split('-')
    parts.forEach((p, i) => {
      setTimeout(() => speak(p), i * 600)
    })
    setTimeout(() => speak(item.words[0]), parts.length * 600 + 300)
  }

  return (
    <div className="phonics-page">
      <div className="page-header">
        <h1>🔊 Phonics Fun</h1>
        <p>Learn letter sounds, blending, and reading practice!</p>
      </div>

      <div className="phonics-main card">
        <div className="sound-display">
          <span className="sound-letter">{item.sound.toUpperCase()}</span>
          <p className="sound-label">Letter Sound</p>
        </div>

        <div className="word-examples">
          {item.words.map(w => (
            <button key={w} className="word-chip" onClick={() => speak(w)}>
              🔊 {w}
            </button>
          ))}
        </div>

        <div className="phonics-actions">
          <button className="btn btn-secondary" onClick={() => speakSlow(item.words[0])}>🐢 Slow</button>
          <button className="btn btn-primary" onClick={() => speak(item.words[0])}>🔊 Normal</button>
          <button className="btn btn-outline" onClick={practiceBlend}>🔗 Blend Sounds</button>
        </div>

        {blendMode && (
          <div className="blend-display">
            <span>{item.blend}</span> → <strong>{item.words[0]}</strong>
          </div>
        )}

        <div className="phonics-nav">
          <button className="btn btn-outline" disabled={index === 0} onClick={() => setIndex(i => i - 1)}>← Prev</button>
          <span>{index + 1} / {phonicsData.length}</span>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (index < phonicsData.length - 1) setIndex(i => i + 1)
              else { completeLesson('phonics-complete', 25) }
            }}
          >
            {index < phonicsData.length - 1 ? 'Next →' : phonicsDone ? '✅ Completed!' : '✅ Complete!'}
          </button>
        </div>
      </div>

      <div className="phonics-grid card-grid">
        {phonicsData.map((p, i) => (
          <button key={p.sound} className={`card phonics-card ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}>
            <span className="phonics-char">{p.sound.toUpperCase()}</span>
            <span>{p.words[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
