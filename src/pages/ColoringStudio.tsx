import { useRef, useState, useEffect, useCallback } from 'react'
import { coloringCategories } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import { drawColoringPage } from '../utils/coloringPages'
import './ColoringStudio.css'

type Brush = 'pencil' | 'marker' | 'paint' | 'eraser' | 'glitter'

const COLORS = ['#FF6B6B', '#FFD93D', '#7BC67E', '#6ECFFF', '#C9A0FF', '#FFB6C1', '#FF8A65', '#2D3748', '#FFFFFF']

const CANVAS_SIZE = 400

export default function ColoringStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [category, setCategory] = useState('teddy')
  const [color, setColor] = useState('#FF6B6B')
  const [brush, setBrush] = useState<Brush>('marker')
  const [brushSize, setBrushSize] = useState(8)
  const [drawing, setDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [savedMsg, setSavedMsg] = useState('')
  const historyRef = useRef<ImageData[]>([])
  const historyIndexRef = useRef(0)
  const { progress, saveArtwork, unlockColoring } = useProgress()

  const drawOutline = useCallback((ctx: CanvasRenderingContext2D) => {
    drawColoringPage(ctx, category, CANVAS_SIZE, CANVAS_SIZE)
  }, [category])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawOutline(ctx)
    const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    setHistory([data])
    setHistoryIndex(0)
    historyRef.current = [data]
    historyIndexRef.current = 0
  }, [category, drawOutline])

  useEffect(() => { historyRef.current = history }, [history])
  useEffect(() => { historyIndexRef.current = historyIndex }, [historyIndex])

  const saveState = (ctx: CanvasRenderingContext2D) => {
    const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    setHistory(prev => [...prev.slice(0, historyIndex + 1), data])
    setHistoryIndex(i => i + 1)
  }

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * (CANVAS_SIZE / rect.width),
      y: (clientY - rect.top) * (CANVAS_SIZE / rect.height),
    }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setDrawing(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return
    e.preventDefault()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    if (brush === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = brushSize * 2
      ctx.strokeStyle = 'rgba(0,0,0,1)'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = brush === 'glitter' ? `hsl(${Math.random() * 360}, 80%, 60%)` : color
      ctx.lineWidth = brush === 'pencil' ? brushSize * 0.5 : brush === 'paint' ? brushSize * 2 : brushSize
      ctx.globalAlpha = brush === 'marker' ? 0.85 : brush === 'paint' ? 0.65 : 1
    }
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const endDraw = () => {
    if (!drawing) return
    setDrawing(false)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      saveState(ctx)
    }
  }

  const undo = () => {
    if (historyIndexRef.current <= 0) return
    const newIndex = historyIndexRef.current - 1
    const ctx = canvasRef.current?.getContext('2d')
    const data = historyRef.current[newIndex]
    if (ctx && data) ctx.putImageData(data, 0, 0)
    setHistoryIndex(newIndex)
  }

  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return
    const newIndex = historyIndexRef.current + 1
    const ctx = canvasRef.current?.getContext('2d')
    const data = historyRef.current[newIndex]
    if (ctx && data) ctx.putImageData(data, 0, 0)
    setHistoryIndex(newIndex)
  }

  const handleSave = () => {
    const dataUrl = canvasRef.current?.toDataURL('image/png') ?? ''
    const catName = coloringCategories.find(c => c.id === category)?.name ?? category
    saveArtwork({ title: `${catName} artwork`, dataUrl, category })
    unlockColoring(category)
    setSavedMsg('🎨 Saved to your Art Gallery!')
    setTimeout(() => setSavedMsg(''), 3000)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = `englishforkidsfree-${category}.png`
    link.href = canvasRef.current?.toDataURL('image/png') ?? ''
    link.click()
  }

  const isLocked = (id: string) => !progress.unlockedColoring.includes(id) && id !== 'teddy' && id !== 'animals'

  return (
    <div className="coloring-page">
      <div className="page-header">
        <h1>🎨 Coloring Studio</h1>
        <p>Color beautiful pictures — teddy bears, animals, flowers, space, and more!</p>
      </div>

      <div className="category-picker">
        {coloringCategories.map(c => (
          <button
            key={c.id}
            className={`btn ${category === c.id ? 'btn-primary' : 'btn-outline'} ${isLocked(c.id) ? 'locked' : ''}`}
            onClick={() => !isLocked(c.id) && setCategory(c.id)}
            disabled={isLocked(c.id)}
          >
            {isLocked(c.id) ? '🔒' : c.emoji} {c.name}
          </button>
        ))}
      </div>

      <div className="studio-layout">
        <div className="tools-panel card">
          <h3>Tools</h3>
          <div className="brush-tools">
            {(['pencil', 'marker', 'paint', 'eraser', 'glitter'] as Brush[]).map(b => (
              <button key={b} className={`tool-btn ${brush === b ? 'active' : ''}`} onClick={() => setBrush(b)}>
                {b === 'pencil' ? '✏️' : b === 'marker' ? '🖊️' : b === 'paint' ? '🖌️' : b === 'eraser' ? '🧹' : '✨'}
              </button>
            ))}
          </div>
          <div className="color-picker-grid">
            {COLORS.map(c => (
              <button
                key={c}
                className={`color-btn ${color === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
          <label>Size: <input type="range" min="2" max="20" value={brushSize} onChange={e => setBrushSize(+e.target.value)} /></label>
          <div className="tool-actions">
            <button className="btn btn-outline" onClick={undo}>↩️ Undo</button>
            <button className="btn btn-outline" onClick={redo}>↪️ Redo</button>
          </div>
        </div>

        <div className="canvas-area card">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
        </div>
      </div>

      {savedMsg && <p className="save-toast">{savedMsg}</p>}

      <div className="studio-actions">
        <button className="btn btn-primary" onClick={handleSave}>💾 Save to Gallery</button>
        <button className="btn btn-secondary" onClick={handleDownload}>⬇️ Download PNG</button>
        <button className="btn btn-outline" onClick={() => window.print()}>🖨️ Print</button>
      </div>
    </div>
  )
}
