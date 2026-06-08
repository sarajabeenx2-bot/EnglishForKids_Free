import { useRef, useState, useEffect, useCallback } from 'react'
import { coloringCategories } from '../data/content'
import { useProgress } from '../context/ProgressContext'
import { drawColoringPage } from '../utils/coloringPages'
import {
  PaintbrushIcon,
  PrinterIcon,
  ImageIcon,
  PenToolIcon,
  TrashIcon,
  SparklesIcon,
  BucketIcon,
  LockIcon,
  TrophyIcon
} from '../components/CartoonIcons'
import './ColoringStudio.css'

type Brush = 'pencil' | 'marker' | 'paint' | 'eraser' | 'glitter' | 'bucket'

const COLORS = ['#FF6B6B', '#FFD93D', '#7BC67E', '#6ECFFF', '#C9A0FF', '#FFB6C1', '#FF8A65', '#2D3748', '#FFFFFF']

function floodFill(
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  fillColorHex: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  const fillR = parseInt(fillColorHex.slice(1, 3), 16)
  const fillG = parseInt(fillColorHex.slice(3, 5), 16)
  const fillB = parseInt(fillColorHex.slice(5, 7), 16)
  const fillA = 255

  const startOffset = (startY * width + startX) * 4
  const startR = data[startOffset]
  const startG = data[startOffset + 1]
  const startB = data[startOffset + 2]
  const startA = data[startOffset + 3]

  if (startR === fillR && startG === fillG && startB === fillB && startA === fillA) {
    return
  }

  if (startR < 80 && startG < 80 && startB < 80) {
    return
  }

  const matchesStartColor = (nOffset: number) => {
    const r = data[nOffset]
    const g = data[nOffset + 1]
    const b = data[nOffset + 2]
    const a = data[nOffset + 3]

    if (r < 80 && g < 80 && b < 80) {
      return false
    }

    const tolerance = 32
    return (
      Math.abs(r - startR) <= tolerance &&
      Math.abs(g - startG) <= tolerance &&
      Math.abs(b - startB) <= tolerance &&
      Math.abs(a - startA) <= tolerance
    )
  }

  const queue: number[] = [startY * width + startX]
  const visited = new Uint8Array(width * height)
  visited[startY * width + startX] = 1
  let head = 0

  while (head < queue.length) {
    const idx = queue[head++]
    const cx = idx % width
    const cy = Math.floor(idx / width)
    const offset = idx * 4

    data[offset] = fillR
    data[offset + 1] = fillG
    data[offset + 2] = fillB
    data[offset + 3] = fillA

    const neighbors = []
    if (cx > 0) neighbors.push(idx - 1)
    if (cx < width - 1) neighbors.push(idx + 1)
    if (cy > 0) neighbors.push(idx - width)
    if (cy < height - 1) neighbors.push(idx + width)

    for (const nIdx of neighbors) {
      if (!visited[nIdx]) {
        visited[nIdx] = 1
        if (matchesStartColor(nIdx * 4)) {
          queue.push(nIdx)
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

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
  const { saveArtwork, unlockColoring } = useProgress()

  const drawOutline = useCallback((ctx: CanvasRenderingContext2D, onLoadCallback?: (data: ImageData) => void) => {
    const hasImage = [
      'teddy', 'animals', 'dinosaur', 'castle', 'underwater', 'fantasy',
      'flowers', 'icecream', 'nature', 'space', 'sports', 'educational'
    ].includes(category)

    if (hasImage) {
      const img = new Image()
      const basePath = import.meta.env.BASE_URL || '/'
      img.src = `${basePath}drawings/${category}.png`
      img.onload = () => {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
        if (onLoadCallback) {
          const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
          onLoadCallback(data)
        }
      }
      img.onerror = () => {
        // Fallback to procedural vector drawer if drawing image load fails
        drawColoringPage(ctx, category, CANVAS_SIZE, CANVAS_SIZE)
        if (onLoadCallback) {
          const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
          onLoadCallback(data)
        }
      }
    } else {
      drawColoringPage(ctx, category, CANVAS_SIZE, CANVAS_SIZE)
      if (onLoadCallback) {
        const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        onLoadCallback(data)
      }
    }
  }, [category])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawOutline(ctx, (data) => {
      setHistory([data])
      setHistoryIndex(0)
      historyRef.current = [data]
      historyIndexRef.current = 0
    })
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
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)

    if (brush === 'bucket') {
      const fillX = Math.max(0, Math.min(CANVAS_SIZE - 1, Math.floor(x)))
      const fillY = Math.max(0, Math.min(CANVAS_SIZE - 1, Math.floor(y)))
      floodFill(canvas, fillX, fillY, color)
      saveState(ctx)
      return
    }

    setDrawing(true)
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

  const isLocked = (_id: string) => false

  return (
    <div className="coloring-page">
      <div className="page-header">
        <h1><PaintbrushIcon size={28} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> Coloring Studio</h1>
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
            {isLocked(c.id) ? (
              <LockIcon size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
            ) : (
              <span style={{ marginRight: '6px' }}>{c.emoji}</span>
            )}
            {c.name}
          </button>
        ))}
      </div>

      <div className="studio-layout">
        <div className="tools-panel card">
          <h3>Tools</h3>
          <div className="brush-tools">
            {(['pencil', 'marker', 'paint', 'bucket', 'eraser', 'glitter'] as Brush[]).map(b => {
              const isActive = brush === b
              const getToolIcon = () => {
                switch (b) {
                  case 'pencil': return <PenToolIcon size={20} />
                  case 'marker': return <PenToolIcon size={20} style={{ transform: 'scaleX(-1)' }} />
                  case 'paint': return <PaintbrushIcon size={20} />
                  case 'bucket': return <BucketIcon size={20} />
                  case 'eraser': return <TrashIcon size={20} />
                  case 'glitter': return <SparklesIcon size={20} />
                  default: return '✏️'
                }
              }
              return (
                <button
                  key={b}
                  className={`tool-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setBrush(b)}
                  title={b.toUpperCase()}
                >
                  {getToolIcon()}
                </button>
              )
            })}
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
        <button className="btn btn-primary" onClick={handleSave}><ImageIcon size={18} style={{ marginRight: '6px' }} /> Save to Gallery</button>
        <button className="btn btn-secondary" onClick={handleDownload}><TrophyIcon size={18} style={{ marginRight: '6px' }} /> Download PNG</button>
        <button className="btn btn-outline" onClick={() => window.print()}><PrinterIcon size={18} style={{ marginRight: '6px' }} /> Print</button>
      </div>
    </div>
  )
}