import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import { alphabetData } from '../data/content'
import { alphabetAgeData } from '../data/alphabetAgeData'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import RewardModal from '../components/RewardModal'
import {
  LanguagesIcon,
  VolumeIcon,
  CheckIcon,
  PenToolIcon,
  TrashIcon,
  StarIcon,
  TrophyIcon,
  SparklesIcon
} from '../components/CartoonIcons'
import './Alphabet.css'

// ── Trace Canvas Component ──────────────────────────────────────────────────
interface TraceCanvasProps {
  letter: string
}

interface TraceCanvasRef {
  checkTrace: () => { isValid: boolean; message: string }
  clear: () => void
}

const TraceCanvas = forwardRef<TraceCanvasRef, TraceCanvasProps>(({ letter }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [cleared, setCleared] = useState(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  
  const guideCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const userCanvasRef = useRef<HTMLCanvasElement | null>(null)

  if (!guideCanvasRef.current) {
    guideCanvasRef.current = document.createElement('canvas')
    guideCanvasRef.current.width = 120
    guideCanvasRef.current.height = 120
  }
  if (!userCanvasRef.current) {
    userCanvasRef.current = document.createElement('canvas')
    userCanvasRef.current.width = 120
    userCanvasRef.current.height = 120
  }

  // Draw the ghost letter guide
  const drawGuide = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h)
    ctx.save()
    ctx.font = `bold ${Math.min(w, h) * 0.72}px Fredoka, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(180, 220, 255, 0.45)'
    ctx.strokeStyle = 'rgba(100, 180, 255, 0.3)'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 6])
    ctx.strokeText(letter, w / 2, h / 2)
    ctx.setLineDash([])
    ctx.fillText(letter, w / 2, h / 2)
    ctx.restore()
  }, [letter])

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width: w, height: h } = canvas.getBoundingClientRect()
    canvas.width = w
    canvas.height = h
    drawGuide(ctx, w, h)
    setCleared(false)
  }, [letter, drawGuide])

  // Reset offscreen canvases on letter change
  useEffect(() => {
    const gCanvas = guideCanvasRef.current
    const uCanvas = userCanvasRef.current
    if (gCanvas && uCanvas) {
      const gCtx = gCanvas.getContext('2d')!
      gCtx.clearRect(0, 0, 120, 120)
      gCtx.font = 'bold 85px Fredoka, sans-serif'
      gCtx.textAlign = 'center'
      gCtx.textBaseline = 'middle'
      gCtx.fillStyle = '#000'
      gCtx.fillText(letter, 60, 60)

      const uCtx = uCanvas.getContext('2d')!
      uCtx.clearRect(0, 0, 120, 120)
    }
  }, [letter])

  useImperativeHandle(ref, () => ({
    checkTrace() {
      const canvas = canvasRef.current
      if (!canvas) return { isValid: false, message: 'Canvas error' }
      
      const gCtx = guideCanvasRef.current?.getContext('2d')
      const uCtx = userCanvasRef.current?.getContext('2d')
      if (!gCtx || !uCtx) return { isValid: false, message: 'Canvas error' }
      
      const gData = gCtx.getImageData(0, 0, 120, 120).data
      const uData = uCtx.getImageData(0, 0, 120, 120).data
      
      let guidePixels = 0
      let overlapPixels = 0
      let outsidePixels = 0

      const qGuide = [0, 0, 0, 0]
      const qOverlap = [0, 0, 0, 0]

      for (let y = 0; y < 120; y++) {
        for (let x = 0; x < 120; x++) {
          const idx = (y * 120 + x) * 4 + 3
          const gAlpha = gData[idx]
          const uAlpha = uData[idx]

          const qIdx = (y < 60 ? 0 : 2) + (x < 60 ? 0 : 1)

          if (gAlpha > 50) {
            qGuide[qIdx]++
            guidePixels++
            if (uAlpha > 50) {
              qOverlap[qIdx]++
              overlapPixels++
            }
          } else if (uAlpha > 50) {
            outsidePixels++
          }
        }
      }

      const totalUserPixels = overlapPixels + outsidePixels
      if (totalUserPixels < 150) {
        return { isValid: false, message: 'Please trace the letter first!' }
      }

      const overlapPercent = overlapPixels / guidePixels
      const outsidePercent = outsidePixels / guidePixels

      // Quadrant verification
      let quadrantCheckPassed = true
      for (let q = 0; q < 4; q++) {
        const guideWeight = qGuide[q] / guidePixels
        // If the quadrant has a significant part of the letter, make sure the user covered a decent portion of it.
        if (guideWeight > 0.08) {
          const qCoverage = qOverlap[q] / qGuide[q]
          if (qCoverage < 0.12) {
            quadrantCheckPassed = false
          }
        }
      }

      // Kid friendly thresholds:
      // Must cover at least 25% of guide pixels, outside pixels must not exceed 85% of guide, and quadrant check must pass.
      const isValid = overlapPercent >= 0.25 && outsidePercent <= 0.85 && quadrantCheckPassed

      return {
        isValid,
        overlapPercent,
        outsidePercent,
        message: isValid ? 'Perfect trace!' : 'Oops! That doesn\'t look quite right. Try to trace directly inside the blue lines.'
      }
    },
    clear() {
      clearCanvas()
    }
  }))

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    drawing.current = true
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    lastPos.current = pos
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e, canvas)
    
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = '#FF6B6B'
    ctx.lineWidth = 10
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.setLineDash([])
    ctx.stroke()
    
    // Draw on offscreen user canvas too
    const uCanvas = userCanvasRef.current
    const last = lastPos.current
    if (uCanvas && last) {
      const uCtx = uCanvas.getContext('2d')!
      const scaleX = 120 / canvas.width
      const scaleY = 120 / canvas.height
      uCtx.beginPath()
      uCtx.moveTo(last.x * scaleX, last.y * scaleY)
      uCtx.lineTo(pos.x * scaleX, pos.y * scaleY)
      uCtx.strokeStyle = '#000'
      uCtx.lineWidth = 12
      uCtx.lineCap = 'round'
      uCtx.lineJoin = 'round'
      uCtx.stroke()
    }
    
    lastPos.current = pos
  }

  const stopDraw = () => { drawing.current = false }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    drawGuide(ctx, canvas.width, canvas.height)
    setCleared(true)
    setTimeout(() => setCleared(false), 1000)
    
    const uCanvas = userCanvasRef.current
    if (uCanvas) {
      const uCtx = uCanvas.getContext('2d')!
      uCtx.clearRect(0, 0, 120, 120)
    }
  }

  return (
    <div className="trace-container">
      <canvas
        ref={canvasRef}
        className="trace-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <p className="trace-hint"><PenToolIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> Trace the letter with your finger or mouse!</p>
      <button className="btn btn-outline trace-clear" onClick={clearCanvas}>
        {cleared ? (
          <><CheckIcon size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> Cleared!</>
        ) : (
          <><TrashIcon size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> Clear</>
        )}
      </button>
    </div>
  )
})

// ── Spelling Game for Ages 6-8 (Word Adventurers) ──────────────────────────
function SpellingGame({
  letter,
  data,
  onSolved,
  playSound
}: {
  letter: string
  data: any
  onSolved: () => void
  playSound: any
}) {
  const [guess, setGuess] = useState<string[]>([])
  const [solved, setSolved] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    setGuess([])
    setSolved(false)
    setWrong(false)

    const correct = data.missingLetters
    const distractors = ['s', 't', 'k', 'm', 'r', 'o', 'e', 'u', 'y', 'w', 'h', 'n'].filter(
      l => !correct.includes(l) && l !== letter.toLowerCase()
    )
    const pool = [...correct, distractors[0], distractors[1]].sort(() => Math.random() - 0.5)
    setChoices(pool)
  }, [letter, data])

  const handleSelectLetter = (char: string) => {
    if (solved || wrong) return
    playSound('pop')
    const nextGuess = [...guess, char]
    setGuess(nextGuess)

    if (nextGuess.length === data.missingLetters.length) {
      const isCorrect = nextGuess.every((val, index) => val === data.missingLetters[index])
      if (isCorrect) {
        setSolved(true)
        playSound('success')
        onSolved()
      } else {
        setWrong(true)
        setTimeout(() => {
          setGuess([])
          setWrong(false)
        }, 1200)
      }
    }
  }

  const patternParts = data.missingPattern.split(' ')
  let blankIndex = 0

  return (
    <div className="alphabet-game-card spelling-game">
      <h4>🐝 Spelling Challenge</h4>
      <p>Tap the correct letters to fill the blanks!</p>

      <div className="spelling-word-display">
        {patternParts.map((part: string, idx: number) => {
          if (part === '_') {
            const filledChar = guess[blankIndex]
            blankIndex++
            return (
              <span key={idx} className={`spelling-char blank ${wrong ? 'wrong' : ''} ${solved ? 'solved' : ''}`}>
                {filledChar || ''}
              </span>
            )
          }
          return <span key={idx} className="spelling-char letter">{part}</span>
        })}
      </div>

      {solved ? (
        <div className="game-success-message">
          <SparklesIcon size={18} style={{ marginRight: '6px' }} /> Correct! <strong>{data.word}</strong> is spelled correctly!
        </div>
      ) : wrong ? (
        <div className="game-wrong-message">Try again! Resetting...</div>
      ) : (
        <div className="spelling-choices">
          {choices.map((char, idx) => (
            <button key={idx} className="btn letter-choice-btn" onClick={() => handleSelectLetter(char)}>
              {char}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Word Unscramble Game for Ages 9-10 (English Champions) ──────────────────
function UnscrambleGame({
  letter,
  data,
  onSolved,
  playSound
}: {
  letter: string
  data: any
  onSolved: () => void
  playSound: any
}) {
  const [guess, setGuess] = useState<string[]>([])
  const [solved, setSolved] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [scrambledPool, setScrambledPool] = useState<{ id: number; char: string; used: boolean }[]>([])

  useEffect(() => {
    setGuess([])
    setSolved(false)
    setWrong(false)

    const chars = data.unscrambleWord.split(' ').filter((c: string) => c.trim() !== '')
    const pool = chars.map((char: string, idx: number) => ({
      id: idx,
      char,
      used: false
    }))
    setScrambledPool(pool)
  }, [letter, data])

  const handleTileClick = (item: { id: number; char: string; used: boolean }) => {
    if (solved || wrong || item.used) return
    playSound('pop')

    setScrambledPool(prev => prev.map(p => p.id === item.id ? { ...p, used: true } : p))
    const nextGuess = [...guess, item.char]
    setGuess(nextGuess)

    const targetWordUpper = data.word.toUpperCase()
    if (nextGuess.length === targetWordUpper.length) {
      const spelledWord = nextGuess.join('')
      if (spelledWord === targetWordUpper) {
        setSolved(true)
        playSound('success')
        onSolved()
      } else {
        setWrong(true)
        setTimeout(() => {
          setGuess([])
          setWrong(false)
          setScrambledPool(prev => prev.map(p => ({ ...p, used: false })))
        }, 1200)
      }
    }
  }

  const handleReset = () => {
    playSound('click')
    setGuess([])
    setWrong(false)
    setScrambledPool(prev => prev.map(p => ({ ...p, used: false })))
  }

  return (
    <div className="alphabet-game-card unscramble-game">
      <h4>🧩 Vocabulary Unscramble</h4>
      <p>Tap the letter tiles in order to spell the word!</p>

      <div className="unscramble-slots">
        {data.word.split('').map((_: string, idx: number) => {
          const char = guess[idx]
          return (
            <span key={idx} className={`unscramble-slot ${wrong ? 'wrong' : ''} ${solved ? 'solved' : ''}`}>
              {char || ''}
            </span>
          )
        })}
      </div>

      {solved ? (
        <div className="game-success-message">
          <TrophyIcon size={18} style={{ marginRight: '6px' }} /> Spectacular! You spelled <strong>{data.word}</strong>!
        </div>
      ) : wrong ? (
        <div className="game-wrong-message">Try again! Resetting...</div>
      ) : (
        <>
          <div className="unscramble-pool">
            {scrambledPool.map((item) => (
              <button
                key={item.id}
                className={`letter-tile ${item.used ? 'used' : ''}`}
                onClick={() => handleTileClick(item)}
                disabled={item.used}
              >
                {item.char}
              </button>
            ))}
          </div>
          <button className="btn btn-outline btn-sm reset-btn" onClick={handleReset}>
            🔄 Reset
          </button>
        </>
      )}
    </div>
  )
}

// ── Main Alphabet Page ─────────────────────────────────────────────────────
export default function Alphabet() {
  const [selected, setSelected] = useState(0)
  const [mode, setMode] = useState<'upper' | 'lower' | 'trace'>('upper')
  const [showReward, setShowReward] = useState(false)
  const { profile, completeLesson, isLessonCompleted, isYoungMode, playSound } = useProgress()
  const [traceFeedback, setTraceFeedback] = useState<{
    type: 'success' | 'error' | null
    message: string | null
  }>({ type: null, message: null })

  const traceCanvasRef = useRef<any>(null)

  const letter = alphabetData[selected]
  const lessonId = `alpha-${letter.letter}`
  const alreadyLearned = isLessonCompleted(lessonId)
  const ageGroup = profile.ageGroup || '6-8'

  // Fetch current letter data for the specific age group
  const ageData = alphabetAgeData[letter.letter]

  const completedCount = alphabetData.filter(l => isLessonCompleted(`alpha-${l.letter}`)).length

  // Clear trace feedback when letter or mode changes
  useEffect(() => {
    setTraceFeedback({ type: null, message: null })
  }, [selected, mode])

  const handleSpeak = () => {
    playSound('click')
    if (ageGroup === '3-5') {
      speak(`${ageData['3-5'].phonics}. ${ageData['3-5'].fact}`)
    } else if (ageGroup === '9-10') {
      speak(`${ageData['9-10'].word}. Definition: ${ageData['9-10'].definition}. Sentence: ${ageData['9-10'].sentence}`)
    } else {
      // 6-8
      speak(`${ageData['6-8'].word}. Sentence: ${ageData['6-8'].sentence}`)
    }
  }

  const handleComplete = () => {
    if (alreadyLearned) return
    const wasNew = completeLesson(lessonId, 10)
    if (wasNew) {
      playSound('success')
      const newCompletedCount = completedCount + 1
      const isMilestone = newCompletedCount > 0 && (newCompletedCount % 5 === 0 || newCompletedCount === 26)
      if (isMilestone) {
        setShowReward(true)
      }
    }
  }

  const handleNextLetter = () => {
    playSound('click')
    const nextIndex = (selected + 1) % alphabetData.length
    setSelected(nextIndex)
    speak(alphabetData[nextIndex].letter)
    setTraceFeedback({ type: null, message: null })
  }

  const handleCheckTrace = () => {
    if (!traceCanvasRef.current) return
    const res = traceCanvasRef.current.checkTrace()
    if (res.isValid) {
      playSound('success')
      setTraceFeedback({ type: 'success', message: '🎉 Wonderful tracing! You did it!' })
      const wasNew = completeLesson(lessonId, 10)
      if (wasNew) {
        const newCompletedCount = completedCount + 1
        const isMilestone = newCompletedCount > 0 && (newCompletedCount % 5 === 0 || newCompletedCount === 26)
        if (isMilestone) {
          setShowReward(true)
        }
      }
    } else {
      playSound('wrong')
      setTraceFeedback({ type: 'error', message: `❌ ${res.message}` })
    }
  }

  // Visual header subtitle based on age selection
  const getHeaderSubtitle = () => {
    switch (ageGroup) {
      case '3-5':
        return 'Alphabet Village - Young Explorers (Ages 3-5)'
      case '9-10':
        return 'Alphabet Village - English Champions (Ages 9-10)'
      default:
        return 'Alphabet Village - Word Adventurers (Ages 6-8)'
    }
  }

  return (
    <div className="alphabet-page">
      <div className="page-header">
        <h1>
          <LanguagesIcon size={28} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />{' '}
          Alphabet Adventure
        </h1>
        <p className="age-group-subtitle">{getHeaderSubtitle()}</p>
        <div className="alphabet-progress-badge">
          <StarIcon size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />{' '}
          {completedCount} / 26 Letters Learned
        </div>
      </div>

      <div className="mode-tabs">
        {(['upper', 'lower', 'trace'] as const).map(m => (
          <button key={m} className={`btn ${mode === m ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode(m)}>
            {m === 'upper' ? 'ABC' : m === 'lower' ? 'abc' : <><PenToolIcon size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> Trace</>}
          </button>
        ))}
      </div>

      <div className="alphabet-main card">
        <div className="letter-display">
          {mode === 'trace' ? (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TraceCanvas ref={traceCanvasRef} letter={letter.letter} />
              {traceFeedback.message && (
                <div className={`trace-feedback-banner ${traceFeedback.type}`} style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  backgroundColor: traceFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  color: traceFeedback.type === 'success' ? '#059669' : '#DC2626',
                  border: `1.5px solid ${traceFeedback.type === 'success' ? '#10B981' : '#F87171'}`,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                  maxWidth: '300px'
                }}>
                  {traceFeedback.message}
                </div>
              )}
            </div>
          ) : (
            <span className={`big-letter ${isYoungMode() ? 'young' : ''}`}>
              {ageGroup === '3-5' ? (
                `${letter.letter} ${letter.lowercase}`
              ) : mode === 'upper' ? (
                letter.letter
              ) : (
                letter.lowercase
              )}
            </span>
          )}

          {mode !== 'trace' && (
            <>
              {/* Young Explorers layout */}
              {ageGroup === '3-5' && (
                <div className="age-young-content">
                  <span className="letter-emoji">{ageData['3-5'].emoji}</span>
                  <h2>{ageData['3-5'].word}</h2>
                  <div className="age-info-bubble young-bubble">
                    <strong>Phonics:</strong> {ageData['3-5'].phonics}
                  </div>
                  <div className="age-info-bubble young-fact">
                    💡 {ageData['3-5'].fact}
                  </div>
                </div>
              )}

              {/* Word Adventurers layout */}
              {ageGroup === '6-8' && (
                <div className="age-middle-content">
                  <span className="letter-emoji">{ageData['6-8'].emoji}</span>
                  <h2>{ageData['6-8'].word}</h2>
                  <p className="age-sentence">
                    📝 <em>"{ageData['6-8'].sentence}"</em>
                  </p>
                  <SpellingGame
                    key={letter.letter}
                    letter={letter.letter}
                    data={ageData['6-8']}
                    onSolved={handleComplete}
                    playSound={playSound}
                  />
                </div>
              )}

              {/* English Champions layout */}
              {ageGroup === '9-10' && (
                <div className="age-advanced-content">
                  <span className="letter-emoji">{ageData['9-10'].emoji}</span>
                  <h2>{ageData['9-10'].word}</h2>
                  <div className="age-definition">
                    <strong>Definition:</strong> {ageData['9-10'].definition}
                  </div>
                  <p className="age-sentence">
                    📝 <em>"{ageData['9-10'].sentence}"</em>
                  </p>
                  <UnscrambleGame
                    key={letter.letter}
                    letter={letter.letter}
                    data={ageData['9-10']}
                    onSolved={handleComplete}
                    playSound={playSound}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="letter-actions">
          <button className={`btn btn-secondary ${isYoungMode() ? 'btn-young' : ''}`} onClick={handleSpeak}>
            <VolumeIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> Hear Sound
          </button>
          
          {mode === 'trace' ? (
            <button className="btn btn-primary" onClick={handleCheckTrace} disabled={traceFeedback.type === 'success'}>
              {traceFeedback.type === 'success' ? (
                <><CheckIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> Already Traced!</>
              ) : (
                <><PenToolIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> Check My Tracing</>
              )}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleComplete} disabled={alreadyLearned}>
              {alreadyLearned ? (
                <><CheckIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> Already Learned!</>
              ) : (
                <><CheckIcon size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} /> I Learned This Letter!</>
              )}
            </button>
          )}

          <button className="btn btn-success" onClick={handleNextLetter} style={{
            backgroundColor: '#48BB78',
            color: '#FFF',
            borderColor: '#38A169',
            boxShadow: '0 4px 0 #2F855A'
          }}>
            Next Letter ➔
          </button>
        </div>
      </div>

      <div className="letter-grid">
        {alphabetData.map((l, i) => {
          const item = alphabetAgeData[l.letter]
          const emoji = ageGroup === '3-5' ? item['3-5'].emoji : ageGroup === '9-10' ? item['9-10'].emoji : item['6-8'].emoji
          return (
            <button
              key={l.letter}
              className={`letter-card ${selected === i ? 'active' : ''}`}
              onClick={() => { setSelected(i); speak(l.letter) }}
            >
              <span>{l.letter}</span>
              <small>{emoji}</small>
            </button>
          )
        })}
      </div>

      {showReward && <RewardModal onClose={() => setShowReward(false)} />}
    </div>
  )
}
