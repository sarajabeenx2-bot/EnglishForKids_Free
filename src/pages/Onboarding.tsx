import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GardenBackground from '../components/GardenBackground'
import { useProgress } from '../context/ProgressContext'
import { buddies, favoriteColors } from '../data/content'
import type { AgeGroup, Buddy } from '../types'
import { speak } from '../utils/speech'
import './Onboarding.css'

type Step = 'age' | 'name' | 'color' | 'buddy'

export default function Onboarding() {
  const navigate = useNavigate()
  const { completeOnboarding } = useProgress()
  const [step, setStep] = useState<Step>('age')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('6-8')
  const [name, setName] = useState('')
  const [color, setColor] = useState('#FFD93D')
  const [buddy, setBuddy] = useState<Buddy>('rabbit')

  const isYoung = ageGroup === '3-5'

  const handleAgeSelect = (age: AgeGroup) => {
    setAgeGroup(age)
    if (age === '3-5') speak('Welcome! Let us learn together!')
    setStep('name')
  }

  const handleFinish = () => {
    completeOnboarding({ name, ageGroup, favoriteColor: color, buddy, onboarded: true })
    navigate('/')
  }

  const goBack = () => {
    const order: Step[] = ['age', 'name', 'color', 'buddy']
    const idx = order.indexOf(step)
    if (idx > 0) setStep(order[idx - 1])
  }

  return (
    <div className={`onboarding ${isYoung ? 'young-mode' : ''}`}>
      <GardenBackground />
      <div className="onboarding-content">
        <motion.div
          className="onboarding-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <span>🌻</span>
          <h1>EnglishForKidsFree</h1>
          <p>Learn English the Fun Way!</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step !== 'age' && (
            <button type="button" className="onboarding-back btn btn-outline" onClick={goBack}>← Back</button>
          )}
          {step === 'age' && (
            <motion.div key="age" className="onboarding-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2>Choose Your Age</h2>
              <p>We will make learning just right for you!</p>
              <div className="age-buttons">
                <button className="btn btn-primary btn-large age-btn" onClick={() => handleAgeSelect('3-5')}>
                  <span className="age-emoji">🧸</span>
                  <span>3–5 Years</span>
                  <small>Parent-assisted • Big buttons • Audio help</small>
                </button>
                <button className="btn btn-secondary btn-large age-btn" onClick={() => handleAgeSelect('6-8')}>
                  <span className="age-emoji">📚</span>
                  <span>6–8 Years</span>
                  <small>Standard learning mode</small>
                </button>
                <button className="btn btn-outline btn-large age-btn" onClick={() => handleAgeSelect('9-10')}>
                  <span className="age-emoji">🚀</span>
                  <span>9–10 Years</span>
                  <small>Advanced learning mode</small>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div key="name" className="onboarding-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2>Welcome! What's your name?</h2>
              <input
                type="text"
                className="onboarding-input"
                placeholder="Type your name here..."
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                autoFocus
              />
              {isYoung && (
                <button className="btn btn-outline" onClick={() => speak("What is your name? Type it here!")}>
                  🔊 Hear Instructions
                </button>
              )}
              <button className="btn btn-primary btn-large" disabled={!name.trim()} onClick={() => setStep('color')}>
                Next →
              </button>
            </motion.div>
          )}

          {step === 'color' && (
            <motion.div key="color" className="onboarding-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2>Pick your favourite colour, {name}!</h2>
              <div className="color-grid">
                {favoriteColors.map(c => (
                  <button
                    key={c.value}
                    className={`color-swatch ${color === c.value ? 'selected' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setColor(c.value)}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <button className="btn btn-primary btn-large" onClick={() => setStep('buddy')}>
                Next →
              </button>
            </motion.div>
          )}

          {step === 'buddy' && (
            <motion.div key="buddy" className="onboarding-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2>Meet your learning buddy!</h2>
              <div className="buddy-grid">
                {buddies.map(b => (
                  <button
                    key={b.id}
                    className={`buddy-card ${buddy === b.id ? 'selected' : ''}`}
                    onClick={() => { setBuddy(b.id); speak(b.greeting) }}
                  >
                    <span className="buddy-emoji">{b.emoji}</span>
                    <span className="buddy-name">{b.name}</span>
                    <span className="buddy-greeting">{b.greeting}</span>
                  </button>
                ))}
              </div>
              <button className="btn btn-primary btn-large" onClick={handleFinish}>
                Start Learning! 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
