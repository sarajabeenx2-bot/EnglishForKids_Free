import { useState, useMemo, type FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { games, vocabulary, alphabetData } from '../data/content'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import MemoryCard from '../components/MemoryCard'
import './Games.css'

function AlphabetMatch() {
  const [pairs] = useState(() => {
    const items = alphabetData.slice(0, 6)
    const cards = [...items.map(i => ({ type: 'letter' as const, value: i.letter, match: i.letter })),
                   ...items.map(i => ({ type: 'emoji' as const, value: i.emoji, match: i.letter }))]
    return cards.sort(() => Math.random() - 0.5)
  })
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [wrongFlash, setWrongFlash] = useState(false)
  const [lockBoard, setLockBoard] = useState(false)

  const handleFlip = (i: number) => {
    if (lockBoard || flipped.length === 2 || flipped.includes(i) || matched.includes(pairs[i].match)) return
    const newFlipped = [...flipped, i]
    setFlipped(newFlipped)
    if (newFlipped.length === 2) {
      setLockBoard(true)
      const [a, b] = newFlipped
      if (pairs[a].match === pairs[b].match) {
        setMatched(m => [...m, pairs[a].match])
        speak('Match!')
        setFlipped([])
        setLockBoard(false)
      } else {
        setWrongFlash(true)
        speak('Not a match. Try again!')
        setTimeout(() => {
          setFlipped([])
          setWrongFlash(false)
          setLockBoard(false)
        }, 1000)
      }
    }
  }

  return (
    <div className={`game-board memory-board ${wrongFlash ? 'wrong-flash' : ''}`}>
      {pairs.map((card, i) => (
        <MemoryCard
          key={i}
          back={card.value}
          isFlipped={flipped.includes(i)}
          isMatched={matched.includes(card.match)}
          onClick={() => handleFlip(i)}
          disabled={lockBoard}
        />
      ))}
      {matched.length === 6 && <p className="game-win">🎉 You won! All matched!</p>}
    </div>
  )
}

function WordMatch() {
  const words = vocabulary.slice(0, 4)
  const [selected, setSelected] = useState<{ word?: string; meaning?: string }>({})
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)

  const handleSelect = (type: 'word' | 'meaning', value: string) => {
    const newSel = { ...selected, [type]: value }
    setSelected(newSel)
    if (newSel.word && newSel.meaning) {
      const w = words.find(v => v.word === newSel.word)
      if (w && w.meaning === newSel.meaning) {
        setMatched(m => [...m, w.word])
        speak('Correct match!')
      } else {
        setWrong(true)
        speak('Try again!')
        setTimeout(() => setWrong(false), 600)
      }
      setSelected({})
    }
  }

  return (
    <div className={`word-match-game ${wrong ? 'wrong-flash' : ''}`}>
      <div className="match-column">
        {words.map(w => (
          <button key={w.word} className={`match-btn ${matched.includes(w.word) ? 'matched' : ''} ${selected.word === w.word ? 'selected' : ''}`}
            onClick={() => !matched.includes(w.word) && handleSelect('word', w.word)}>
            {w.emoji} {w.word}
          </button>
        ))}
      </div>
      <div className="match-column">
        {words.map(w => (
          <button key={w.meaning} className={`match-btn ${matched.includes(w.word) ? 'matched' : ''} ${selected.meaning === w.meaning ? 'selected' : ''}`}
            onClick={() => !matched.includes(w.word) && handleSelect('meaning', w.meaning)}>
            {w.meaning}
          </button>
        ))}
      </div>
      {matched.length === words.length && <p className="game-win">🎉 All matched!</p>}
    </div>
  )
}

function SpellingGame() {
  const [word] = useState(vocabulary[Math.floor(Math.random() * vocabulary.length)])
  const [letters, setLetters] = useState<string[]>([])
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  const shuffled = useMemo(
    () => word.word.split('').map((l, i) => ({ l, i })).sort(() => Math.random() - 0.5),
    [word.word],
  )

  const addLetter = (l: string, idx: number) => {
    if (done || usedIndices.has(idx)) return
    const newLetters = [...letters, l]
    setLetters(newLetters)
    setUsedIndices(prev => new Set([...prev, idx]))
    if (newLetters.join('') === word.word) {
      setDone(true)
      speak('Perfect spelling!')
    } else if (newLetters.length === word.word.length) {
      speak('Not quite. Try the finish button to play again!')
    }
  }

  return (
    <div className="spelling-game-inline">
      <p>Spell: {word.emoji} ({word.meaning})</p>
      <div className="spell-slots">{letters.join('') || '___'}</div>
      <div className="builder-letters">
        {shuffled.map(({ l, i }) => (
          <button key={i} className="letter-btn" onClick={() => addLetter(l, i)} disabled={done || usedIndices.has(i)}>{l}</button>
        ))}
      </div>
      {done && <p className="game-win">🎉 Correct!</p>}
    </div>
  )
}

function VocabHunt() {
  const [target] = useState(vocabulary[Math.floor(Math.random() * 8)])
  const [found, setFound] = useState(false)
  const items = vocabulary.slice(0, 9).sort(() => Math.random() - 0.5)

  return (
    <div className="vocab-hunt">
      <p>Find: <strong>{target.word}</strong> ({target.meaning})</p>
      <div className="hunt-grid">
        {items.map(v => (
          <button key={v.word} className={`hunt-item ${found && v.word === target.word ? 'found' : ''}`}
            onClick={() => {
              if (v.word === target.word) { setFound(true); speak('Found it!') }
              else speak('Keep looking!')
            }}>
            {v.emoji}<br/>{v.word}
          </button>
        ))}
      </div>
      {found && <p className="game-win">🎉 Found {target.word}!</p>}
    </div>
  )
}

function ReadingRace() {
  const [index, setIndex] = useState(0)
  const words = vocabulary.slice(0, 8)
  const [done, setDone] = useState(false)

  const handleNext = () => {
    speak(words[index].word)
    if (index >= words.length - 1) setDone(true)
    else setIndex(i => i + 1)
  }

  return (
    <div className="reading-race">
      <p>Read each word quickly!</p>
      <div className="race-word">{words[index].emoji} <strong>{words[index].word}</strong></div>
      <button className="btn btn-primary" onClick={handleNext}>{done ? '✅ Finished!' : 'Next Word →'}</button>
      <p>{index + 1} / {words.length}</p>
    </div>
  )
}

const gameComponents: Record<string, FC> = {
  'alphabet-match': AlphabetMatch,
  'word-match': WordMatch,
  'memory-game': AlphabetMatch,
  'spelling-challenge': SpellingGame,
  'vocab-hunt': VocabHunt,
  'reading-race': ReadingRace,
  'puzzle': SpellingGame,
}

export default function Games() {
  const { id } = useParams()
  const { completeLesson, isLessonCompleted } = useProgress()

  if (id) {
    const game = games.find(g => g.id === id)
    const GameComponent = gameComponents[id] ?? WordMatch
    const lessonId = `game-${id}`
    const finished = isLessonCompleted(lessonId)

    return (
      <div className="games-page">
        <Link to="/games" className="back-link">← All Games</Link>
        <div className="page-header">
          <h1>{game?.emoji} {game?.name}</h1>
          <p>{game?.description}</p>
        </div>
        <div className="card game-container">
          <GameComponent />
          <button
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
            disabled={finished}
            onClick={() => completeLesson(lessonId, game?.xp ?? 15)}
          >
            {finished ? '✅ Game Completed!' : `✅ Finish Game (+${game?.xp ?? 15} XP)`}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="games-page">
      <div className="page-header">
        <h1>🎮 Learning Games</h1>
        <p>Play fun games and earn XP when you finish!</p>
      </div>
      <div className="card-grid">
        {games.map(game => (
          <Link key={game.id} to={`/games/${game.id}`} className="card game-card">
            <span className="game-emoji">{game.emoji}</span>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <span className="game-xp">+{game.xp} XP</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
