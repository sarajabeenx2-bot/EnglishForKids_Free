import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { stories, vocabulary, games, worksheets } from '../data/content'
import './SearchBar.css'

interface SearchResult {
  title: string
  path: string
  type: string
  emoji: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    const items: SearchResult[] = []

    stories.filter(s => s.title.toLowerCase().includes(q)).forEach(s =>
      items.push({ title: s.title, path: `/stories/${s.id}`, type: 'Story', emoji: '📚' })
    )
    vocabulary.filter(v => v.word.includes(q) || v.meaning.toLowerCase().includes(q)).forEach(v =>
      items.push({ title: v.word, path: '/vocabulary', type: 'Vocabulary', emoji: v.emoji })
    )
    games.filter(g => g.name.toLowerCase().includes(q)).forEach(g =>
      items.push({ title: g.name, path: `/games/${g.id}`, type: 'Game', emoji: g.emoji })
    )
    worksheets.filter(w => w.title.toLowerCase().includes(q)).forEach(w =>
      items.push({ title: w.title, path: '/worksheets', type: 'Worksheet', emoji: '📄' })
    )

    const lessonPaths = [
      { title: 'Alphabet', path: '/alphabet', keywords: ['alphabet', 'letters', 'abc'] },
      { title: 'Phonics', path: '/phonics', keywords: ['phonics', 'sounds'] },
      { title: 'Speaking', path: '/speaking', keywords: ['speaking', 'pronunciation'] },
      { title: 'Grammar', path: '/grammar', keywords: ['grammar', 'nouns', 'verbs'] },
      { title: 'Spelling', path: '/spelling', keywords: ['spelling', 'spell'] },
      { title: 'Challenges', path: '/challenges', keywords: ['challenge', 'daily'] },
    ]
    lessonPaths.filter(l => l.keywords.some(k => k.includes(q)) || l.title.toLowerCase().includes(q)).forEach(l =>
      items.push({ title: l.title, path: l.path, type: 'Lesson', emoji: '📖' })
    )

    return items.slice(0, 8)
  }, [query])

  const handleSelect = (path: string) => {
    navigate(path)
    setQuery('')
    setFocused(false)
  }

  return (
    <div className="search-container">
      <input
        type="search"
        className="search-box"
        placeholder="🔍 Search lessons, stories, games, vocabulary..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        aria-label="Search"
      />
      {focused && results.length > 0 && (
        <ul className="search-results">
          {results.map((r, i) => (
            <li key={i}>
              <button onClick={() => handleSelect(r.path)}>
                <span>{r.emoji}</span>
                <span className="result-title">{r.title}</span>
                <span className="result-type">{r.type}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
