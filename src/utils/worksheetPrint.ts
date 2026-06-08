const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Nunito', 'Comic Sans MS', sans-serif;
    color: #2D3748;
    background: #fff;
    padding: 24px 32px;
    max-width: 800px;
    margin: 0 auto;
  }
  .ws-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 4px solid #FFD93D;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .ws-header h1 {
    font-family: 'Fredoka', sans-serif;
    font-size: 1.6rem;
    color: #5BA85E;
  }
  .ws-logo { font-size: 2rem; }
  .ws-meta {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
    font-size: 0.95rem;
  }
  .ws-meta span { border-bottom: 2px dotted #999; min-width: 140px; display: inline-block; }
  .ws-instructions {
    background: linear-gradient(135deg, #E8F8FF, #FFF9E6);
    border: 2px solid #87CEEB;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .trace-letter {
    font-family: 'Fredoka', sans-serif;
    font-size: 4.5rem;
    font-weight: 700;
    fill: none;
    stroke: #ccc;
    stroke-width: 2;
    stroke-dasharray: 8 6;
  }
  .trace-solid {
    font-family: 'Fredoka', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #bbb;
    letter-spacing: 0.3em;
  }
  .letter-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
    page-break-inside: avoid;
  }
  .letter-box {
    width: 90px;
    text-align: center;
    flex-shrink: 0;
  }
  .letter-emoji { font-size: 2rem; }
  .practice-line {
    flex: 1;
    border-bottom: 2px dotted #aaa;
    height: 36px;
    margin-top: 8px;
  }
  .word-trace-block {
    margin-bottom: 28px;
    page-break-inside: avoid;
  }
  .word-trace-block h3 {
    font-family: 'Fredoka', sans-serif;
    color: #5BA85E;
    margin-bottom: 8px;
  }
  .match-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  .match-item {
    border: 2px solid #87CEEB;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .match-item svg { margin: 8px auto; display: block; }
  .match-line {
    border-bottom: 2px dotted #999;
    height: 28px;
    margin-top: 12px;
  }
  .reading-passage {
    background: #F0FFF4;
    border-left: 5px solid #7BC67E;
    padding: 16px 20px;
    line-height: 1.9;
    font-size: 1.1rem;
    margin: 16px 0;
    border-radius: 0 12px 12px 0;
  }
  .question {
    margin: 16px 0;
    font-weight: 600;
  }
  .answer-line {
    border-bottom: 2px dotted #999;
    height: 32px;
    margin: 8px 0 16px;
  }
  .grammar-sentence {
    font-size: 1.15rem;
    padding: 12px 0;
    border-bottom: 1px dashed #ddd;
    line-height: 1.8;
  }
  .spell-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 14px 0;
    font-size: 1.3rem;
    font-family: 'Fredoka', sans-serif;
  }
  .spell-blank {
    display: inline-block;
    width: 28px;
    height: 36px;
    border-bottom: 3px solid #5BA85E;
    text-align: center;
    margin: 0 2px;
  }
  .color-scene {
    border: 3px solid #333;
    border-radius: 12px;
    margin: 16px auto;
    display: block;
  }
  .ws-footer {
    margin-top: 32px;
    text-align: center;
    color: #888;
    font-size: 0.85rem;
    border-top: 2px solid #eee;
    padding-top: 12px;
  }
  @media print {
    body { padding: 16px; }
    .no-print { display: none; }
  }
`

function wrap(title: string, instructions: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><title>${title}</title>
<style>${BASE_STYLES}</style>
</head><body>
  <div class="ws-header">
    <h1>🌻 ${title}</h1>
    <span class="ws-logo">EnglishForKidsFree</span>
  </div>
  <div class="ws-meta">
    <div><strong>Name:</strong> <span></span></div>
    <div><strong>Date:</strong> <span></span></div>
  </div>
  <div class="ws-instructions">📌 ${instructions}</div>
  ${body}
  <div class="ws-footer">EnglishForKidsFree — Free English Learning for Kids 🌈</div>
  <script>setTimeout(() => window.print(), 400)</script>
</body></html>`
}

function traceLetterSvg(letter: string, size = 72): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 80 80">
    <text x="40" y="58" text-anchor="middle" class="trace-letter" style="font-size:56px">${letter}</text>
  </svg>`
}

function traceWord(word: string): string {
  const letters = word.split('').map(l =>
    `<span class="trace-solid">${l}</span>`
  ).join(' ')
  return `<div style="font-size:2.5rem;letter-spacing:0.4em;color:#ccc;font-family:Fredoka;font-weight:700;margin:8px 0">${letters}</div>`
}

function alphabetSection(letters: string[], emojis: string[], words: string[]): string {
  return letters.map((l, i) => `
    <div class="letter-row">
      <div class="letter-box">
        ${traceLetterSvg(l)}
        <div class="letter-emoji">${emojis[i]}</div>
        <small>${words[i]}</small>
      </div>
      <div style="flex:1">
        <div style="font-size:0.85rem;color:#666;margin-bottom:4px">Trace:</div>
        ${traceLetterSvg(l, 56)}
        <div class="practice-line"></div>
        <div class="practice-line"></div>
      </div>
    </div>
  `).join('')
}

const ANIMAL_SVGS: Record<string, string> = {
  cat: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="42" r="22" fill="none" stroke="#333" stroke-width="2"/><polygon points="22,28 28,14 34,28" fill="none" stroke="#333" stroke-width="2"/><polygon points="46,28 52,14 58,28" fill="none" stroke="#333" stroke-width="2"/><circle cx="33" cy="40" r="3" fill="#333"/><circle cx="47" cy="40" r="3" fill="#333"/><path d="M36,48 Q40,54 44,48" fill="none" stroke="#333" stroke-width="2"/></svg>`,
  dog: `<svg width="80" height="80" viewBox="0 0 80 80"><ellipse cx="40" cy="44" rx="24" ry="20" fill="none" stroke="#333" stroke-width="2"/><ellipse cx="22" cy="32" rx="10" ry="14" fill="none" stroke="#333" stroke-width="2"/><ellipse cx="58" cy="32" rx="10" ry="14" fill="none" stroke="#333" stroke-width="2"/><circle cx="33" cy="42" r="3" fill="#333"/><circle cx="47" cy="42" r="3" fill="#333"/><ellipse cx="40" cy="50" rx="6" ry="4" fill="none" stroke="#333" stroke-width="2"/></svg>`,
  bird: `<svg width="80" height="80" viewBox="0 0 80 80"><ellipse cx="40" cy="40" rx="18" ry="14" fill="none" stroke="#333" stroke-width="2"/><circle cx="52" cy="36" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="55" cy="35" r="2" fill="#333"/><path d="M22,40 Q10,30 18,22" fill="none" stroke="#333" stroke-width="2"/><path d="M30,52 L40,60 L50,52" fill="none" stroke="#333" stroke-width="2"/></svg>`,
  fish: `<svg width="80" height="80" viewBox="0 0 80 80"><ellipse cx="38" cy="40" rx="22" ry="14" fill="none" stroke="#333" stroke-width="2"/><polygon points="58,40 72,28 72,52" fill="none" stroke="#333" stroke-width="2"/><circle cx="30" cy="38" r="3" fill="#333"/></svg>`,
}

const GARDEN_COLOR_SVG = `<svg class="color-scene" width="100%" height="320" viewBox="0 0 500 320">
  <rect width="500" height="200" fill="none"/>
  <path d="M0,200 Q125,160 250,180 Q375,200 500,170 L500,320 L0,320 Z" fill="none" stroke="#333" stroke-width="2"/>
  <path d="M350,280 Q380,200 400,120 Q410,80 420,60" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="420" cy="55" r="30" fill="none" stroke="#333" stroke-width="2"/>
  <ellipse cx="120" cy="230" rx="35" ry="40" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="105" cy="200" r="18" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="135" cy="200" r="18" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="250" cy="100" r="25" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="250" cy="100" r="8" fill="none" stroke="#333" stroke-width="2"/>
  <path d="M250,125 L250,200" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="200" cy="250" r="12" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="230" cy="240" r="12" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="270" cy="245" r="12" fill="none" stroke="#333" stroke-width="2"/>
  <circle cx="300" cy="255" r="12" fill="none" stroke="#333" stroke-width="2"/>
  <text x="250" y="30" text-anchor="middle" font-size="14" fill="#666">☀️ Color the Garden!</text>
</svg>`

const WORKSHEET_HTML: Record<string, string> = {
  'ws-alpha': wrap(
    'Alphabet Tracing A–M',
    'Trace each letter with your pencil. Say the letter name and word aloud!',
    alphabetSection(
      'ABCDEFGHIJKLM'.split(''),
      ['🍎', '⚽', '🐱', '🐶', '🐘', '🐟', '🍇', '🎩', '🍦', '🧃', '🪁', '🦁', '🌙'],
      ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grapes', 'Hat', 'Ice cream', 'Juice', 'Kite', 'Lion', 'Moon'],
    ),
  ),
  'ws-alpha2': wrap(
    'Alphabet Tracing N–Z',
    'Trace each letter with your pencil. Say the letter name and word aloud!',
    alphabetSection(
      'NOPQRSTUVWXYZ'.split(''),
      ['🪺', '🍊', '🐧', '👑', '🌈', '☀️', '🌳', '☂️', '🎻', '🐋', '🎵', '⛵', '🦓'],
      ['Nest', 'Orange', 'Penguin', 'Queen', 'Rainbow', 'Sun', 'Tree', 'Umbrella', 'Violin', 'Whale', 'Xylophone', 'Yacht', 'Zebra'],
    ),
  ),
  'ws-trace': wrap(
    'Word Tracing Practice',
    'Trace each word, then write it on your own on the lines below.',
  `  ${['cat', 'dog', 'sun', 'hat'].map(w => `
    <div class="word-trace-block">
      <h3>${w === 'cat' ? '🐱' : w === 'dog' ? '🐶' : w === 'sun' ? '☀️' : '🎩'} ${w.toUpperCase()}</h3>
      ${traceWord(w)}
      <div class="practice-line"></div>
      <div class="practice-line"></div>
      <div class="practice-line"></div>
    </div>
  `).join('')}`,
  ),
  'ws-vocab': wrap(
    'Animal Vocabulary',
    'Look at each animal. Write its name on the line. Then draw a line to match!',
    `<div class="match-grid">
      ${Object.entries(ANIMAL_SVGS).map(([name, svg]) => `
        <div class="match-item">
          ${svg}
          <div class="match-line"></div>
          <small>Write: ${name}</small>
        </div>
      `).join('')}
    </div>
    <p style="margin-top:20px;font-weight:600">Match each animal to the correct word:</p>
    <p style="font-size:1.2rem;margin:12px 0">cat &nbsp;&nbsp;&nbsp; dog &nbsp;&nbsp;&nbsp; bird &nbsp;&nbsp;&nbsp; fish</p>
    <div class="answer-line"></div>`,
  ),
  'ws-read': wrap(
    'Garden Reading',
    'Read the story carefully. Answer the questions in full sentences.',
    `<div class="reading-passage">
      <p>🐰 Ruby the rabbit lives in a green garden. Every morning, she hops past colorful flowers.</p>
      <p>🦉 Ollie the owl reads books under the big tree. Bella the bird sings happy songs.</p>
      <p>One sunny day, the three friends learned new English words: <strong>garden</strong>, <strong>flower</strong>, and <strong>friend</strong>.</p>
    </div>
    <div class="question">1. Who lives in the green garden?</div>
    <div class="answer-line"></div>
    <div class="question">2. What does Ollie the owl do under the tree?</div>
    <div class="answer-line"></div>
    <div class="question">3. Name two new words the friends learned:</div>
    <div class="answer-line"></div>
    <div class="question">4. Draw your favourite animal from the story:</div>
    <div style="border:2px dashed #ccc;height:120px;border-radius:12px;margin-top:8px"></div>`,
  ),
  'ws-grammar': wrap(
    'Nouns and Verbs',
    'Circle the NOUNS (naming words). Underline the VERBS (action words).',
    `<p style="margin-bottom:12px"><span style="background:#E8F8FF;padding:4px 10px;border-radius:8px">Noun = person, place, thing &nbsp;|&nbsp; Verb = action word</span></p>
    ${[
      'The cat runs in the garden.',
      'Ruby reads a book.',
      'Birds sing in the tree.',
      'Children play at school.',
      'The sun shines brightly.',
    ].map((s, i) => `<div class="grammar-sentence">${i + 1}. ${s}</div>`).join('')}
    <p style="margin-top:20px;font-weight:600">Write one noun and one verb you found:</p>
    <p>Noun: <span style="border-bottom:2px dotted #999;display:inline-block;min-width:200px"></span></p>
    <p style="margin-top:8px">Verb: <span style="border-bottom:2px dotted #999;display:inline-block;min-width:200px"></span></p>`,
  ),
  'ws-spell': wrap(
    'Spelling Practice',
    'Fill in the missing letters to complete each word. Use the picture clues!',
    `${[
      { clue: '🐱', word: 'c_t', answer: 'a' },
      { clue: '🐶', word: 'd_g', answer: 'o' },
      { clue: '☀️', word: 's_n', answer: 'u' },
      { clue: '🎩', word: 'h_t', answer: 'a' },
      { clue: '🍎', word: 'app_e', answer: 'l' },
      { clue: '🌳', word: 'tre_', answer: 'e' },
    ].map(({ clue, word }) => `
      <div class="spell-row">
        <span>${clue}</span>
        ${word.split('').map(c => c === '_' ? '<span class="spell-blank"></span>' : `<span>${c}</span>`).join('')}
      </div>
    `).join('')}
    <p style="margin-top:24px;font-weight:600">Now write two words on your own:</p>
    <div class="practice-line"></div>
    <div class="practice-line"></div>`,
  ),
  'ws-color': wrap(
    'Garden Coloring Sheet',
    'Use your favourite colours to make the garden beautiful!',
    `<p style="text-align:center;margin-bottom:8px">Color the rabbit, owl, tree, flowers, and sun!</p>
    ${GARDEN_COLOR_SVG}`,
  ),
}

export function printWorksheet(id: string, title: string, fallbackContent: string): void {
  const win = window.open('', '_blank')
  if (!win) return
  const html = WORKSHEET_HTML[id] ?? wrap(title, fallbackContent, `<p>${fallbackContent}</p>`)
  win.document.write(html)
  win.document.close()
}
