import { useState } from 'react'
import { generateStory } from '../utils/storyGenerator'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './StoryCreator.css'

const characters = ['Mia', 'Leo', 'Emma', 'Sam', 'Lily']
const places = ['garden', 'forest', 'beach', 'castle', 'school']
const animals = ['rabbit', 'owl', 'bird', 'cat', 'dog']
const objects = ['ball', 'book', 'flower', 'star', 'kite']

export default function StoryCreator() {
  const [character, setCharacter] = useState(characters[0])
  const [place, setPlace] = useState(places[0])
  const [animal, setAnimal] = useState(animals[0])
  const [object, setObject] = useState(objects[0])
  const [story, setStory] = useState<string[] | null>(null)
  const [reading, setReading] = useState(false)
  const { completeLesson, isLessonCompleted } = useProgress()
  const storyDone = isLessonCompleted('story-creator')

  const handleGenerate = () => {
    const generated = generateStory(character, place, animal, object)
    setStory(generated)
  }

  const readAloud = () => {
    if (!story) return
    setReading(true)
    story.forEach((s, i) => {
      setTimeout(() => speak(s), i * 3000)
    })
    setTimeout(() => setReading(false), story.length * 3000)
  }

  const handleFinish = () => {
    completeLesson('story-creator', 15)
  }

  return (
    <div className="story-creator-page">
      <div className="page-header">
        <h1>✨ Create Your Own Story</h1>
        <p>Pick a character, place, animal, and object — we'll create a magical story!</p>
      </div>

      <div className="creator-form card">
        <div className="picker-grid">
          <div className="picker">
            <label>👤 Character</label>
            <select value={character} onChange={e => setCharacter(e.target.value)}>
              {characters.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="picker">
            <label>🏞️ Place</label>
            <select value={place} onChange={e => setPlace(e.target.value)}>
              {places.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="picker">
            <label>🐾 Animal</label>
            <select value={animal} onChange={e => setAnimal(e.target.value)}>
              {animals.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="picker">
            <label>🎁 Object</label>
            <select value={object} onChange={e => setObject(e.target.value)}>
              {objects.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <button className="btn btn-primary btn-large" onClick={handleGenerate}>
          ✨ Generate My Story!
        </button>
      </div>

      {story && (
        <div className="generated-story card">
          <h2>📖 Your Story</h2>
          <div className="story-illustration">
            <span>👤{character}</span>
            <span>🏞️</span>
            <span>🐾{animal}</span>
            <span>🎁{object}</span>
          </div>
          {story.map((sentence, i) => (
            <p key={i} className="story-line" onClick={() => speak(sentence)}>{sentence}</p>
          ))}
          <div className="story-actions">
            <button className="btn btn-secondary" onClick={readAloud} disabled={reading}>
              {reading ? '🔊 Reading...' : '🔊 Read Aloud'}
            </button>
            <button className="btn btn-primary" onClick={handleFinish} disabled={storyDone}>
              {storyDone ? '✅ Story Saved!' : '✅ Save & Finish (+15 XP)'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
