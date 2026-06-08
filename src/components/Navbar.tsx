import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { Menu, X } from 'lucide-react'
import {
  LogoIcon,
  HomeIcon,
  TreehouseIcon,
  BookOpenIcon,
  VolumeIcon,
  LibraryIcon,
  LanguagesIcon,
  PuzzleIcon,
  SpellCheckIcon,
  MicIcon,
  GamepadIcon,
  TrophyIcon,
  PaintbrushIcon,
  SparklesIcon,
  PrinterIcon,
  UserIcon,
  AwardIcon,
  ImageIcon,
  UsersIcon,
  StarIcon,
  ZapIcon
} from './CartoonIcons'
import './Navbar.css'

const navGroups = [
  {
    label: 'Learn',
    icon: BookOpenIcon,
    path: null,
    items: [
      { path: '/alphabet', label: 'Alphabet', icon: LanguagesIcon, desc: 'A–Z letters' },
      { path: '/phonics', label: 'Phonics', icon: VolumeIcon, desc: 'Letter sounds' },
      { path: '/stories', label: 'Stories', icon: LibraryIcon, desc: 'Read-along' },
      { path: '/vocabulary', label: 'Vocabulary', icon: SpellCheckIcon, desc: 'Flashcards' },
      { path: '/grammar', label: 'Grammar', icon: PuzzleIcon, desc: 'Grammar rules' },
      { path: '/spelling', label: 'Spelling', icon: SpellCheckIcon, desc: 'Spell it right' },
      { path: '/speaking', label: 'Speaking', icon: MicIcon, desc: 'Pronunciation' },
    ],
  },
  {
    label: 'Play',
    icon: GamepadIcon,
    path: null,
    items: [
      { path: '/games', label: 'Games', icon: GamepadIcon, desc: 'Fun mini-games' },
      { path: '/challenges', label: 'Challenges', icon: TrophyIcon, desc: 'Daily challenges' },
    ],
  },
  {
    label: 'Create',
    icon: PaintbrushIcon,
    path: null,
    items: [
      { path: '/coloring', label: 'Coloring Studio', icon: PaintbrushIcon, desc: 'Color & draw' },
      { path: '/story-creator', label: 'Story Creator', icon: SparklesIcon, desc: 'Write your story' },
      { path: '/worksheets', label: 'Worksheets', icon: PrinterIcon, desc: 'Printable sheets' },
    ],
  },
  {
    label: 'Profile',
    icon: UserIcon,
    path: null,
    items: [
      { path: '/rewards', label: 'Rewards', icon: AwardIcon, desc: 'Your rewards' },
      { path: '/gallery', label: 'Gallery', icon: ImageIcon, desc: 'My artwork' },
      { path: '/parent', label: 'Parent Zone', icon: UsersIcon, desc: 'For parents' },
    ],
  },
]

export default function Navbar() {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const location = useLocation()
  const { profile, progress, getLevelName, getLevelProgress } = useProgress()
  const navRef = useRef<HTMLElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on route change
  useEffect(() => {
    setOpenGroup(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  const isGroupActive = (group: typeof navGroups[0]) =>
    group.items.some(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'))

  return (
    <nav className="navbar" ref={navRef} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <LogoIcon className="brand-logo-icon" size={28} />
          <span className="brand-text">EnglishForKids</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-desktop">
          <Link
            to="/"
            className={`nav-pill ${location.pathname === '/' ? 'active' : ''}`}
          >
            <HomeIcon size={18} /> Home
          </Link>
          <Link
            to="/treehouse"
            className={`nav-pill ${location.pathname === '/treehouse' ? 'active' : ''}`}
          >
            <TreehouseIcon size={18} /> My Treehouse
          </Link>

          {navGroups.map(group => {
            const GroupIcon = group.icon
            return (
              <div
                key={group.label}
                className="nav-dropdown-wrap"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className={`nav-pill ${isGroupActive(group) ? 'active' : ''}`}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  aria-expanded={openGroup === group.label}
                >
                  <GroupIcon size={18} /> {group.label}
                  <span className={`nav-chevron ${openGroup === group.label ? 'open' : ''}`}>▾</span>
                </button>

                {openGroup === group.label && (
                  <div className="nav-dropdown">
                    {group.items.map(item => {
                      const ItemIcon = item.icon
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                          <ItemIcon className="dropdown-item-icon" size={20} />
                          <div>
                            <div className="dropdown-label">{item.label}</div>
                            <div className="dropdown-desc">{item.desc}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="navbar-stats">
          <span className="stat-badge"><StarIcon size={16} /> {progress.stars}</span>
          <span className="stat-badge xp"><ZapIcon size={16} /> {progress.xp} XP</span>
          {profile.name && <span className="user-greeting">Hi, {profile.name}!</span>}
        </div>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Level Bar */}
      <div className="level-bar">
        <span className="level-label">{getLevelName()}</span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div className="progress-bar-fill" style={{ width: `${getLevelProgress()}%` }} />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" className={`mobile-link ${location.pathname === '/' ? 'active' : ''}`}>
            <HomeIcon size={18} /> Home
          </Link>
          <Link to="/treehouse" className={`mobile-link ${location.pathname === '/treehouse' ? 'active' : ''}`}>
            <TreehouseIcon size={18} /> My Treehouse
          </Link>
          {navGroups.map(group => {
            const GroupIcon = group.icon
            return (
              <div key={group.label} className="mobile-group">
                <button
                  className={`mobile-group-btn ${isGroupActive(group) ? 'active' : ''}`}
                  onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                >
                  <span><GroupIcon size={18} /> {group.label}</span>
                  <span className={`nav-chevron ${mobileExpanded === group.label ? 'open' : ''}`}>▾</span>
                </button>
                {mobileExpanded === group.label && (
                  <div className="mobile-submenu">
                    {group.items.map(item => {
                      const ItemIcon = item.icon
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`mobile-sub-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                          <ItemIcon size={16} /> {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </nav>
  )
}
