import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { buddies, seasonalEvents } from '../data/content'
import './Home.css'

export default function Home() {
  const { profile, progress, getLevelName, getLevelProgress } = useProgress()
  const buddy = buddies.find(b => b.id === profile.buddy)

  return (
    <div className="home-page">
      <motion.section
        className="hero card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <h1>Learn English the Fun Way!</h1>
            <p className="hero-sub">
              Stories, Games, Speaking Practice, Worksheets, Rewards, and Daily Challenges for Kids.
            </p>
            <div className="hero-buttons">
              <Link to="/alphabet" className="btn btn-primary btn-large">Start Learning</Link>
              <Link to="/stories" className="btn btn-secondary btn-large">Explore Stories</Link>
              <Link to="/games" className="btn btn-outline btn-large">Play Games</Link>
            </div>
          </div>
          <div className="hero-mascots">
            <span className="mascot bounce">🐰</span>
            <span className="mascot bounce delay-1">🦉</span>
            <span className="mascot bounce delay-2">🐦</span>
          </div>
        </div>
      </motion.section>

      {profile.name && (
        <section className="welcome-banner card">
          <span className="buddy-emoji">{buddy?.emoji}</span>
          <div>
            <h2>Hello, {profile.name}! 👋</h2>
            <p>{buddy?.name} is excited to learn with you today!</p>
          </div>
          <div className="welcome-stats">
            <div><strong>{progress.xp}</strong> XP</div>
            <div><strong>{progress.stars}</strong> ⭐</div>
            <div><strong>{progress.streak}</strong> 🔥 streak</div>
          </div>
        </section>
      )}

      <section className="progress-section card">
        <h2 className="section-title">🗺️ Your Learning Path</h2>
        <div className="level-info">
          <span className="level-badge">Level {progress.level}</span>
          <span>{getLevelName()}</span>
        </div>
        <div className="progress-bar" style={{ margin: '1rem 0' }}>
          <div className="progress-bar-fill" style={{ width: `${getLevelProgress()}%` }} />
        </div>
        <div className="levels-grid">
          {['Beginner Explorer', 'Word Adventurer', 'Reading Hero', 'Vocabulary Master', 'English Champion'].map((name, i) => (
            <div key={name} className={`level-step ${progress.level > i ? 'completed' : progress.level === i + 1 ? 'current' : ''}`}>
              <span className="level-num">{i + 1}</span>
              <span className="level-name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="quick-links">
        <h2 className="section-title">🌈 Explore Learning</h2>
        <div className="card-grid">
          {[
            { to: '/alphabet', emoji: '🔤', title: 'Alphabet', desc: 'A–Z letters & tracing' },
            { to: '/phonics', emoji: '🔊', title: 'Phonics', desc: 'Letter sounds & blending' },
            { to: '/stories', emoji: '📚', title: 'Stories', desc: 'Read-along adventures' },
            { to: '/vocabulary', emoji: '📝', title: 'Vocabulary', desc: 'Flashcards & dictionary' },
            { to: '/speaking', emoji: '🗣️', title: 'Speaking', desc: 'Practice pronunciation' },
            { to: '/games', emoji: '🎮', title: 'Games', desc: 'Fun learning games' },
            { to: '/coloring', emoji: '🎨', title: 'Coloring Studio', desc: 'Creative art time' },
            { to: '/story-creator', emoji: '✨', title: 'Create Story', desc: 'Make your own tale' },
          ].map(item => (
            <Link key={item.to} to={item.to} className="card quick-card">
              <span className="quick-emoji">{item.emoji}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="seasonal-section">
        <h2 className="section-title">🎉 Seasonal Events</h2>
        <div className="card-grid">
          {seasonalEvents.map(event => (
            <div key={event.id} className="card seasonal-card">
              <span className="seasonal-emoji">{event.emoji}</span>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <Link to="/challenges" className="btn btn-outline">Join Challenge</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
