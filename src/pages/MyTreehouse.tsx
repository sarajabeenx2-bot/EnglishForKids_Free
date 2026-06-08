import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import { stories } from '../data/content'
import {
  TrashIcon,
  PlusIcon,
  LockIcon,
  BoxIcon,
  HomeIcon,
  InfoIcon,
  CloudIcon,
  SunIcon
} from '../components/CartoonIcons'
import './MyTreehouse.css'

interface TreehouseItem {
  id: string
  name: string
  emoji: string
  category: 'furniture' | 'decoration' | 'pets'
  reqDesc: string
  checkUnlock: (xp: number, completedLessons: string[]) => boolean
}

const TREEHOUSE_ITEMS: TreehouseItem[] = [
  // Furniture
  {
    id: 'chair',
    name: 'Cozy Chair',
    emoji: '🪑',
    category: 'furniture',
    reqDesc: 'Reach 30 XP',
    checkUnlock: (xp) => xp >= 30,
  },
  {
    id: 'table',
    name: 'Wooden Table',
    emoji: '🪵',
    category: 'furniture',
    reqDesc: 'Reach 70 XP',
    checkUnlock: (xp) => xp >= 70,
  },
  {
    id: 'lamp',
    name: 'Glow Lamp',
    emoji: '💡',
    category: 'furniture',
    reqDesc: 'Reach 120 XP',
    checkUnlock: (xp) => xp >= 120,
  },
  {
    id: 'bookshelf',
    name: 'Library Shelf',
    emoji: '📚',
    category: 'furniture',
    reqDesc: 'Complete Story Kingdom',
    checkUnlock: (_, completed) => {
      return completed.filter(id => id.startsWith('story-') || stories.some(s => s.id === id)).length >= 1
    },
  },
  // Decorations
  {
    id: 'flowers',
    name: 'Potted Flowers',
    emoji: '🌸',
    category: 'decoration',
    reqDesc: 'Complete Phonics Forest',
    checkUnlock: (_, completed) => completed.includes('phonics-complete'),
  },
  {
    id: 'pictures',
    name: 'Art Frame',
    emoji: '🖼️',
    category: 'decoration',
    reqDesc: 'Complete Vocabulary Valley',
    checkUnlock: (_, completed) => completed.filter(id => id.startsWith('vocab-')).length >= 3,
  },
  {
    id: 'carpet',
    name: 'Rainbow Rug',
    emoji: '🧶',
    category: 'decoration',
    reqDesc: 'Reach 180 XP',
    checkUnlock: (xp) => xp >= 180,
  },
  {
    id: 'toys',
    name: 'Toy Box',
    emoji: '🧸',
    category: 'decoration',
    reqDesc: 'Reach 250 XP',
    checkUnlock: (xp) => xp >= 250,
  },
  // Pets
  {
    id: 'pet-rabbit',
    name: 'Ruby Rabbit',
    emoji: '🐰',
    category: 'pets',
    reqDesc: 'Complete Alphabet Village',
    checkUnlock: (_, completed) => completed.filter(id => id.startsWith('alpha-')).length >= 3,
  },
  {
    id: 'pet-owl',
    name: 'Ollie Owl',
    emoji: '🦉',
    category: 'pets',
    reqDesc: 'Complete Story Kingdom',
    checkUnlock: (_, completed) => {
      return completed.filter(id => id.startsWith('story-') || stories.some(s => s.id === id)).length >= 1
    },
  },
  {
    id: 'pet-bird',
    name: 'Bella Bird',
    emoji: '🐦',
    category: 'pets',
    reqDesc: 'Complete Speaking Mountain',
    checkUnlock: (_, completed) => completed.filter(id => id.startsWith('speaking-') || id === 'speaking-practice').length >= 2,
  },
]

export default function MyTreehouse() {
  const { progress, toggleTreehouseItem } = useProgress()
  const [tab, setTab] = useState<'all' | 'furniture' | 'decoration' | 'pets'>('all')

  const placedItems = progress.treehouseItems ?? []

  const filteredItems = TREEHOUSE_ITEMS.filter(
    (item) => tab === 'all' || item.category === tab
  )

  const isPlaced = (id: string) => placedItems.includes(id)

  const isUnlocked = (item: TreehouseItem) =>
    item.checkUnlock(progress.xp, progress.completedLessons)

  return (
    <div className="treehouse-page">
      <div className="page-header">
        <h1><HomeIcon size={28} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> My Cozy Treehouse</h1>
        <p>Earn XP and complete lessons to unlock cool items, pets, and decorations for your private treehouse!</p>
      </div>

      <div className="treehouse-layout">
        {/* Visual Room Representation */}
        <div className="treehouse-room card">
          <div className="treehouse-window">
            <span className="window-clouds"><CloudIcon size={20} /></span>
            <span className="window-sun"><SunIcon size={24} /></span>
          </div>

          <div className="room-content">
            {/* Absolute positioned items in the room */}
            {isPlaced('bookshelf') && <div className="placed-item item-bookshelf" title="Library Shelf">📚</div>}
            {isPlaced('carpet') && <div className="placed-item item-carpet" title="Rainbow Rug">🧶</div>}
            {isPlaced('table') && <div className="placed-item item-table" title="Wooden Table">🪵</div>}
            {isPlaced('chair') && <div className="placed-item item-chair" title="Cozy Chair">🪑</div>}
            {isPlaced('lamp') && <div className="placed-item item-lamp" title="Glow Lamp">💡</div>}
            {isPlaced('flowers') && <div className="placed-item item-flowers" title="Potted Flowers">🌸</div>}
            {isPlaced('pictures') && <div className="placed-item item-pictures" title="Art Frame">🖼️</div>}
            {isPlaced('toys') && <div className="placed-item item-toys" title="Toy Box">🧸</div>}
            
            {/* Placed Pets */}
            {isPlaced('pet-rabbit') && <div className="placed-item item-pet-rabbit wave" title="Ruby Rabbit">🐰</div>}
            {isPlaced('pet-owl') && <div className="placed-item item-pet-owl float" title="Ollie Owl">🦉</div>}
            {isPlaced('pet-bird') && <div className="placed-item item-pet-bird hop" title="Bella Bird">🐦</div>}

            {placedItems.length === 0 && (
              <div className="empty-room-hint">
                <p><InfoIcon size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} /> Your treehouse looks a bit empty! Choose unlocked items from the drawer below to decorate it.</p>
              </div>
            )}
          </div>
        </div>

        {/* Drawer / Inventory Selector */}
        <div className="treehouse-drawer card">
          <h3><BoxIcon size={22} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> Decoration Drawer</h3>
          
          <div className="drawer-tabs">
            {(['all', 'furniture', 'decoration', 'pets'] as const).map((t) => (
              <button
                key={t}
                className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTab(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="drawer-grid">
            {filteredItems.map((item) => {
              const unlocked = isUnlocked(item)
              const placed = isPlaced(item.id)
              
              return (
                <div key={item.id} className={`drawer-item card ${unlocked ? 'unlocked' : 'locked'}`}>
                  <span className="item-emoji">{item.emoji}</span>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    {!unlocked ? (
                      <span className="item-req"><LockIcon size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> {item.reqDesc}</span>
                    ) : (
                      <button
                        className={`btn btn-sm ${placed ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => toggleTreehouseItem(item.id)}
                      >
                        {placed ? (
                          <><TrashIcon size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Remove</>
                        ) : (
                          <><PlusIcon size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Place</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
