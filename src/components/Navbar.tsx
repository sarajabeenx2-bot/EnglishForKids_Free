import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Home', emoji: '🏠', exact: true },
  { path: '/alphabet', label: 'Alphabet', emoji: '🔤' },
  { path: '/phonics', label: 'Phonics', emoji: '🔊' },
  { path: '/stories', label: 'Stories', emoji: '📚' },
  { path: '/vocabulary', label: 'Vocabulary', emoji: '📝' },
  { path: '/speaking', label: 'Speaking', emoji: '🗣️' },
  { path: '/grammar', label: 'Grammar', emoji: '📖' },
  { path: '/spelling', label: 'Spelling', emoji: '✍️' },
  { path: '/games', label: 'Games', emoji: '🎮' },
  { path: '/challenges', label: 'Challenges', emoji: '🏆' },
  { path: '/rewards', label: 'Rewards', emoji: '⭐' },
  { path: '/coloring', label: 'Coloring', emoji: '🎨' },
  { path: '/gallery', label: 'Gallery', emoji: '🖼️' },
  { path: '/worksheets', label: 'Worksheets', emoji: '📄' },
  { path: '/parent', label: 'Parent Zone', emoji: '👨‍👩‍👧' },
]

function isNavActive(pathname: string, path: string, exact?: boolean) {
  if (exact) return pathname === path
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { profile, progress, getLevelName, getLevelProgress } = useProgress()

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-emoji">🌻</span>
          <span className="brand-text">EnglishForKidsFree</span>
        </Link>

        <div className="navbar-stats">
          <span className="xp-badge">⭐ {progress.stars}</span>
          <span className="xp-badge">✨ {progress.xp} XP</span>
          {profile.name && <span className="user-greeting">Hi, {profile.name}!</span>}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>

        <div className={`navbar-menu ${open ? 'open' : ''}`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isNavActive(location.pathname, item.path, item.exact) ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span>{item.emoji}</span> {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="level-bar">
        <span className="level-label">{getLevelName()}</span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div className="progress-bar-fill" style={{ width: `${getLevelProgress()}%` }} />
        </div>
      </div>
    </nav>
  )
}
