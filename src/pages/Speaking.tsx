import { useState, useRef } from 'react'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './Speaking.css'

const practiceWords = ['hello', 'apple', 'friend', 'happy', 'garden', 'rabbit', 'read', 'play']
const conversations = [
  { prompt: 'Hello! How are you?', response: 'I am fine, thank you!' },
  { prompt: 'What is your name?', response: 'My name is...' },
  { prompt: 'What is your favorite color?', response: 'My favorite color is blue.' },
]

export default function Speaking() {
  const [wordIndex, setWordIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [convIndex, setConvIndex] = useState(0)
  const [convPracticed, setConvPracticed] = useState(false)
  const readingText = 'The little rabbit hops in the green garden.'
  const [readingScore, setReadingScore] = useState<number | null>(null)
  const [micAvailable, setMicAvailable] = useState(true)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const { updatePerformance, addXP } = useProgress()

  const word = practiceWords[wordIndex]

  const scoreFromRecording = (durationMs: number): number => {
    const base = durationMs > 1500 ? 82 : 75
    return Math.min(95, base + Math.floor(Math.random() * 10))
  }

  const startRecording = async (onComplete: (s: number) => void, durationMs: number, intro: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRef.current = recorder
      const startTime = Date.now()
      recorder.start()
      setRecording(true)
      speak(intro)
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        const elapsed = Date.now() - startTime
        onComplete(scoreFromRecording(elapsed))
      }
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop()
        setRecording(false)
      }, durationMs)
    } catch {
      setMicAvailable(false)
      setScore(null)
      setReadingScore(null)
    }
  }

  const startWordPractice = () => {
    setScore(null)
    startRecording((s) => {
      setScore(s)
      updatePerformance('speaking', s >= 85 ? 4 : 2)
      if (s >= 85) addXP(8)
      speak(s >= 85 ? 'Great effort! Keep practicing!' : 'Good try! Listen and try again.')
    }, 3000, `Repeat after me: ${word}`)
  }

  const startConversationPractice = () => {
    setConvPracticed(true)
    startRecording(() => {
      updatePerformance('speaking', 3)
      speak('Well done! You practiced the conversation.')
    }, 4000, `Say: ${conversations[convIndex].response}`)
  }

  const startReadingBuddy = () => {
    setReadingScore(null)
    startRecording((s) => {
      setReadingScore(s)
      updatePerformance('reading', 5)
      if (s >= 85) addXP(12)
    }, 5000, 'Read the sentence aloud. I am listening!')
  }

  return (
    <div className="speaking-page">
      <div className="page-header">
        <h1>🗣️ Speaking Practice</h1>
        <p>Repeat after me, practice conversations, and read with your buddy!</p>
      </div>

      <div className="practice-notice card">
        <p>🎤 <strong>Practice Mode:</strong> Your buddy listens while you speak and gives encouraging feedback. Scores reward effort — keep trying!</p>
        {!micAvailable && (
          <p className="mic-warning">⚠️ Microphone not available. Ask a parent to allow microphone access in browser settings.</p>
        )}
      </div>

      <div className="speaking-section card">
        <h2>🔁 Repeat After Me</h2>
        <div className="practice-word">
          <span className="big-word">{word}</span>
          <button className="btn btn-secondary" onClick={() => speak(word)}>🔊 Listen</button>
        </div>
        <button className={`btn btn-primary btn-large ${recording ? 'recording' : ''}`} onClick={startWordPractice} disabled={recording || !micAvailable}>
          {recording ? '🎤 Recording...' : '🎤 Record & Repeat'}
        </button>
        {score !== null && (
          <div className={`score-display ${score >= 85 ? 'great' : 'good'}`}>
            <span className="score-num">{score}%</span>
            <p>{score >= 90 ? '🌟 Excellent effort!' : score >= 85 ? '👍 Great job!' : '💪 Keep practicing!'}</p>
          </div>
        )}
        <div className="word-nav">
          <button className="btn btn-outline" onClick={() => { setWordIndex(i => (i - 1 + practiceWords.length) % practiceWords.length); setScore(null) }}>←</button>
          <button className="btn btn-outline" onClick={() => { setWordIndex(i => (i + 1) % practiceWords.length); setScore(null) }}>→</button>
        </div>
      </div>

      <div className="speaking-section card">
        <h2>💬 Conversation Practice</h2>
        <div className="conversation">
          <p className="conv-prompt">🦉 "{conversations[convIndex].prompt}"</p>
          <p className="conv-response">You say: "{conversations[convIndex].response}"</p>
        </div>
        <button className="btn btn-secondary" onClick={() => speak(conversations[convIndex].prompt)}>🔊 Hear Question</button>
        <button className="btn btn-primary" onClick={startConversationPractice} disabled={recording || !micAvailable}>
          🎤 Practice Answer
        </button>
        {convPracticed && <p className="conv-done">✅ Nice conversation practice!</p>}
        <button className="btn btn-outline" onClick={() => { setConvIndex(i => (i + 1) % conversations.length); setConvPracticed(false) }}>Next Conversation →</button>
      </div>

      <div className="speaking-section card reading-buddy">
        <h2>📖 Reading Buddy</h2>
        <p>Read this sentence aloud. Your buddy will listen and cheer you on!</p>
        <div className="reading-text">{readingText}</div>
        <button className="btn btn-primary btn-large" onClick={startReadingBuddy} disabled={recording || !micAvailable}>
          🐰 Start Reading Buddy
        </button>
        {readingScore !== null && (
          <div className="score-display great">
            <span className="score-num">{readingScore}%</span>
            <p>🎉 {readingScore >= 85 ? 'Amazing reading! You are a star!' : 'Good reading! Try again for an even higher score!'}</p>
            {readingScore < 90 && <p className="correction">💡 Tip: Read slowly and say each word clearly.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
