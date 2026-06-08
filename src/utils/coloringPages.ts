type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void

function setupCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill = false) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  if (fill) ctx.fill()
  else ctx.stroke()
}

function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) {
  ctx.beginPath()
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  ctx.stroke()
}

const drawTeddy: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Ears
  circle(ctx, cx - 55, 95, 32)
  circle(ctx, cx + 55, 95, 32)
  circle(ctx, cx - 55, 95, 18)
  circle(ctx, cx + 55, 95, 18)
  // Head
  circle(ctx, cx, 130, 65)
  // Eyes
  circle(ctx, cx - 22, 120, 8, true)
  circle(ctx, cx + 22, 120, 8, true)
  circle(ctx, cx - 22, 120, 3)
  circle(ctx, cx + 22, 120, 3)
  // Nose
  ellipse(ctx, cx, 142, 12, 9)
  ctx.beginPath()
  ctx.arc(cx, 148, 18, 0.2, Math.PI - 0.2)
  ctx.stroke()
  // Body
  ellipse(ctx, cx, 255, 75, 85)
  // Arms
  ellipse(ctx, cx - 90, 230, 28, 55)
  ellipse(ctx, cx + 90, 230, 28, 55)
  // Legs
  ellipse(ctx, cx - 40, 340, 32, 45)
  ellipse(ctx, cx + 40, 340, 32, 45)
  // Belly
  ellipse(ctx, cx, 260, 40, 50)
  // Bow tie
  ctx.beginPath()
  ctx.moveTo(cx - 25, 195)
  ctx.lineTo(cx, 210)
  ctx.lineTo(cx + 25, 195)
  ctx.lineTo(cx, 205)
  ctx.closePath()
  ctx.stroke()
}

const drawBunny: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Ears
  ellipse(ctx, cx - 35, 70, 18, 55)
  ellipse(ctx, cx + 35, 70, 18, 55)
  ellipse(ctx, cx - 35, 70, 10, 40)
  ellipse(ctx, cx + 35, 70, 10, 40)
  // Head
  circle(ctx, cx, 145, 58)
  // Eyes
  circle(ctx, cx - 20, 135, 7, true)
  circle(ctx, cx + 20, 135, 7, true)
  // Nose
  ctx.beginPath()
  ctx.moveTo(cx, 148)
  ctx.lineTo(cx - 6, 158)
  ctx.lineTo(cx + 6, 158)
  ctx.closePath()
  ctx.stroke()
  // Whiskers
  ;[[-1, -35], [-1, -40], [-1, -45], [1, 35], [1, 40], [1, 45]].forEach(([dir, ox]) => {
    ctx.beginPath()
    ctx.moveTo(cx + dir * 8, 155)
    ctx.lineTo(cx + ox, 150 + Math.abs(ox) * 0.1)
    ctx.stroke()
  })
  // Body
  ellipse(ctx, cx, 270, 65, 80)
  // Feet
  ellipse(ctx, cx - 45, 355, 35, 22)
  ellipse(ctx, cx + 45, 355, 35, 22)
  // Tail
  circle(ctx, cx + 70, 300, 18)
}

const drawFlower: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  const petalCount = 8
  const petalR = 38
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2
    const px = cx + Math.cos(angle) * 55
    const py = 155 + Math.sin(angle) * 55
    circle(ctx, px, py, petalR)
  }
  circle(ctx, cx, 155, 35)
  circle(ctx, cx, 155, 20)
  // Stem
  ctx.beginPath()
  ctx.moveTo(cx, 190)
  ctx.lineTo(cx, 320)
  ctx.stroke()
  // Leaves
  ctx.beginPath()
  ctx.moveTo(cx, 240)
  ctx.quadraticCurveTo(cx - 50, 220, cx - 55, 250)
  ctx.quadraticCurveTo(cx - 30, 255, cx, 240)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx, 280)
  ctx.quadraticCurveTo(cx + 50, 260, cx + 55, 290)
  ctx.quadraticCurveTo(cx + 30, 295, cx, 280)
  ctx.stroke()
  // Grass
  for (let i = 0; i < 8; i++) {
    const gx = 60 + i * 45
    ctx.beginPath()
    ctx.moveTo(gx, 360)
    ctx.quadraticCurveTo(gx + 5, 340, gx + 10, 355)
    ctx.stroke()
  }
}

const drawIceCream: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Cone
  ctx.beginPath()
  ctx.moveTo(cx - 55, 200)
  ctx.lineTo(cx, 370)
  ctx.lineTo(cx + 55, 200)
  ctx.closePath()
  ctx.stroke()
  // Waffle lines
  for (let i = 0; i < 5; i++) {
    const t = i / 5
    const y = 200 + t * 170
    const halfW = 55 * (1 - t * 0.3)
    ctx.beginPath()
    ctx.moveTo(cx - halfW, y)
    ctx.lineTo(cx + halfW, y + 20)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx + halfW, y)
    ctx.lineTo(cx - halfW, y + 20)
    ctx.stroke()
  }
  // Scoops
  circle(ctx, cx, 175, 52)
  circle(ctx, cx - 30, 130, 42)
  circle(ctx, cx + 30, 130, 42)
  circle(ctx, cx, 90, 38)
  // Cherry
  circle(ctx, cx, 55, 12)
  ctx.beginPath()
  ctx.moveTo(cx, 43)
  ctx.quadraticCurveTo(cx + 15, 20, cx + 20, 15)
  ctx.stroke()
}

const drawNature: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  // Sun
  circle(ctx, 80, 70, 35)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(80 + Math.cos(angle) * 42, 70 + Math.sin(angle) * 42)
    ctx.lineTo(80 + Math.cos(angle) * 58, 70 + Math.sin(angle) * 58)
    ctx.stroke()
  }
  // Hills
  ctx.beginPath()
  ctx.moveTo(0, 300)
  ctx.quadraticCurveTo(120, 240, 250, 280)
  ctx.quadraticCurveTo(380, 320, w, 260)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.stroke()
  // Tree
  ctx.beginPath()
  ctx.moveTo(280, 360)
  ctx.lineTo(280, 250)
  ctx.stroke()
  circle(ctx, 280, 200, 55)
  circle(ctx, 250, 220, 35)
  circle(ctx, 310, 220, 35)
  // River
  ctx.beginPath()
  ctx.moveTo(0, 340)
  ctx.quadraticCurveTo(150, 320, 300, 345)
  ctx.quadraticCurveTo(400, 360, w, 330)
  ctx.stroke()
  // Cloud
  circle(ctx, 350, 60, 22)
  circle(ctx, 380, 55, 28)
  circle(ctx, 410, 60, 22)
}

const drawSpace: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  // Stars
  ;[[60, 50], [150, 80], [350, 40], [420, 90], [100, 150]].forEach(([x, y]) => {
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
      const r = i % 2 === 0 ? 10 : 5
      const px = x + Math.cos(angle) * r
      const py = y + Math.sin(angle) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.stroke()
  })
  // Moon
  circle(ctx, 400, 70, 30)
  circle(ctx, 415, 65, 25)
  ctx.fillStyle = '#fff'
  ctx.fill()
  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 2.5
  circle(ctx, 400, 70, 30)
  // Rocket
  ctx.beginPath()
  ctx.moveTo(200, 320)
  ctx.lineTo(200, 140)
  ctx.lineTo(250, 100)
  ctx.lineTo(300, 140)
  ctx.lineTo(300, 320)
  ctx.closePath()
  ctx.stroke()
  circle(ctx, 250, 180, 35)
  // Fins
  ctx.beginPath()
  ctx.moveTo(200, 280)
  ctx.lineTo(160, 330)
  ctx.lineTo(200, 320)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(300, 280)
  ctx.lineTo(340, 330)
  ctx.lineTo(300, 320)
  ctx.stroke()
  // Flame
  ctx.beginPath()
  ctx.moveTo(220, 320)
  ctx.lineTo(250, 370)
  ctx.lineTo(280, 320)
  ctx.stroke()
  // Window
  circle(ctx, 250, 180, 20)
}

const drawSports: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Soccer ball
  circle(ctx, cx, 180, 70)
  // Pentagon pattern
  const pts: [number, number][] = []
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
    pts.push([cx + Math.cos(angle) * 25, 180 + Math.sin(angle) * 25])
  }
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  pts.forEach(([x, y], i) => { if (i > 0) ctx.lineTo(x, y) })
  ctx.closePath()
  ctx.stroke()
  pts.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.moveTo(cx, 180)
    ctx.lineTo(x, y)
    ctx.stroke()
  })
  // Goal
  ctx.strokeRect(80, 260, 240, 100)
  ctx.beginPath()
  for (let i = 0; i <= 12; i++) {
    ctx.moveTo(80 + i * 20, 260)
    ctx.lineTo(80 + i * 20, 360)
  }
  for (let i = 0; i <= 5; i++) {
    ctx.moveTo(80, 260 + i * 20)
    ctx.lineTo(320, 260 + i * 20)
  }
  ctx.stroke()
}

const drawFantasy: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Unicorn body
  ellipse(ctx, cx, 280, 80, 55)
  // Neck
  ctx.beginPath()
  ctx.moveTo(cx + 40, 250)
  ctx.quadraticCurveTo(cx + 70, 180, cx + 50, 130)
  ctx.stroke()
  // Head
  circle(ctx, cx + 45, 115, 35)
  // Horn
  ctx.beginPath()
  ctx.moveTo(cx + 55, 85)
  ctx.lineTo(cx + 65, 40)
  ctx.lineTo(cx + 75, 85)
  ctx.stroke()
  // Mane
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(cx + 30 + i * 8, 130 + i * 15, 15, 0, Math.PI)
    ctx.stroke()
  }
  // Legs
  ;[cx - 30, cx - 5, cx + 20, cx + 50].forEach(lx => {
    ctx.beginPath()
    ctx.moveTo(lx, 320)
    ctx.lineTo(lx, 360)
    ctx.stroke()
  })
  // Tail
  ctx.beginPath()
  ctx.moveTo(cx - 75, 270)
  ctx.quadraticCurveTo(cx - 120, 240, cx - 100, 200)
  ctx.stroke()
  // Wing
  ctx.beginPath()
  ctx.moveTo(cx - 20, 240)
  ctx.quadraticCurveTo(cx - 80, 180, cx - 60, 150)
  ctx.quadraticCurveTo(cx - 40, 200, cx - 20, 240)
  ctx.stroke()
  // Castle
  ctx.strokeRect(30, 280, 100, 80)
  ctx.strokeRect(50, 250, 25, 30)
  ctx.strokeRect(85, 250, 25, 30)
  ctx.beginPath()
  ctx.moveTo(45, 250)
  ctx.lineTo(62, 230)
  ctx.lineTo(80, 250)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(80, 250)
  ctx.lineTo(97, 230)
  ctx.lineTo(115, 250)
  ctx.stroke()
}

const drawEducational: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const blocks = [
    { x: 100, letter: 'A', color: '#FF6B6B' },
    { x: 200, letter: 'B', color: '#FFD93D' },
    { x: 300, letter: 'C', color: '#7BC67E' },
  ]
  blocks.forEach(({ x, letter }) => {
    ctx.strokeRect(x - 40, 200, 80, 80)
    ctx.font = 'bold 48px Fredoka, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#2D3748'
    ctx.fillText(letter, x, 240)
    ctx.strokeStyle = '#2D3748'
    ctx.lineWidth = 2.5
    // 3D side
    ctx.beginPath()
    ctx.moveTo(x + 40, 200)
    ctx.lineTo(x + 55, 185)
    ctx.lineTo(x + 55, 265)
    ctx.lineTo(x + 40, 280)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x - 40, 200)
    ctx.lineTo(x - 25, 185)
    ctx.lineTo(x + 55, 185)
    ctx.lineTo(x + 40, 200)
    ctx.stroke()
  })
  // Pencil
  ctx.beginPath()
  ctx.moveTo(80, 320)
  ctx.lineTo(200, 100)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(200, 100)
  ctx.lineTo(215, 95)
  ctx.lineTo(95, 315)
  ctx.closePath()
  ctx.stroke()
  circle(ctx, 205, 92, 8)
  // Book
  ctx.strokeRect(280, 300, 100, 70)
  ctx.beginPath()
  ctx.moveTo(330, 300)
  ctx.lineTo(330, 370)
  ctx.stroke()
}

const drawCat: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // Ears
  ctx.beginPath()
  ctx.moveTo(cx - 50, 110)
  ctx.lineTo(cx - 35, 60)
  ctx.lineTo(cx - 15, 100)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 50, 110)
  ctx.lineTo(cx + 35, 60)
  ctx.lineTo(cx + 15, 100)
  ctx.stroke()
  circle(ctx, cx, 150, 60)
  circle(ctx, cx - 22, 140, 8, true)
  circle(ctx, cx + 22, 140, 8, true)
  ctx.beginPath()
  ctx.moveTo(cx - 8, 158)
  ctx.lineTo(cx, 168)
  ctx.lineTo(cx + 8, 158)
  ctx.stroke()
  ellipse(ctx, cx, 260, 55, 70)
  ctx.beginPath()
  ctx.moveTo(cx - 55, 230)
  ctx.lineTo(cx - 100, 200)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 55, 230)
  ctx.lineTo(cx + 100, 200)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx - 30, 320)
  ctx.lineTo(cx - 35, 370)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 30, 320)
  ctx.lineTo(cx + 35, 370)
  ctx.stroke()
}

export const COLORING_PAGES: Record<string, DrawFn> = {
  teddy: drawTeddy,
  animals: drawBunny,
  flowers: drawFlower,
  icecream: drawIceCream,
  nature: drawNature,
  space: drawSpace,
  sports: drawSports,
  fantasy: drawFantasy,
  educational: drawEducational,
}

export function drawColoringPage(ctx: CanvasRenderingContext2D, category: string, width = 400, height = 400) {
  const draw = COLORING_PAGES[category] ?? drawCat
  ctx.save()
  ctx.scale(width / 400, height / 400)
  draw(ctx, 400, 400)
  ctx.restore()
}
