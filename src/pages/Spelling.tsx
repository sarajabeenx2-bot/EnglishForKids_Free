import { useState, useMemo, useEffect } from 'react'
import { spellingWords } from '../data/content'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './Spelling.css'

type Mode = 'spell' | 'missing' | 'listen' | 'builder'

export default function Spelling() {
  const { updatePerformance, addXP, isAdvancedMode, isYoungMode } = useProgress()
  const defaultDifficulty = isAdvancedMode() ? 'hard' : isYoungMode() ? 'easy' : 'medium'

  const [mode, setMode] = useState<Mode>('spell')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(defaultDifficulty)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [usedBuilderIndices, setUsedBuilderIndices] = useState<Set<number>>(new Set())

  const words = spellingWords[difficulty]
  const word = words[index % words.length]

  const missingDisplay = useMemo(() => {
    const pos = Math.floor(Math.random() * word.length)
    return word.split('').map((c, i) => (i === pos ? '_' : c)).join(' ')
  }, [word, index, mode])

  const builderLetters = useMemo(
    () => word.split('').map((l, i) => ({ l, i })).sort(() => Math.random() - 0.5),
    [word, index, mode],
  )

  useEffect(() => {
    setInput('')
    setFeedback(null)
    setUsedBuilderIndices(new Set())
  }, [word, index, mode])

  const checkAnswer = () => {
    const correct = input.toLowerCase().trim() === word.toLowerCase()
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) {
      setScore(s => s + 1)
      updatePerformance('spelling', 3)
      addXP(5)
      speak('Correct!')
    } else {
      speak(`The correct spelling is ${word}`)
    }
  }

  const addBuilderLetter = (letter: string, letterIndex: number) => {
    if (usedBuilderIndices.has(letterIndex)) return
    setUsedBuilderIndices(prev => new Set([...prev, letterIndex]))
    setInput(prev => prev + letter)
  }

  const nextWord = () => {
    setIndex(i => i + 1)
  }

  return (
    <div className="spelling-page">
      <div className="page-header">
        <h1>✍️ Spelling Challenge</h1>
        <p>Spell words, fill missing letters, and build words!</p>
      </div>

      <div className="spelling-controls">
        <div className="mode-tabs">
          {(['spell', 'missing', 'listen', 'builder'] as Mode[]).map(m => (
            <button key={m} className={`btn ${mode === m ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode(m)}>
              {m === 'spell' ? 'Spell' : m === 'missing' ? 'Missing' : m === 'listen' ? 'Listen' : 'Builder'}
            </button>
          ))}
        </div>
        <div className="difficulty-tabs">
          {(['easy', 'medium', 'hard'] as const).map(d => (
            <button key={d} className={`btn btn-sm ${difficulty === d ? 'btn-secondary' : 'btn-outline'}`} onClick={() => { setDifficulty(d); setIndex(0) }}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="spelling-game card">
        {mode === 'spell' && (
          <>
            <p className="spell-hint">Type the word:</p>
            <button className="btn btn-secondary" onClick={() => speak(word)}>🔊 Hear Word</button>
          </>
        )}
        {mode === 'missing' && (
          <p className="missing-display">{missingDisplay}</p>
        )}
        {mode === 'listen' && (
          <>
            <p className="spell-hint">Listen and type the word:</p>
            <button className="btn btn-primary btn-large" onClick={() => speak(word)}>🔊 Play Word</button>
          </>
        )}
        {mode === 'builder' && (
          <div className="builder-letters">
            {builderLetters.map(({ l, i }) => (
              <button
                key={i}
                className="letter-btn"
                onClick={() => addBuilderLetter(l, i)}
                disabled={usedBuilderIndices.has(i)}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        <input
          type="text"
          className={`spell-input ${feedback ?? ''}`}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type here..."
          onKeyDown={e => e.key === 'Enter' && checkAnswer()}
          aria-label="Spell the word"
        />

        <div className="spell-actions">
          <button className="btn btn-primary" onClick={checkAnswer}>Check ✓</button>
          <button className="btn btn-outline" onClick={nextWord}>Skip →</button>
        </div>

        {feedback && (
          <p className={`feedback-msg ${feedback}`}>
            {feedback === 'correct' ? '🎉 Correct! Great spelling!' : `❌ Try again! The word was: ${word}`}
          </p>
        )}
        <p className="spell-score">Score: {score} ⭐</p>
      </div>
    </div>
  )
}
