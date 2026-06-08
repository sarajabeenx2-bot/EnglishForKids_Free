import './MemoryCard.css'

interface Props {
  back: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled?: boolean
}

export default function MemoryCard({ back, isFlipped, isMatched, onClick, disabled }: Props) {
  const showBack = isFlipped || isMatched

  return (
    <button
      type="button"
      className={`memory-card-scene ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      disabled={disabled || isMatched}
      aria-label={showBack ? `Card showing ${back}` : 'Hidden card'}
    >
      <div className={`memory-card-flipper ${showBack ? 'is-flipped' : ''}`}>
        <div className="memory-card-face memory-card-front">
          <span className="card-pattern">?</span>
        </div>
        <div className="memory-card-face memory-card-back">
          <span className="card-value">{back}</span>
        </div>
      </div>
    </button>
  )
}
