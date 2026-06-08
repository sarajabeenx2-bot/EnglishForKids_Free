import { useState } from 'react'
import { vocabulary, vocabCategories } from '../data/content'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './Vocabulary.css'

export default function Vocabulary() {
  const [category, setCategory] = useState('All')
  const [flashIndex, setFlashIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const { completeLesson, updatePerformance, isLessonCompleted } = useProgress()

  const filtered = category === 'All' ? vocabulary : vocabulary.filter(v => v.category === category)
  const word = filtered[flashIndex % filtered.length]

  const wordOfDay = vocabulary[new Date().getDate() % vocabulary.length]

  return (
    <div className="vocabulary-page">
      <div className="page-header">
        <h1>📝 Vocabulary Builder</h1>
        <p>Flashcards, picture dictionary, and Word of the Day!</p>
      </div>

      <div className="word-of-day card">
        <h3>🌟 Word of the Day</h3>
        <div className="wod-content">
          <span className="wod-emoji">{wordOfDay.emoji}</span>
          <div>
            <h2>{wordOfDay.word}</h2>
            <p>{wordOfDay.meaning}</p>
            <p className="wod-sentence">"{wordOfDay.sentence}"</p>
          </div>
          <button className="btn btn-primary" onClick={() => speak(wordOfDay.word)}>🔊</button>
        </div>
      </div>

      <div className="category-tabs">
        <button className={`btn ${category === 'All' ? 'btn-primary' : 'btn-outline'}`} onClick={() => { setCategory('All'); setFlashIndex(0) }}>All</button>
        {vocabCategories.map(c => (
          <button key={c} className={`btn ${category === c ? 'btn-primary' : 'btn-outline'}`} onClick={() => { setCategory(c); setFlashIndex(0) }}>{c}</button>
        ))}
      </div>

      <button
        type="button"
        className="flashcard card"
        onClick={() => setShowAnswer(!showAnswer)}
        aria-label={showAnswer ? `Hide answer for ${word.word}` : 'Reveal flashcard answer'}
      >
        <span className="flash-emoji">{word.emoji}</span>
        <h2>{showAnswer ? word.word : '???'}</h2>
        {showAnswer && (
          <>
            <p className="flash-meaning">{word.meaning}</p>
            <p className="flash-sentence">"{word.sentence}"</p>
          </>
        )}
        <p className="flash-hint">Tap to {showAnswer ? 'hide' : 'reveal'}</p>
      </button>

      <div className="flash-actions">
        <button className="btn btn-outline" onClick={() => { setFlashIndex(i => (i - 1 + filtered.length) % filtered.length); setShowAnswer(false) }}>← Prev</button>
        <button className="btn btn-secondary" onClick={() => speak(word.word)}>🔊 Hear</button>
        <button className="btn btn-primary" onClick={() => {
          const id = `vocab-${word.word}`
          const wasNew = completeLesson(id, 5)
          if (wasNew) updatePerformance('vocabulary', 2)
          setFlashIndex(i => i + 1)
          setShowAnswer(false)
        }}>
          {isLessonCompleted(`vocab-${word.word}`) ? '✅ Review Again' : '✅ Learned!'}
        </button>
        <button className="btn btn-outline" onClick={() => { setFlashIndex(i => (i + 1) % filtered.length); setShowAnswer(false) }}>Next →</button>
      </div>

      <h2 className="section-title" style={{ marginTop: '2rem' }}>🖼️ Picture Dictionary</h2>
      <div className="picture-dict card-grid">
        {filtered.map(v => (
          <button key={v.word} className="card dict-card" onClick={() => speak(`${v.word}. ${v.meaning}. ${v.sentence}`)}>
            <span className="dict-emoji">{v.emoji}</span>
            <strong>{v.word}</strong>
            <small>{v.meaning}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
