import { useState } from 'react'
import { grammarTopics } from '../data/content'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './Grammar.css'

const quizzes: Record<string, { q: string; options: string[]; answer: number }[]> = {
  nouns: [
    { q: 'Which word is a noun?', options: ['run', 'cat', 'happy'], answer: 1 },
    { q: 'Which word is a noun?', options: ['school', 'jump', 'quickly'], answer: 0 },
  ],
  verbs: [
    { q: 'Which word is a verb?', options: ['dog', 'play', 'blue'], answer: 1 },
    { q: 'Which word is a verb?', options: ['read', 'table', 'big'], answer: 0 },
  ],
  adjectives: [
    { q: 'Which word is an adjective?', options: ['happy', 'run', 'book'], answer: 0 },
  ],
  pronouns: [
    { q: 'Which word is a pronoun?', options: ['she', 'table', 'jump'], answer: 0 },
  ],
  adverbs: [
    { q: 'Which word is an adverb?', options: ['quickly', 'cat', 'blue'], answer: 0 },
  ],
  tenses: [
    { q: 'Which is past tense?', options: ['I played', 'I play', 'I will play'], answer: 0 },
  ],
  sentences: [
    { q: 'Which is a complete sentence?', options: ['The cat sits.', 'cat sits the', 'sits cat'], answer: 0 },
  ],
}

export default function Grammar() {
  const [topic, setTopic] = useState(grammarTopics[0])
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const { completeLesson, isLessonCompleted } = useProgress()

  const quiz = quizzes[topic.id]?.[quizIndex]
  const topicDone = isLessonCompleted(`grammar-${topic.id}`)

  const handleAnswer = (i: number) => {
    setSelected(i)
    if (quiz && i === quiz.answer) {
      setScore(s => s + 1)
      speak('Correct! Well done!')
    } else {
      speak('Try again next time!')
    }
  }

  const finishTopic = () => {
    completeLesson(`grammar-${topic.id}`, 15)
  }

  return (
    <div className="grammar-page">
      <div className="page-header">
        <h1>📖 Grammar Garden</h1>
        <p>Learn nouns, verbs, adjectives, and more with fun quizzes!</p>
      </div>

      <div className="topic-grid card-grid">
        {grammarTopics.map(t => (
          <button key={t.id} className={`card topic-card ${topic.id === t.id ? 'active' : ''}`} onClick={() => { setTopic(t); setQuizIndex(0); setSelected(null); setScore(0) }}>
            <span className="topic-emoji">{t.emoji}</span>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            {isLessonCompleted(`grammar-${t.id}`) && <span className="topic-done">✅ Done</span>}
          </button>
        ))}
      </div>

      <div className="grammar-lesson card">
        <h2>{topic.emoji} {topic.title}</h2>
        <p>{topic.description}</p>
        <div className="examples">
          <h4>Examples:</h4>
          <div className="example-chips">
            {topic.examples.map(ex => (
              <button key={ex} className="example-chip" onClick={() => speak(ex)}>{ex} 🔊</button>
            ))}
          </div>
        </div>
      </div>

      {quiz ? (
        <div className="grammar-quiz card">
          <h3>🎯 Quick Quiz</h3>
          <p className="quiz-question">{quiz.q}</p>
          <div className="quiz-options">
            {quiz.options.map((opt, i) => (
              <button
                key={opt}
                className={`btn quiz-option ${selected === i ? (i === quiz.answer ? 'correct' : 'wrong') : ''}`}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <button className="btn btn-primary" onClick={() => {
              if (quizIndex < (quizzes[topic.id]?.length ?? 1) - 1) {
                setQuizIndex(i => i + 1); setSelected(null)
              } else {
                finishTopic()
              }
            }}>
              {quizIndex < (quizzes[topic.id]?.length ?? 1) - 1 ? 'Next Question →' : topicDone ? '✅ Topic Completed!' : '✅ Complete Topic!'}
            </button>
          )}
          <p className="quiz-score">Score: {score}</p>
        </div>
      ) : (
        <div className="grammar-quiz card">
          <button className="btn btn-primary" onClick={finishTopic} disabled={topicDone}>
            {topicDone ? '✅ Topic Completed!' : '✅ Mark Topic Complete'}
          </button>
        </div>
      )}
    </div>
  )
}
