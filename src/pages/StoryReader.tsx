import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { stories } from '../data/content'
import { speak, speakSlow } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import RewardModal from '../components/RewardModal'
import './StoryReader.css'

export default function StoryReader() {
  const { id } = useParams()
  const story = stories.find(s => s.id === id)
  const [activeSentence, setActiveSentence] = useState(0)
  const [activeWord, setActiveWord] = useState<string | null>(null)
  const [slowMode, setSlowMode] = useState(false)
  const [showMeaning, setShowMeaning] = useState<{ word: string; meaning: string } | null>(null)
  const [showReward, setShowReward] = useState(false)
  const { profile, completeLesson, isLessonCompleted, updatePerformance } = useProgress()

  if (!story) {
    return (
      <div className="card">
        <h2>Story not found</h2>
        <Link to="/stories">← Back</Link>
      </div>
    )
  }

  if (!story.level.includes(profile.ageGroup)) {
    return (
      <div className="card age-gate">
        <h2>🌱 This story is for older learners</h2>
        <p>This story is best for ages {story.level.join(' or ')}. Try another story from the library!</p>
        <Link to="/stories" className="btn btn-primary">← Back to Stories</Link>
      </div>
    )
  }

  const lessonId = `story-${story.id}`
  const alreadyFinished = isLessonCompleted(lessonId)

  const readSentence = (index: number) => {
    setActiveSentence(index)
    const fn = slowMode ? speakSlow : speak
    fn(story.content[index])
  }

  const handleWordClick = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
    setActiveWord(clean)
    speak(clean)
    const vocab = story.vocabulary.find(v => v.word.toLowerCase() === clean)
    if (vocab) setShowMeaning(vocab)
  }

  const handleFinish = () => {
    if (alreadyFinished) return
    const wasNew = completeLesson(lessonId, 20)
    if (wasNew) {
      updatePerformance('reading', 10)
      setShowReward(true)
    }
  }

  return (
    <div className="story-reader">
      <Link to="/stories" className="back-link">← Back to Stories</Link>

      <div className="reader-header card">
        <h1>{story.title}</h1>
        <span className="story-badge">{story.category}</span>
        <div className="reader-controls">
          <button className={`btn ${slowMode ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSlowMode(!slowMode)}>
            {slowMode ? '🐢 Slow Mode' : '⚡ Normal Mode'}
          </button>
          <button className="btn btn-secondary" onClick={() => readSentence(activeSentence)}>🔊 Read Aloud</button>
        </div>
      </div>

      <div className="reader-content card">
        <h2 className="section-title">📖 Read With Me</h2>
        <p className="read-hint">Tap a sentence to hear it. Tap any word to learn its sound!</p>
        {story.content.map((sentence, i) => (
          <button
            key={i}
            type="button"
            className={`story-sentence ${activeSentence === i ? 'active' : ''}`}
            onClick={() => readSentence(i)}
          >
            {sentence.split(' ').map((word, wi) => (
              <span
                key={wi}
                className={`story-word ${activeWord === word.replace(/[^a-zA-Z]/g, '').toLowerCase() ? 'highlight' : ''}`}
                onClick={e => { e.stopPropagation(); handleWordClick(word) }}
                role="presentation"
              >
                {word}{' '}
              </span>
            ))}
          </button>
        ))}
      </div>

      {story.vocabulary.length > 0 && (
        <div className="vocab-support card">
          <h3>📝 Vocabulary</h3>
          <div className="vocab-chips">
            {story.vocabulary.map(v => (
              <button key={v.word} className="vocab-chip" onClick={() => { speak(v.word); setShowMeaning(v) }}>
                {v.word}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="btn btn-primary btn-large finish-btn"
        onClick={handleFinish}
        disabled={alreadyFinished}
      >
        {alreadyFinished ? '✅ Story Completed!' : '✅ I Finished Reading!'}
      </button>

      {showMeaning && (
        <div className="modal-overlay" onClick={() => setShowMeaning(null)} role="presentation">
          <div className="modal-content" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>{showMeaning.word}</h3>
            <p>{showMeaning.meaning}</p>
            <button className="btn btn-primary" onClick={() => speak(showMeaning.word)}>🔊 Hear Again</button>
          </div>
        </div>
      )}

      {showReward && <RewardModal onClose={() => setShowReward(false)} />}
    </div>
  )
}
