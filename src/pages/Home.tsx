import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { buddies, seasonalEvents } from '../data/content'
import {
  CompassIcon,
  LockIcon,
  UnlockIcon,
  SunIcon,
  SnowflakeIcon,
  MoonIcon,
  GiftIcon,
  FlameIcon,
  StarIcon,
  VolumeIcon,
  LibraryIcon,
  LanguagesIcon,
  PuzzleIcon,
  SpellCheckIcon,
  MicIcon,
  RocketIcon,
  TreehouseIcon,
  SparklesIcon,
  CloudIcon,
  WavesIcon,
  MapIcon
} from '../components/CartoonIcons'
import './Home.css'

const worlds = [
  {
    id: 'alphabet',
    name: 'Alphabet Village',
    desc: 'Learn letters, letter tracing, and alphabet games',
    path: '/alphabet',
    theme: 'village',
  },
  {
    id: 'phonics',
    name: 'Phonics Forest',
    desc: 'Learn sounds, blending practice, and forest activities',
    path: '/phonics',
    theme: 'forest',
  },
  {
    id: 'stories',
    name: 'Story Kingdom',
    desc: 'Read stories, unlock books, and earn story gems',
    path: '/stories',
    theme: 'kingdom',
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary Valley',
    desc: 'Learn new words, complete quests, and collect treasures',
    path: '/vocabulary',
    theme: 'valley',
  },
  {
    id: 'speaking',
    name: 'Speaking Mountain',
    desc: 'Pronunciation challenges, voice missions, and voice crystals',
    path: '/speaking',
    theme: 'mountain',
  },
  {
    id: 'grammar',
    name: 'Grammar Castle',
    desc: 'Grammar lessons, grammar monsters, and castle rooms',
    path: '/grammar',
    theme: 'castle',
  },
  {
    id: 'space',
    name: 'English Space Station',
    desc: 'Advanced challenges, achievements, and space rewards',
    path: '/challenges',
    theme: 'space',
  },
]

export default function Home() {
  const { profile, progress, getLevelName, getLevelProgress } = useProgress()
  const buddy = buddies.find(b => b.id === profile.buddy)

  const completedAlphabet = progress.completedLessons.filter(id => id.startsWith('alpha-')).length
  const completedPhonics = progress.completedLessons.includes('phonics-complete')
  const completedStoriesCount = progress.completedLessons.filter(id => id.startsWith('story-') || ['brave-bunny', 'sharing-owl', 'river-adventure', 'sleepy-moon', 'colors-rainbow'].includes(id)).length
  const completedVocabCount = progress.completedLessons.filter(id => id.startsWith('vocab-')).length
  const completedSpeakingCount = progress.completedLessons.filter(id => id.startsWith('speaking-') || id === 'speaking-practice').length
  const completedGrammarCount = progress.completedLessons.filter(id => id.startsWith('grammar-')).length

  const completedStories = completedStoriesCount >= 1
  const completedVocab = completedVocabCount >= 3
  const completedSpeaking = completedSpeakingCount >= 2
  const completedGrammar = completedGrammarCount >= 1

  const isWorldCompleted = (id: string): boolean => {
    if (id === 'alphabet') return completedAlphabet >= 3
    if (id === 'phonics') return completedPhonics
    if (id === 'stories') return completedStories
    if (id === 'vocabulary') return completedVocab
    if (id === 'speaking') return completedSpeaking
    if (id === 'grammar') return completedGrammar
    return false
  }

  const isWorldUnlocked = (id: string): boolean => {
    if (id === 'alphabet') return true
    if (id === 'phonics') return completedAlphabet >= 3
    if (id === 'stories') return completedAlphabet >= 3 && completedPhonics
    if (id === 'vocabulary') return completedAlphabet >= 3 && completedPhonics && completedStories
    if (id === 'speaking') return completedAlphabet >= 3 && completedPhonics && completedStories && completedVocab
    if (id === 'grammar') return completedAlphabet >= 3 && completedPhonics && completedStories && completedVocab && completedSpeaking
    if (id === 'space') return completedAlphabet >= 3 && completedPhonics && completedStories && completedVocab && completedSpeaking && completedGrammar
    return false
  }

  const getWorldPercentage = (id: string): number => {
    if (id === 'alphabet') return Math.min(100, Math.round((completedAlphabet / 3) * 100))
    if (id === 'phonics') return completedPhonics ? 100 : 0
    if (id === 'stories') return completedStories ? 100 : 0
    if (id === 'vocabulary') return Math.min(100, Math.round((completedVocabCount / 3) * 100))
    if (id === 'speaking') return Math.min(100, Math.round((completedSpeakingCount / 2) * 100))
    if (id === 'grammar') return completedGrammar ? 100 : 0
    return 0
  }

  // Get next locked world name
  const getNextUnlock = () => {
    if (completedAlphabet < 3) return 'Complete 3 Alphabet letters'
    if (!completedPhonics) return 'Complete Phonics Forest sound set'
    if (!completedStories) return 'Complete at least 1 Story reading'
    if (!completedVocab) return 'Learn 3 Vocabulary words'
    if (!completedSpeaking) return 'Practice 2 Speaking recordings'
    if (!completedGrammar) return 'Complete at least 1 Grammar lesson'
    return null
  }

  // Character guide greeting text based on progress
  const getGuideBubbleText = () => {
    if (completedAlphabet < 3) {
      return `Hi, ${profile.name || 'Friend'}! 🐰 I'm Ruby Rabbit! Let's start our adventure in Alphabet Village! Complete 3 letters to unlock Phonics Forest!`
    }
    if (!completedPhonics) {
      return `Chirp chirp! 🐦 I'm Bella Bird! You unlocked Phonics Forest! Let's learn to blend letter sounds today!`
    }
    if (!completedStories) {
      return `Hello! 🦉 I'm Ollie Owl! Ready to read magical tales in Story Kingdom? Let's check out our first book!`
    }
    return `Wow! 🚀 You are doing amazing, ${profile.name}! Keep earning XP to upgrade your Treehouse!`
  }

  const getWorldIcon = (id: string) => {
    switch (id) {
      case 'alphabet': return <LanguagesIcon className="world-icon-svg" />
      case 'phonics': return <VolumeIcon className="world-icon-svg" />
      case 'stories': return <LibraryIcon className="world-icon-svg" />
      case 'vocabulary': return <SpellCheckIcon className="world-icon-svg" />
      case 'speaking': return <MicIcon className="world-icon-svg" />
      case 'grammar': return <PuzzleIcon className="world-icon-svg" />
      case 'space': return <RocketIcon className="world-icon-svg" />
      default: return <CompassIcon className="world-icon-svg" />
    }
  }

  const getSeasonalIcon = (id: string) => {
    switch (id) {
      case 'summer': return <SunIcon className="seasonal-icon-svg" />
      case 'winter': return <SnowflakeIcon className="seasonal-icon-svg" />
      case 'ramadan': return <MoonIcon className="seasonal-icon-svg" />
      case 'holiday': return <GiftIcon className="seasonal-icon-svg" />
      default: return <SparklesIcon className="seasonal-icon-svg" />
    }
  }

  return (
    <div className="home-page">
      {/* Dynamic drifting clouds in background */}
      <div className="map-sky-clouds no-print">
        <div className="drift-cloud cloud-a"><CloudIcon size={48} /></div>
        <div className="drift-cloud cloud-b"><CloudIcon size={54} /></div>
        <div className="drift-cloud cloud-c"><CloudIcon size={44} /></div>
      </div>

      <motion.section
        className="hero card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <h1>Learn English Through Adventure!</h1>
            <p className="hero-sub">
              Explore magical worlds, unlock treasures, earn rewards, and become an English Champion.
            </p>
            <div className="hero-buttons">
              <a href="#world-map" className="btn btn-primary btn-large">Start Adventure</a>
              <Link to="/treehouse" className="btn btn-secondary btn-large"><TreehouseIcon size={18} style={{ marginRight: '6px' }} /> My Treehouse</Link>
              <Link to="/story-creator" className="btn btn-outline btn-large"><SparklesIcon size={18} style={{ marginRight: '6px' }} /> Story Creator</Link>
            </div>
          </div>
          <div className="hero-mascots">
            <span className="mascot bounce">🐰</span>
            <span className="mascot bounce delay-1">🦉</span>
            <span className="mascot bounce delay-2">🐦</span>
          </div>
        </div>
      </motion.section>

      {/* Guide Character Banner */}
      <section className="character-guide-banner card">
        <div className="guide-character wave">
          {completedAlphabet < 3 ? '🐰' : !completedPhonics ? '🐦' : '🦉'}
        </div>
        <div className="guide-bubble">
          <p>{getGuideBubbleText()}</p>
        </div>
      </section>

      {/* Welcome Banner */}
      {profile.name && (
        <section className="welcome-banner card">
          <span className="buddy-emoji">{buddy?.emoji}</span>
          <div>
            <h2>Hello, {profile.name}! 👋</h2>
            <p>Welcome back to your adventure journey!</p>
          </div>
          <div className="welcome-stats">
            <div><strong>{progress.xp}</strong> XP</div>
            <div><strong>{progress.stars}</strong> <StarIcon size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></div>
            <div><strong>{progress.streak}</strong> <FlameIcon size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /> streak</div>
          </div>
        </section>
      )}

      {/* Progress & Milestone info */}
      <section className="progress-section card">
        <h2 className="section-title"><MapIcon size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Learning Journey</h2>
        <div className="level-info">
          <span className="level-badge">Level {progress.level}</span>
          <span>{getLevelName()}</span>
        </div>
        <div className="progress-bar" style={{ margin: '1rem 0' }}>
          <div className="progress-bar-fill" style={{ width: `${getLevelProgress()}%` }} />
        </div>
        {getNextUnlock() && (
          <p className="next-unlock-hint">
            <UnlockIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            <strong>Next Milestone:</strong> {getNextUnlock()}
          </p>
        )}
      </section>

      {/* Interactive World Map */}
      <section id="world-map" className="adventure-map-section card">
        <h2 className="section-title"><CompassIcon size={28} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Interactive Adventure Map</h2>
        <p className="map-subtitle font-display">Journey through the lands from Alphabet Village to English Space Station!</p>
        
        <div className="adventure-map-container">
          {/* Animated river in background */}
          <div className="map-river"><WavesIcon size={36} className="river-icon" /></div>

          <div className="map-path-wind">
            {worlds.map((world, idx) => {
              const unlocked = isWorldUnlocked(world.id)
              const completed = isWorldCompleted(world.id)
              const percentage = getWorldPercentage(world.id)
              
              return (
                <div 
                  key={world.id} 
                  className={`map-node-container node-${world.theme} ${idx % 2 === 0 ? 'align-left' : 'align-right'}`}
                >
                  {/* Path connector line */}
                  {idx < worlds.length - 1 && <div className="path-connector" />}
                  
                  <div className={`map-world-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}>
                    <span className="world-emoji float-anim">{getWorldIcon(world.id)}</span>
                    
                    <div className="world-info">
                      <h3>{world.name}</h3>
                      <p className="world-desc">{world.desc}</p>
                      
                      {unlocked ? (
                        <>
                          <div className="world-progress-container">
                            <div className="world-progress-bar">
                              <div className="world-progress-fill" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="world-percentage-text">{percentage}% Done</span>
                          </div>
                          <Link to={world.path} className="btn btn-sm btn-primary node-go-btn">
                            {completed ? '🌟 Enter World (Done)' : '🚀 Enter World'}
                          </Link>
                        </>
                      ) : (
                        <div className="lock-overlay">
                          <span className="lock-icon"><LockIcon size={16} style={{ marginRight: '4px' }} /> Locked</span>
                          <span className="lock-condition">Complete previous world</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="seasonal-section">
        <h2 className="section-title"><SparklesIcon size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Seasonal Events</h2>
        <div className="card-grid">
          {seasonalEvents.map(event => (
            <div key={event.id} className="card seasonal-card">
              <span className="seasonal-emoji">{getSeasonalIcon(event.id)}</span>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              {event.challenges && (
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7B5EA7', marginBottom: '8px' }}>
                  🎯 {event.challenges.length} Creative Challenges Inside
                </p>
              )}
              <Link to="/challenges" className="btn btn-outline">View Challenges →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
