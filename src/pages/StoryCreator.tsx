import { useState } from 'react'
import { generateStory } from '../utils/storyGenerator'
import { speak } from '../utils/speech'
import { useProgress } from '../context/ProgressContext'
import './StoryCreator.css'

const characterCards = [
  { id: 'Mia', name: 'Mia', emoji: '👧' },
  { id: 'Leo', name: 'Leo', emoji: '👦' },
  { id: 'Emma', name: 'Emma', emoji: '👩' },
  { id: 'Sam', name: 'Sam', emoji: '🧑' },
  { id: 'Lily', name: 'Lily', emoji: '👧' },
]

const animalCards = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'bird', name: 'Bird', emoji: '🐦' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', emoji: '🐶' },
]

const placeCards = [
  { id: 'garden', name: 'Garden', emoji: '🏡' },
  { id: 'forest', name: 'Forest', emoji: '🌲' },
  { id: 'beach', name: 'Beach', emoji: '🏖️' },
  { id: 'castle', name: 'Castle', emoji: '🏰' },
  { id: 'school', name: 'School', emoji: '🏫' },
]

const objectCards = [
  { id: 'ball', name: 'Ball', emoji: '⚽' },
  { id: 'book', name: 'Book', emoji: '📚' },
  { id: 'flower', name: 'Flower', emoji: '🌸' },
  { id: 'star', name: 'Star', emoji: '⭐' },
  { id: 'kite', name: 'Kite', emoji: '🪁' },
]

export default function StoryCreator() {
  const [character, setCharacter] = useState(characterCards[0].id)
  const [place, setPlace] = useState(placeCards[0].id)
  const [animal, setAnimal] = useState(animalCards[0].id)
  const [object, setObject] = useState(objectCards[0].id)
  const [story, setStory] = useState<string[] | null>(null)
  const [reading, setReading] = useState(false)
  const { completeLesson, saveArtwork, playSound } = useProgress()
  const [saved, setSaved] = useState(false)

  const handleGenerate = () => {
    playSound('pop')
    const generated = generateStory(character, place, animal, object)
    setStory(generated)
    setSaved(false)
  }

  const readAloud = () => {
    if (!story) return
    setReading(true)
    story.forEach((s, i) => {
      setTimeout(() => speak(s), i * 3000)
    })
    setTimeout(() => setReading(false), story.length * 3000)
  }

  const generateStorySvg = (char: string, animalName: string, placeName: string, obj: string) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="100%" height="100%" fill="#F1F5F9" rx="20" />
        <rect x="20" y="20" width="360" height="360" fill="#FFFFFF" rx="12" stroke="#CBD5E1" stroke-width="4" />
        <text x="50%" y="80" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#1E293B">My Magical Story</text>
        <text x="50%" y="125" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#64748B">${char}'s Adventure in the ${placeName}</text>
        <text x="50%" y="220" text-anchor="middle" font-size="64">📖</text>
        <text x="50%" y="300" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#475569">With a friendly ${animalName} and a ${obj}</text>
      </svg>
    `
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
  }

  const handleFinish = () => {
    if (!story) return
    playSound('success')
    completeLesson('story-creator', 15)
    
    // Save to Art Gallery as a custom Book Cover
    const dataUrl = generateStorySvg(character, animal, place, object)
    saveArtwork({
      title: `${character}'s adventure in the ${place}`,
      category: 'stories',
      dataUrl,
    })

    setSaved(true)
    speak('Your story has been saved to your Art Gallery!')
  }

  const getCharEmoji = (id: string) => characterCards.find(c => c.id === id)?.emoji ?? '👤'
  const getAnimalEmoji = (id: string) => animalCards.find(a => a.id === id)?.emoji ?? '🐾'
  const getPlaceEmoji = (id: string) => placeCards.find(p => p.id === id)?.emoji ?? '🏞️'
  const getObjEmoji = (id: string) => objectCards.find(o => o.id === id)?.emoji ?? '🎁'

  return (
    <div className="story-creator-page">
      <div className="page-header no-print">
        <h1>✨ Create Your Own Story</h1>
        <p>Pick a character, animal, location, and object — we'll write a magical story for you!</p>
      </div>

      <div className="creator-form card no-print">
        {/* Step 1: Character */}
        <div className="creator-step">
          <h3>👤 Choose a Hero</h3>
          <div className="card-selector-grid">
            {characterCards.map(c => (
              <button
                key={c.id}
                className={`selector-card ${character === c.id ? 'active' : ''}`}
                onClick={() => setCharacter(c.id)}
              >
                <span className="card-emoji">{c.emoji}</span>
                <span className="card-label">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Animal */}
        <div className="creator-step">
          <h3>🐾 Choose an Animal Friend</h3>
          <div className="card-selector-grid">
            {animalCards.map(a => (
              <button
                key={a.id}
                className={`selector-card ${animal === a.id ? 'active' : ''}`}
                onClick={() => setAnimal(a.id)}
              >
                <span className="card-emoji">{a.emoji}</span>
                <span className="card-label">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Location */}
        <div className="creator-step">
          <h3>🏞️ Choose a Location</h3>
          <div className="card-selector-grid">
            {placeCards.map(p => (
              <button
                key={p.id}
                className={`selector-card ${place === p.id ? 'active' : ''}`}
                onClick={() => setPlace(p.id)}
              >
                <span className="card-emoji">{p.emoji}</span>
                <span className="card-label">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Object */}
        <div className="creator-step">
          <h3>🎁 Choose an Object</h3>
          <div className="card-selector-grid">
            {objectCards.map(o => (
              <button
                key={o.id}
                className={`selector-card ${object === o.id ? 'active' : ''}`}
                onClick={() => setObject(o.id)}
              >
                <span className="card-emoji">{o.emoji}</span>
                <span className="card-label">{o.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-large generate-btn" onClick={handleGenerate}>
          ✨ Generate My Story!
        </button>
      </div>

      {story && (
        <div className="generated-story card">
          <h2 className="story-title">📖 My Adventure Story</h2>
          <div className="story-illustration">
            <span>{getCharEmoji(character)} {character}</span>
            <span>{getPlaceEmoji(place)} {place}</span>
            <span>{getAnimalEmoji(animal)} {animal}</span>
            <span>{getObjEmoji(object)} {object}</span>
          </div>

          <div className="story-body">
            {story.map((sentence, i) => (
              <p key={i} className="story-line" onClick={() => speak(sentence)}>
                {sentence}
              </p>
            ))}
          </div>

          <div className="story-actions no-print">
            <button className="btn btn-secondary" onClick={readAloud} disabled={reading}>
              {reading ? '🔊 Reading...' : '🔊 Read Aloud'}
            </button>
            <button className="btn btn-primary" onClick={handleFinish} disabled={saved}>
              {saved ? '✅ Story Saved to Gallery!' : '💾 Save to Art Gallery (+15 XP)'}
            </button>
            <button className="btn btn-outline" onClick={() => window.print()}>
              🖨️ Print Story
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
