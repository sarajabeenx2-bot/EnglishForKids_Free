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

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill = false, fillWhite = true) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  if (fill) {
    ctx.fill()
  } else {
    if (fillWhite) {
      ctx.save()
      ctx.fillStyle = '#FFFFFF'
      ctx.fill()
      ctx.restore()
    }
    ctx.stroke()
  }
}

function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, fillWhite = true) {
  ctx.beginPath()
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  if (fillWhite) {
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
  }
  ctx.stroke()
}

const drawTeddy: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // 1. Body (base layer)
  ellipse(ctx, cx, 255, 75, 85)
  // 2. Belly (on body)
  ellipse(ctx, cx, 260, 40, 50)
  // 3. Legs (overlapping bottom of body)
  ellipse(ctx, cx - 40, 340, 32, 45)
  ellipse(ctx, cx + 40, 340, 32, 45)
  // 4. Arms (overlapping sides of body)
  ellipse(ctx, cx - 90, 230, 28, 55)
  ellipse(ctx, cx + 90, 230, 28, 55)
  // 5. Ears (drawn behind head)
  circle(ctx, cx - 55, 95, 32)
  circle(ctx, cx + 55, 95, 32)
  circle(ctx, cx - 55, 95, 18)
  circle(ctx, cx + 55, 95, 18)
  // 6. Head (overlapping ears and body top)
  circle(ctx, cx, 130, 65)
  // 7. Eyes (on head)
  circle(ctx, cx - 22, 120, 8, true)
  circle(ctx, cx + 22, 120, 8, true)
  circle(ctx, cx - 22, 120, 3)
  circle(ctx, cx + 22, 120, 3)
  // 8. Nose & Mouth (on head)
  ellipse(ctx, cx, 142, 12, 9)
  ctx.beginPath()
  ctx.arc(cx, 148, 18, 0.2, Math.PI - 0.2)
  ctx.stroke()
  // 9. Bow tie (on body and head neck)
  ctx.beginPath()
  ctx.moveTo(cx - 25, 195)
  ctx.lineTo(cx, 210)
  ctx.lineTo(cx + 25, 195)
  ctx.lineTo(cx, 205)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
}

const drawBunny: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  // 1. Tail (furthest back)
  circle(ctx, cx + 70, 300, 18)
  // 2. Body (covers tail)
  ellipse(ctx, cx, 270, 65, 80)
  // 3. Feet (covers bottom body overlap)
  ellipse(ctx, cx - 45, 355, 35, 22)
  ellipse(ctx, cx + 45, 355, 35, 22)
  // 4. Ears (drawn behind head)
  ellipse(ctx, cx - 35, 70, 18, 55)
  ellipse(ctx, cx + 35, 70, 18, 55)
  ellipse(ctx, cx - 35, 70, 10, 40)
  ellipse(ctx, cx + 35, 70, 10, 40)
  // 5. Head (covers top body and bottom ears overlap)
  circle(ctx, cx, 145, 58)
  // 6. Eyes (on head)
  circle(ctx, cx - 20, 135, 7, true)
  circle(ctx, cx + 20, 135, 7, true)
  // 7. Nose (on head)
  ctx.beginPath()
  ctx.moveTo(cx, 148)
  ctx.lineTo(cx - 6, 158)
  ctx.lineTo(cx + 6, 158)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
  // 8. Whiskers (on head)
  ;[[-1, -35], [-1, -40], [-1, -45], [1, 35], [1, 40], [1, 45]].forEach(([dir, ox]) => {
    ctx.beginPath()
    ctx.moveTo(cx + dir * 8, 155)
    ctx.lineTo(cx + ox, 150 + Math.abs(ox) * 0.1)
    ctx.stroke()
  })
}

const drawFlower: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  
  // 1. Stem (furthest back)
  ctx.beginPath()
  ctx.moveTo(cx, 190)
  ctx.lineTo(cx, 320)
  ctx.stroke()
  
  // 2. Leaves (over stem)
  ctx.beginPath()
  ctx.moveTo(cx, 240)
  ctx.quadraticCurveTo(cx - 50, 220, cx - 55, 250)
  ctx.quadraticCurveTo(cx - 30, 255, cx, 240)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx, 280)
  ctx.quadraticCurveTo(cx + 50, 260, cx + 55, 290)
  ctx.quadraticCurveTo(cx + 30, 295, cx, 280)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 3. Grass
  for (let i = 0; i < 8; i++) {
    const gx = 60 + i * 45
    ctx.beginPath()
    ctx.moveTo(gx, 360)
    ctx.quadraticCurveTo(gx + 5, 340, gx + 10, 355)
    ctx.stroke()
  }

  // 4. Petals (over stem)
  const petalCount = 8
  const petalR = 38
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2
    const px = cx + Math.cos(angle) * 55
    const py = 155 + Math.sin(angle) * 55
    circle(ctx, px, py, petalR)
  }

  // 5. Center circles (over petals)
  circle(ctx, cx, 155, 35)
  circle(ctx, cx, 155, 20)
}

const drawIceCream: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2

  // 1. Cone outline (drawn first, filled white)
  ctx.beginPath()
  ctx.moveTo(cx - 60, 200)
  ctx.lineTo(cx, 350)
  ctx.lineTo(cx + 60, 200)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 2. Waffle lines inside the cone (clipped to cone path)
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - 60, 200)
  ctx.lineTo(cx, 350)
  ctx.lineTo(cx + 60, 200)
  ctx.closePath()
  ctx.clip()

  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 1.5 // slightly thinner for grid lines
  // Diagonal lines top-left to bottom-right
  for (let i = -120; i < 120; i += 25) {
    ctx.beginPath()
    ctx.moveTo(cx + i, 180)
    ctx.lineTo(cx + i + 120, 360)
    ctx.stroke()
  }
  // Diagonal lines top-right to bottom-left
  for (let i = -120; i < 120; i += 25) {
    ctx.beginPath()
    ctx.moveTo(cx + i, 180)
    ctx.lineTo(cx + i - 120, 360)
    ctx.stroke()
  }
  ctx.restore()

  // 3. Ice Cream Scoop (single big scoop with wavy bottom edge)
  ctx.beginPath()
  // Start at left edge of the scoop dome
  ctx.arc(cx, 140, 65, Math.PI * 0.95, Math.PI * 2.05)
  // Fluffy bottom edge using quadratic curves
  ctx.quadraticCurveTo(cx + 55, 205, cx + 40, 200)
  ctx.quadraticCurveTo(cx + 20, 210, cx, 200)
  ctx.quadraticCurveTo(cx - 20, 210, cx - 40, 200)
  ctx.quadraticCurveTo(cx - 55, 205, cx - 62, 178)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.save()
  ctx.lineWidth = 2.5
  ctx.stroke()
  ctx.restore()

  // 4. Sprinkles (scattered across the scoop)
  const drawSprinkle = (x: number, y: number, angle: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.ellipse(0, 0, 8, 3, 0, 0, Math.PI * 2)
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
    ctx.restore()
  }
  drawSprinkle(cx - 30, 115, 0.4)
  drawSprinkle(cx + 25, 125, -0.6)
  drawSprinkle(cx - 5, 155, 0.1)
  drawSprinkle(cx + 35, 105, 0.8)
  drawSprinkle(cx - 15, 95, -0.2)
  drawSprinkle(cx + 10, 145, 0.5)

  // 5. Cherry on top (overlapping top scoop edge)
  circle(ctx, cx, 62, 15, false, true)

  // Cherry stem
  ctx.beginPath()
  ctx.moveTo(cx, 47)
  ctx.quadraticCurveTo(cx + 10, 30, cx + 18, 20)
  ctx.stroke()

  // Cherry leaf
  ctx.beginPath()
  ctx.moveTo(cx + 18, 20)
  ctx.quadraticCurveTo(cx + 25, 15, cx + 24, 25)
  ctx.quadraticCurveTo(cx + 18, 25, cx + 18, 20)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
}

const drawNature: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  
  // 1. Sun (furthest back)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(80 + Math.cos(angle) * 42, 70 + Math.sin(angle) * 42)
    ctx.lineTo(80 + Math.cos(angle) * 58, 70 + Math.sin(angle) * 58)
    ctx.stroke()
  }
  circle(ctx, 80, 70, 35)

  // 2. Hills (masks bottom of sun)
  ctx.beginPath()
  ctx.moveTo(0, 300)
  ctx.quadraticCurveTo(120, 240, 250, 280)
  ctx.quadraticCurveTo(380, 320, w, 260)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 3. River on the hills
  ctx.beginPath()
  ctx.moveTo(0, 340)
  ctx.quadraticCurveTo(150, 320, 300, 345)
  ctx.quadraticCurveTo(400, 360, w, 330)
  ctx.stroke()

  // 4. Tree Trunk
  ctx.beginPath()
  ctx.moveTo(280, 360)
  ctx.lineTo(280, 250)
  ctx.stroke()

  // 5. Tree Canopy (masks trunk top and hill lines)
  circle(ctx, 280, 200, 55)
  circle(ctx, 250, 220, 35)
  circle(ctx, 310, 220, 35)

  // 6. Cloud (in sky)
  circle(ctx, 350, 60, 22)
  circle(ctx, 380, 55, 28)
  circle(ctx, 410, 60, 22)
}

const drawSpace: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  // 1. Stars (in background)
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
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
  })

  // 2. Moon
  circle(ctx, 400, 70, 30)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.arc(415, 65, 25, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 3. Flame (drawn behind rocket)
  ctx.beginPath()
  ctx.moveTo(220, 320)
  ctx.lineTo(250, 370)
  ctx.lineTo(280, 320)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 4. Rocket Fins (drawn behind rocket body)
  ctx.beginPath()
  ctx.moveTo(200, 280)
  ctx.lineTo(160, 330)
  ctx.lineTo(200, 320)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(300, 280)
  ctx.lineTo(340, 330)
  ctx.lineTo(300, 320)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 5. Rocket Body (covers flame and fins overlaps)
  ctx.beginPath()
  ctx.moveTo(200, 320)
  ctx.lineTo(200, 140)
  ctx.lineTo(250, 100)
  ctx.lineTo(300, 140)
  ctx.lineTo(300, 320)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 6. Rocket Window
  circle(ctx, 250, 180, 35)
  circle(ctx, 250, 180, 20)
}

const drawSports: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2

  // 1. Goal (drawn first in the background)
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

  // 2. Soccer Ball (filled white to mask the goal lines behind it!)
  circle(ctx, cx, 180, 70)

  // 3. Pentagon pattern (on ball surface)
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
}

const drawFantasy: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2

  // 1. Castle in the background (drawn first, will be masked by unicorn legs/body)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(30, 280, 100, 80)
  ctx.strokeRect(30, 280, 100, 80)
  ctx.fillRect(50, 250, 25, 30)
  ctx.strokeRect(50, 250, 25, 30)
  ctx.fillRect(85, 250, 25, 30)
  ctx.strokeRect(85, 250, 25, 30)
  
  ctx.beginPath()
  ctx.moveTo(45, 250)
  ctx.lineTo(62, 230)
  ctx.lineTo(80, 250)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(80, 250)
  ctx.lineTo(97, 230)
  ctx.lineTo(115, 250)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.restore()

  // 2. Unicorn Legs (drawn behind body)
  ;[cx - 30, cx - 5, cx + 20, cx + 50].forEach(lx => {
    ctx.beginPath()
    ctx.moveTo(lx - 5, 320)
    ctx.lineTo(lx - 5, 360)
    ctx.lineTo(lx + 5, 360)
    ctx.lineTo(lx + 5, 320)
    ctx.closePath()
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
  })

  // 3. Tail (drawn behind body)
  ctx.beginPath()
  ctx.moveTo(cx - 75, 270)
  ctx.quadraticCurveTo(cx - 120, 240, cx - 100, 200)
  ctx.quadraticCurveTo(cx - 70, 220, cx - 75, 270)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 4. Body (covers legs & tail overlaps and background castle)
  ellipse(ctx, cx, 280, 80, 55)

  // 5. Neck (covers body top line)
  ctx.beginPath()
  ctx.moveTo(cx + 15, 250)
  ctx.quadraticCurveTo(cx + 35, 180, cx + 20, 130)
  ctx.lineTo(cx + 65, 130)
  ctx.quadraticCurveTo(cx + 70, 180, cx + 50, 250)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 6. Head (covers neck top line)
  circle(ctx, cx + 45, 115, 35)

  // 7. Horn (covers head line)
  ctx.beginPath()
  ctx.moveTo(cx + 35, 95)
  ctx.lineTo(cx + 45, 40)
  ctx.lineTo(cx + 55, 95)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 8. Mane (covers neck/head line)
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(cx + 25 + i * 8, 130 + i * 15, 15, 0, Math.PI)
    ctx.stroke()
  }

  // 9. Wing (covers body side line)
  ctx.beginPath()
  ctx.moveTo(cx - 20, 240)
  ctx.quadraticCurveTo(cx - 80, 180, cx - 60, 150)
  ctx.quadraticCurveTo(cx - 40, 200, cx - 20, 240)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
}

const drawEducational: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)

  // 1. Pencil (drawn in background)
  ctx.beginPath()
  ctx.moveTo(80, 320)
  ctx.lineTo(200, 100)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(200, 100)
  ctx.lineTo(215, 95)
  ctx.lineTo(95, 315)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
  circle(ctx, 205, 92, 8)

  // 2. Book (drawn in background)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(280, 300, 100, 70)
  ctx.strokeRect(280, 300, 100, 70)
  ctx.restore()
  ctx.beginPath()
  ctx.moveTo(330, 300)
  ctx.lineTo(330, 370)
  ctx.stroke()

  // 3. Blocks (drawn last, masking pencil/book lines in background)
  const blocks = [
    { x: 100, letter: 'A' },
    { x: 200, letter: 'B' },
    { x: 300, letter: 'C' },
  ]
  blocks.forEach(({ x, letter }) => {
    ctx.save()
    // 3D top side
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.moveTo(x - 40, 200)
    ctx.lineTo(x - 25, 185)
    ctx.lineTo(x + 55, 185)
    ctx.lineTo(x + 40, 200)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 3D right side
    ctx.beginPath()
    ctx.moveTo(x + 40, 200)
    ctx.lineTo(x + 55, 185)
    ctx.lineTo(x + 55, 265)
    ctx.lineTo(x + 40, 280)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Front face
    ctx.fillRect(x - 40, 200, 80, 80)
    ctx.strokeRect(x - 40, 200, 80, 80)

    ctx.font = 'bold 48px Fredoka, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#2D3748'
    ctx.fillText(letter, x, 240)
    ctx.restore()
  })
}

const drawCat: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)
  const cx = w / 2
  
  // 1. Tail (drawn first in background)
  ctx.beginPath()
  ctx.moveTo(cx + 30, 300)
  ctx.quadraticCurveTo(cx + 100, 280, cx + 90, 200)
  ctx.quadraticCurveTo(cx + 110, 280, cx + 30, 315)
  ctx.stroke()

  // 2. Body (covers tail)
  ellipse(ctx, cx, 260, 55, 70)

  // 3. Legs/Feet (drawn over body)
  ctx.beginPath()
  ctx.moveTo(cx - 30, 320)
  ctx.lineTo(cx - 35, 370)
  ctx.lineTo(cx - 15, 370)
  ctx.lineTo(cx - 15, 320)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx + 30, 320)
  ctx.lineTo(cx + 35, 370)
  ctx.lineTo(cx + 15, 370)
  ctx.lineTo(cx + 15, 320)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 4. Arms/Paws (drawn over body)
  ctx.beginPath()
  ctx.moveTo(cx - 50, 230)
  ctx.lineTo(cx - 90, 230)
  ctx.lineTo(cx - 90, 250)
  ctx.lineTo(cx - 40, 250)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx + 50, 230)
  ctx.lineTo(cx + 90, 230)
  ctx.lineTo(cx + 90, 250)
  ctx.lineTo(cx + 40, 250)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 5. Ears (behind head)
  ctx.beginPath()
  ctx.moveTo(cx - 50, 110)
  ctx.lineTo(cx - 35, 60)
  ctx.lineTo(cx - 15, 100)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx + 50, 110)
  ctx.lineTo(cx + 35, 60)
  ctx.lineTo(cx + 15, 100)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // 6. Head (covers top body and bottom ears overlap)
  circle(ctx, cx, 150, 60)

  // 7. Eyes, Nose, Mouth (on head)
  circle(ctx, cx - 22, 140, 8, true)
  circle(ctx, cx + 22, 140, 8, true)
  ctx.beginPath()
  ctx.moveTo(cx - 8, 158)
  ctx.lineTo(cx, 168)
  ctx.lineTo(cx + 8, 158)
  ctx.stroke()
}

const drawDinosaur: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)

  // Background Volcano (far left)
  ctx.beginPath()
  ctx.moveTo(0, 360)
  ctx.lineTo(80, 200)
  ctx.lineTo(120, 200)
  ctx.lineTo(160, 360)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
  
  // Volcano Lava smoke
  ctx.beginPath()
  ctx.moveTo(90, 200)
  ctx.quadraticCurveTo(80, 160, 60, 150)
  ctx.quadraticCurveTo(90, 150, 100, 170)
  ctx.quadraticCurveTo(120, 140, 140, 160)
  ctx.quadraticCurveTo(115, 185, 110, 200)
  ctx.stroke()

  // Background Palm Tree (far right)
  ctx.beginPath()
  ctx.moveTo(350, 360)
  ctx.quadraticCurveTo(360, 260, 380, 200)
  ctx.stroke()
  // Palm leaves
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI - Math.PI
    ctx.beginPath()
    ctx.moveTo(380, 200)
    ctx.quadraticCurveTo(
      380 + Math.cos(angle) * 50,
      200 + Math.sin(angle) * 30 + 10,
      380 + Math.cos(angle) * 70,
      200 + Math.sin(angle) * 50
    )
    ctx.stroke()
  }

  // Ground
  ctx.beginPath()
  ctx.moveTo(0, 360)
  ctx.quadraticCurveTo(100, 340, 220, 350)
  ctx.quadraticCurveTo(330, 360, w, 340)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Dino Tail
  ctx.beginPath()
  ctx.moveTo(130, 280)
  ctx.quadraticCurveTo(40, 290, 50, 180)
  ctx.quadraticCurveTo(90, 230, 140, 260)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Dino Spikes (on tail and back)
  const spikePts = [
    [60, 190], [80, 215], [105, 235], [135, 250], [165, 255], [195, 250]
  ]
  spikePts.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - 12, y - 18)
    ctx.lineTo(x + 10, y - 8)
    ctx.closePath()
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
  })

  // Dino Feet/Legs (drawn behind body)
  ;[[150, 310], [210, 310]].forEach(([lx, ly]) => {
    ctx.beginPath()
    ctx.moveTo(lx - 15, ly)
    ctx.lineTo(lx - 18, ly + 40)
    ctx.quadraticCurveTo(lx, ly + 48, lx + 18, ly + 40)
    ctx.lineTo(lx + 15, ly)
    ctx.closePath()
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
    // Toenails
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath()
      ctx.arc(lx + i * 8, ly + 40, 4, Math.PI, 0)
      ctx.stroke()
    }
  })

  // Dino Body (covers tail & legs)
  ellipse(ctx, 185, 285, 55, 45)

  // Dino Neck
  ctx.beginPath()
  ctx.moveTo(215, 260)
  ctx.quadraticCurveTo(245, 210, 240, 150)
  ctx.lineTo(275, 170)
  ctx.quadraticCurveTo(280, 220, 238, 280)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Dino Head (covers neck top line)
  ellipse(ctx, 265, 145, 30, 22)

  // Dino eye & happy smile
  circle(ctx, 275, 140, 4, true)
  ctx.beginPath()
  ctx.arc(270, 150, 10, 0.1, Math.PI * 0.8)
  ctx.stroke()

  // Dino Cute Spots on body
  circle(ctx, 155, 275, 8, false, false)
  circle(ctx, 175, 295, 6, false, false)
  circle(ctx, 195, 270, 10, false, false)
  circle(ctx, 180, 260, 5, false, false)

  // Dino Arms
  ctx.beginPath()
  ctx.moveTo(225, 275)
  ctx.quadraticCurveTo(245, 280, 250, 290)
  ctx.quadraticCurveTo(240, 295, 222, 285)
  ctx.stroke()
}

const drawCastle: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)

  // Background hills & clouds
  ctx.beginPath()
  ctx.moveTo(0, 290)
  ctx.quadraticCurveTo(100, 240, 200, 270)
  ctx.quadraticCurveTo(300, 300, w, 280)
  ctx.stroke()

  circle(ctx, 80, 100, 25)
  circle(ctx, 110, 95, 30)
  circle(ctx, 140, 100, 25)
  
  circle(ctx, 280, 80, 20)
  circle(ctx, 305, 75, 25)
  circle(ctx, 330, 80, 20)

  // Moat / River below castle
  ctx.beginPath()
  ctx.moveTo(0, 350)
  ctx.quadraticCurveTo(150, 330, 250, 350)
  ctx.quadraticCurveTo(350, 370, w, 345)
  ctx.stroke()

  // Castle Body (Center Square base)
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(110, 220, 180, 110)
  ctx.strokeRect(110, 220, 180, 110)
  ctx.restore()

  // Battlement slots on center wall
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  for (let x = 120; x < 280; x += 30) {
    ctx.fillRect(x, 205, 18, 15)
    ctx.strokeRect(x, 205, 18, 15)
  }
  ctx.restore()

  // Left Tower
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(70, 160, 40, 170)
  ctx.strokeRect(70, 160, 40, 170)
  // Left Tower Roof
  ctx.beginPath()
  ctx.moveTo(65, 160)
  ctx.lineTo(90, 90)
  ctx.lineTo(115, 160)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Flag on left tower
  ctx.beginPath()
  ctx.moveTo(90, 90)
  ctx.lineTo(90, 65)
  ctx.lineTo(110, 75)
  ctx.lineTo(90, 85)
  ctx.stroke()
  ctx.restore()

  // Right Tower
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(290, 160, 40, 170)
  ctx.strokeRect(290, 160, 40, 170)
  // Right Tower Roof
  ctx.beginPath()
  ctx.moveTo(285, 160)
  ctx.lineTo(310, 90)
  ctx.lineTo(335, 160)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Flag on right tower
  ctx.beginPath()
  ctx.moveTo(310, 90)
  ctx.lineTo(310, 65)
  ctx.lineTo(330, 75)
  ctx.lineTo(310, 85)
  ctx.stroke()
  ctx.restore()

  // Middle Tall Tower
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(170, 120, 60, 100)
  ctx.strokeRect(170, 120, 60, 100)
  // Roof
  ctx.beginPath()
  ctx.moveTo(165, 120)
  ctx.lineTo(200, 40)
  ctx.lineTo(235, 120)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Flag
  ctx.beginPath()
  ctx.moveTo(200, 40)
  ctx.lineTo(200, 15)
  ctx.lineTo(225, 25)
  ctx.lineTo(200, 35)
  ctx.stroke()
  ctx.restore()

  // Main Arched Gate
  ctx.beginPath()
  ctx.arc(200, 330, 30, Math.PI, 0)
  ctx.lineTo(230, 330)
  ctx.lineTo(170, 330)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()
  // Drawbridge grill lines
  ctx.beginPath()
  ctx.moveTo(180, 320)
  ctx.lineTo(180, 330)
  ctx.moveTo(200, 302)
  ctx.lineTo(200, 330)
  ctx.moveTo(220, 320)
  ctx.lineTo(220, 330)
  ctx.stroke()

  // Windows
  circle(ctx, 90, 200, 6, false, true)
  circle(ctx, 310, 200, 6, false, true)
  
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(190, 150, 20, 30)
  ctx.strokeRect(190, 150, 20, 30)
  ctx.restore()
}

const drawUnderwater: DrawFn = (ctx, w, h) => {
  setupCanvas(ctx, w, h)

  // Sandy bottom
  ctx.beginPath()
  ctx.moveTo(0, 350)
  ctx.quadraticCurveTo(150, 330, 260, 360)
  ctx.quadraticCurveTo(340, 375, w, 340)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Seaweed stems (left and right)
  ;[[35, 350, 120], [60, 360, 160], [330, 370, 140], [365, 350, 110]].forEach(([x, basey, height]) => {
    ctx.beginPath()
    ctx.moveTo(x, basey)
    ctx.quadraticCurveTo(x - 20, basey - height * 0.4, x - 10, basey - height * 0.7)
    ctx.quadraticCurveTo(x + 10, basey - height * 0.85, x, basey - height)
    ctx.quadraticCurveTo(x + 20, basey - height * 0.6, x - 5, basey - height * 0.35)
    ctx.closePath()
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
  })

  // Starfish on the ocean floor
  ctx.save()
  ctx.translate(160, 365)
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
    ctx.lineTo(Math.cos(angle) * 20, Math.sin(angle) * 20)
    const innerAngle = angle + Math.PI / 5
    ctx.lineTo(Math.cos(innerAngle) * 8, Math.sin(innerAngle) * 8)
  }
  ctx.closePath()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.stroke()
  ctx.restore()

  // Dolphin (Jumping)
  ctx.beginPath()
  ctx.moveTo(220, 160)
  // Main back curve
  ctx.quadraticCurveTo(160, 80, 80, 160)
  // Snout/nose
  ctx.lineTo(68, 168)
  ctx.quadraticCurveTo(72, 178, 80, 172)
  // Mouth
  ctx.quadraticCurveTo(90, 175, 95, 172)
  // Belly
  ctx.quadraticCurveTo(155, 140, 200, 185)
  // Tail flukes
  ctx.lineTo(215, 205)
  ctx.lineTo(220, 190)
  ctx.lineTo(235, 205)
  ctx.lineTo(220, 160)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Dolphin Fins
  // Back fin
  ctx.beginPath()
  ctx.moveTo(125, 115)
  ctx.quadraticCurveTo(120, 85, 105, 88)
  ctx.quadraticCurveTo(120, 105, 135, 120)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Side fin
  ctx.beginPath()
  ctx.moveTo(135, 145)
  ctx.quadraticCurveTo(130, 175, 145, 178)
  ctx.quadraticCurveTo(145, 155, 150, 145)
  ctx.closePath()
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.restore()
  ctx.stroke()

  // Dolphin Eye & blowhole
  circle(ctx, 92, 156, 3, true)
  circle(ctx, 115, 118, 1.5, true)

  // Bubbles
  ;[[260, 100, 12], [285, 130, 8], [250, 150, 6], [295, 90, 4]].forEach(([bx, by, br]) => {
    circle(ctx, bx, by, br, false, true)
  })
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
  dinosaur: drawDinosaur,
  castle: drawCastle,
  underwater: drawUnderwater,
}

export function drawColoringPage(ctx: CanvasRenderingContext2D, category: string, width = 400, height = 400) {
  const draw = COLORING_PAGES[category] ?? drawCat
  ctx.save()
  ctx.scale(width / 400, height / 400)
  draw(ctx, 400, 400)
  ctx.restore()
}
