import { useState } from 'react'
import { Link } from 'react-router-dom'
import { stories, storyCategories } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import './Stories.css'

export default function Stories() {
  const [category, setCategory] = useState('All')
  const { profile } = useProgress()

  const filtered = stories.filter(s => {
    const catMatch = category === 'All' || s.category === category
    const ageMatch = s.level.includes(profile.ageGroup)
    return catMatch && ageMatch
  })

  return (
    <div className="stories-page">
      <div className="page-header">
        <h1>📚 Story Library</h1>
        <p>Magical stories with audio, vocabulary support, and read-along mode!</p>
      </div>

      <div className="category-tabs">
        <button className={`btn ${category === 'All' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('All')}>All</button>
        {storyCategories.map(c => (
          <button key={c} className={`btn ${category === c ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card empty-stories">
          <span>📚</span>
          <p>No stories in this category for your age group yet. Try "All" or another category!</p>
        </div>
      )}

      <div className="card-grid">
        {filtered.map(story => (
          <Link key={story.id} to={`/stories/${story.id}`} className="card story-card">
            <span className="story-emoji">📖</span>
            <h3>{story.title}</h3>
            <span className="story-category">{story.category}</span>
            {story.moral && <p className="story-moral">💡 {story.moral}</p>}
            <span className="story-cta">Read With Me →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
