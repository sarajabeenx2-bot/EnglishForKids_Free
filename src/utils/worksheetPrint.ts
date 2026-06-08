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
    border-bottom: 5px solid;
    border-image: linear-gradient(to right, #FF6B6B, #FFD93D, #6ECFFF, #7BC67E) 1;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .ws-header h1 {
    font-family: 'Fredoka', sans-serif;
    font-size: 1.6rem;
    color: #2D3748;
  }
  .ws-logo { 
    font-family: 'Fredoka', sans-serif;
    font-size: 1.5rem; 
    color: #4D94FF;
    font-weight: 700;
  }
  .ws-meta {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    font-size: 0.95rem;
    background: #F7FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 10px 16px;
  }
  .ws-meta-field {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }
  .ws-line {
    flex: 1;
    border-bottom: 2px dotted #CBD5E0;
    height: 18px;
  }
  .ws-instructions {
    background: linear-gradient(135deg, #E8F8FF, #FFF9E6);
    border: 2px solid #87CEEB;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #2B6CB0;
  }
  .reading-passage {
    background: #F0FFF4;
    border-left: 5px solid #48BB78;
    border-right: 1px solid #E2E8F0;
    border-top: 1px solid #E2E8F0;
    border-bottom: 1px solid #E2E8F0;
    padding: 20px 24px;
    line-height: 1.8;
    font-size: 1.15rem;
    margin: 20px 0;
    border-radius: 0 12px 12px 0;
    font-family: 'Nunito', sans-serif;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  .question {
    margin: 20px 0 8px;
    font-weight: 700;
    color: #2D3748;
    font-family: 'Fredoka', sans-serif;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .answer-line {
    border-bottom: 2px dashed #CBD5E0;
    height: 36px;
    margin: 4px 0 24px;
  }
  .grammar-sentence {
    font-size: 1.2rem;
    padding: 14px 16px;
    border-bottom: 1px dashed #E2E8F0;
    line-height: 1.8;
    background: #FFFBF0;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 1px dashed #FEEBC8;
  }
  .match-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  .match-item {
    border: 2px dashed #87CEEB;
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    background: #F0F9FF;
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
`;

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
    <div class="ws-meta-field"><strong>👤 Name:</strong> <div class="ws-line"></div></div>
    <div class="ws-meta-field"><strong>📅 Date:</strong> <div class="ws-line"></div></div>
  </div>
  <div class="ws-instructions">📌 ${instructions}</div>
  ${body}
  <div class="ws-footer">EnglishForKidsFree — Free English Learning for Kids 🌈</div>
  <script>setTimeout(() => window.print(), 400)</script>
</body></html>`;
}

function traceRowSvg(uppercase: string, lowercase: string): string {
  return `<svg width="100%" height="48" viewBox="0 0 500 48" style="display: block; background: #fff;">
    <!-- Guidelines -->
    <line x1="0" y1="8" x2="500" y2="8" stroke="#ff9999" stroke-width="1.2"/>
    <line x1="0" y1="20" x2="500" y2="20" stroke="#99ccff" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="0" y1="32" x2="500" y2="32" stroke="#4d94ff" stroke-width="1.5"/>
    <line x1="0" y1="44" x2="500" y2="44" stroke="#ff9999" stroke-width="1.2"/>
    
    <!-- Uppercase Tracing (3 times) -->
    <text x="30" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${uppercase}</text>
    <text x="70" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${uppercase}</text>
    <text x="110" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${uppercase}</text>
    
    <!-- Lowercase Tracing (3 times) -->
    <text x="170" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${lowercase}</text>
    <text x="210" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${lowercase}</text>
    <text x="250" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${lowercase}</text>
  </svg>`;
}

function traceWordRowSvg(word: string): string {
  const letters = word.split('');
  const letterSpacing = 28;
  const startX = 30;
  
  let tracingContent = '';
  // Render the word twice. First time starting at startX, second time starting at startX + wordLength * letterSpacing + 40
  for (let round = 0; round < 2; round++) {
    const offset = round * (letters.length * letterSpacing + 40);
    letters.forEach((l, idx) => {
      const x = startX + offset + (idx * letterSpacing);
      tracingContent += `<text x="${x}" y="32" font-family="'Fredoka', sans-serif" font-size="28" font-weight="700" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2" style="user-select: none;">${l}</text>`;
    });
  }

  return `<svg width="100%" height="48" viewBox="0 0 500 48" style="display: block; background: #fff;">
    <!-- Guidelines -->
    <line x1="0" y1="8" x2="500" y2="8" stroke="#ff9999" stroke-width="1.2"/>
    <line x1="0" y1="20" x2="500" y2="20" stroke="#99ccff" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="0" y1="32" x2="500" y2="32" stroke="#4d94ff" stroke-width="1.5"/>
    <line x1="0" y1="44" x2="500" y2="44" stroke="#ff9999" stroke-width="1.2"/>
    
    ${tracingContent}
  </svg>`;
}

function alphabetSection(letters: string[], emojis: string[], words: string[]): string {
  return letters.map((l, i) => {
    const lower = l.toLowerCase();
    return `
      <div class="letter-row" style="margin-bottom: 24px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 16px; page-break-inside: avoid; display: flex; align-items: center; gap: 16px;">
        <div class="letter-box" style="width: 120px; flex-shrink: 0; text-align: center; border-right: 2px solid #e2e8f0; padding-right: 16px; margin-right: 16px;">
          <div class="letter-emoji" style="font-size: 2.2rem; margin-bottom: 4px;">${emojis[i]}</div>
          <div style="font-family: 'Fredoka', sans-serif; font-size: 1.2rem; color: #2D3748;">
            <strong>${l}${lower}</strong>
          </div>
          <div style="font-size: 0.85rem; color: #718096; text-transform: capitalize; font-weight: 600;">${words[i]}</div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 0.8rem; font-weight: bold; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Trace & Practice:</div>
          ${traceRowSvg(l, lower)}
          <div style="height: 48px; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;48&quot; viewBox=&quot;0 0 100 48&quot;><line x1=&quot;0&quot; y1=&quot;8&quot; x2=&quot;100&quot; y2=&quot;8&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/><line x1=&quot;0&quot; y1=&quot;20&quot; x2=&quot;100&quot; y2=&quot;20&quot; stroke=&quot;%2399ccff&quot; stroke-width=&quot;1.2&quot; stroke-dasharray=&quot;4 3&quot;/><line x1=&quot;0&quot; y1=&quot;32&quot; x2=&quot;100&quot; y2=&quot;32&quot; stroke=&quot;%234d94ff&quot; stroke-width=&quot;1.5&quot;/><line x1=&quot;0&quot; y1=&quot;44&quot; x2=&quot;100&quot; y2=&quot;44&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/></svg>'); background-size: auto 48px; background-repeat: repeat-x;"></div>
        </div>
      </div>
    `;
  }).join('');
}

const ANIMAL_SVGS: Record<string, string> = {
  cat: `<svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 8px auto; display: block;">
    <path d="M30 40 C30 25, 70 25, 70 40 C70 55, 30 55, 30 40 Z" />
    <path d="M32 30 L22 12 L40 23" />
    <path d="M68 30 L78 12 L60 23" />
    <circle cx="42" cy="38" r="3" fill="#2D3748" />
    <circle cx="58" cy="38" r="3" fill="#2D3748" />
    <path d="M50 43 L50 46 C48 48, 46 48, 46 46 M50 46 C52 48, 54 48, 54 46" />
    <path d="M25 42 L12 40 M25 46 L10 47 M25 50 L12 54" />
    <path d="M75 42 L88 40 M75 46 L90 47 M75 50 L88 54" />
    <path d="M38 52 L35 85 L65 85 L62 52" />
    <path d="M42 85 C42 80, 48 80, 48 85" />
    <path d="M52 85 C52 80, 58 80, 58 85" />
    <path d="M63 75 C75 75, 80 60, 78 50" />
  </svg>`,
  dog: `<svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 8px auto; display: block;">
    <path d="M35 45 C35 30, 65 30, 65 45 C65 55, 35 55, 35 45 Z" />
    <path d="M36 33 C25 33, 22 55, 28 60 C34 65, 38 50, 38 45" />
    <path d="M64 33 C75 33, 78 55, 72 60 C66 65, 62 50, 62 45" />
    <circle cx="45" cy="42" r="3.5" fill="#2D3748" />
    <circle cx="55" cy="42" r="3.5" fill="#2D3748" />
    <ellipse cx="50" cy="49" rx="6" ry="4" fill="#2D3748" />
    <path d="M50 53 L50 56 C47 58, 45 56, 45 54 M50 56 C53 58, 55 56, 55 54" />
    <path d="M38 55 L35 85 L65 85 L62 55" />
    <path d="M62 70 C72 65, 75 55, 78 58 C80 60, 78 65, 72 75" />
    <path d="M39 55 H61" stroke="#FF6B6B" stroke-width="3" />
  </svg>`,
  bird: `<svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 8px auto; display: block;">
    <path d="M30 50 C20 50, 25 75, 45 75 C65 75, 70 55, 65 45 C60 38, 45 38, 30 50 Z" />
    <circle cx="62" cy="38" r="14" />
    <polygon points="76,36 86,40 76,44" fill="#FFA500" stroke="#2D3748" stroke-width="2" />
    <circle cx="64" cy="34" r="2.5" fill="#2D3748" />
    <path d="M38 56 C33 56, 32 68, 44 68 C52 68, 50 58, 45 56" />
    <path d="M24 54 L12 50 L18 58 L10 60 L22 64" />
    <path d="M42 75 L42 88 M42 84 L38 88 M42 84 L46 88" />
    <path d="M52 75 L52 88 M52 84 L48 88 M52 84 L56 88" />
  </svg>`,
  fish: `<svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 8px auto; display: block;">
    <path d="M20 50 C20 30, 70 30, 80 50 C70 70, 20 70, 20 50 Z" />
    <path d="M20 50 L5 35 L12 50 L5 65 Z" />
    <circle cx="66" cy="45" r="3" fill="#2D3748" />
    <path d="M80 52 C78 54, 74 53, 74 50" />
    <path d="M48 37 C48 25, 40 28, 42 35" />
    <path d="M45 62 C45 72, 40 68, 42 63" />
    <path d="M55 53 C52 53, 50 58, 53 60 C56 62, 58 56, 55 53" />
    <circle cx="86" cy="38" r="4" stroke-width="1.5" />
    <circle cx="92" cy="28" r="2.5" stroke-width="1.5" />
  </svg>`
};

const SPELL_CLUES_SVGS: Record<string, string> = {
  cat: `<svg width="44" height="44" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M30 40 C30 25, 70 25, 70 40 C70 55, 30 55, 30 40 Z" />
    <path d="M32 30 L22 12 L40 23" />
    <path d="M68 30 L78 12 L60 23" />
    <circle cx="42" cy="38" r="3" fill="#2D3748" />
    <circle cx="58" cy="38" r="3" fill="#2D3748" />
    <path d="M50 43 L50 46 C48 48, 46 48, 46 46 M50 46 C52 48, 54 48, 54 46" />
    <path d="M25 42 L12 40 M25 46 L10 47 M25 50 L12 54" />
    <path d="M75 42 L88 40 M75 46 L90 47 M75 50 L88 54" />
    <path d="M38 52 L35 85 L65 85 L62 52" />
    <path d="M42 85 C42 80, 48 80, 48 85" />
    <path d="M52 85 C52 80, 58 80, 58 85" />
  </svg>`,
  dog: `<svg width="44" height="44" viewBox="0 0 100 100" fill="none" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M35 45 C35 30, 65 30, 65 45 C65 55, 35 55, 35 45 Z" />
    <path d="M36 33 C25 33, 22 55, 28 60 C34 65, 38 50, 38 45" />
    <path d="M64 33 C75 33, 78 55, 72 60 C66 65, 62 50, 62 45" />
    <circle cx="45" cy="42" r="3.5" fill="#2D3748" />
    <circle cx="55" cy="42" r="3.5" fill="#2D3748" />
    <ellipse cx="50" cy="49" rx="6" ry="4" fill="#2D3748" />
    <path d="M50 53 L50 56 C47 58, 45 56, 45 54 M50 56 C53 58, 55 56, 55 54" />
    <path d="M38 55 L35 85 L65 85 L62 55" />
  </svg>`,
  sun: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="#2D3748" stroke-width="2" stroke-linecap="round"><circle cx="20" cy="20" r="8"/><path d="M20 5 L20 9 M20 31 L20 35 M5 20 L9 20 M31 20 L35 20 M9 9 L12 12 M28 28 L31 31 M9 31 L12 28 M28 12 L31 9"/></svg>`,
  hat: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="#2D3748" stroke-width="2" stroke-linecap="round"><path d="M8 30 H32 M12 30 V16 C12 12, 28 12, 28 16 V30 M8 30 C8 33, 32 33, 32 30" /><path d="M18 16 H22" /></svg>`,
  apple: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="#2D3748" stroke-width="2" stroke-linecap="round"><path d="M20 32 C12 32, 10 22, 14 16 C18 10, 22 12, 20 15 C18 12, 22 10, 26 16 C30 22, 28 32, 20 32 Z" /><path d="M20 15 C20 11, 24 9, 24 9" /></svg>`,
  tree: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="#2D3748" stroke-width="2" stroke-linecap="round"><path d="M18 34 V26 H22 V34 Z" /><path d="M12 26 C8 24, 8 16, 14 14 C12 10, 18 6, 22 10 C26 6, 32 10, 30 14 C36 16, 36 24, 30 26 Z" /></svg>`
};

function wrapColoringSheet(title: string, imageFile: string, instructions: string): string {
  const origin = window.location.origin;
  const src = `${origin}/drawings/${imageFile}`;
  return wrap(
    title,
    instructions,
    `<p style="text-align:center;margin-bottom:12px;color:#4A5568;font-weight:600;">Use your favorite crayons, colored pencils, or markers to color the scene!</p>
    <div style="border: 3px solid #2D3748; border-radius: 16px; margin: 16px auto; display: flex; align-items: center; justify-content: center; background: #fff; padding: 12px; max-width: 100%; height: 500px; box-sizing: border-box; page-break-inside: avoid; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <img src="${src}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;" alt="${title}" />
    </div>`
  );
}

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
    'Trace each word with your pencil, then practice writing it on the lines below.',
  `  ${['cat', 'dog', 'sun', 'hat'].map(w => `
    <div class="word-trace-block" style="margin-bottom: 24px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 16px; page-break-inside: avoid;">
      <h3 style="font-family: 'Fredoka', sans-serif; color: #4D94FF; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <span>${w === 'cat' ? '🐱' : w === 'dog' ? '🐶' : w === 'sun' ? '☀️' : '🎩'}</span>
        <span>${w.toUpperCase()}</span>
      </h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.8rem; font-weight: bold; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Trace the Word:</div>
        ${traceWordRowSvg(w)}
        <div style="font-size: 0.8rem; font-weight: bold; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Now write it on your own:</div>
        <div style="height: 48px; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;48&quot; viewBox=&quot;0 0 100 48&quot;><line x1=&quot;0&quot; y1=&quot;8&quot; x2=&quot;100&quot; y2=&quot;8&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/><line x1=&quot;0&quot; y1=&quot;20&quot; x2=&quot;100&quot; y2=&quot;20&quot; stroke=&quot;%2399ccff&quot; stroke-width=&quot;1.2&quot; stroke-dasharray=&quot;4 3&quot;/><line x1=&quot;0&quot; y1=&quot;32&quot; x2=&quot;100&quot; y2=&quot;32&quot; stroke=&quot;%234d94ff&quot; stroke-width=&quot;1.5&quot;/><line x1=&quot;0&quot; y1=&quot;44&quot; x2=&quot;100&quot; y2=&quot;44&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/></svg>'); background-size: auto 48px; background-repeat: repeat-x;"></div>
      </div>
    </div>
  `).join('')}`,
  ),
  'ws-vocab': wrap(
    'Animal Vocabulary Matching',
    'Look at each animal outline. Write its name on the line. Then match it to the correct word!',
    `<div class="match-grid" style="page-break-inside: avoid;">
      ${Object.entries(ANIMAL_SVGS).map(([name, svg]) => `
        <div class="match-item" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 190px;">
          ${svg}
          <div style="width: 100%;">
            <div class="match-line" style="border-bottom: 2px dotted #999; margin: 8px 12px 4px;"></div>
            <small style="font-weight: 600; color: #718096; display: block; text-align: center;">Write: ${name} _________</small>
          </div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top:24px;font-weight:700;font-family:'Fredoka',sans-serif;color:#2D3748;">Match each animal to the correct word:</p>
    <div style="font-size:1.3rem;margin:16px 0;display:flex;justify-content:space-around;font-family:'Fredoka',sans-serif;color:#4A5568;">
      <span style="border: 2px solid #E2E8F0; padding: 6px 16px; border-radius: 8px; background:#F7FAFC;">cat</span>
      <span style="border: 2px solid #E2E8F0; padding: 6px 16px; border-radius: 8px; background:#F7FAFC;">dog</span>
      <span style="border: 2px solid #E2E8F0; padding: 6px 16px; border-radius: 8px; background:#F7FAFC;">bird</span>
      <span style="border: 2px solid #E2E8F0; padding: 6px 16px; border-radius: 8px; background:#F7FAFC;">fish</span>
    </div>
    <div class="answer-line" style="margin-top:12px;"></div>`,
  ),
  'ws-read': wrap(
    'Garden Reading Comprehension',
    'Read the story carefully. Answer the questions in full sentences.',
    `<div class="reading-passage">
      <p style="margin-bottom:8px;">🐰 <strong>Ruby the rabbit</strong> lives in a green garden. Every morning, she hops past colorful flowers.</p>
      <p style="margin-bottom:8px;">🦉 <strong>Ollie the owl</strong> reads books under the big tree. 🐦 <strong>Bella the bird</strong> sings happy songs.</p>
      <p>One sunny day, the three friends learned new English words: <strong>garden</strong>, <strong>flower</strong>, and <strong>friend</strong>.</p>
    </div>
    <div class="question">🌟 1. Who lives in the green garden?</div>
    <div class="answer-line"></div>
    <div class="question">🌟 2. What does Ollie the owl do under the tree?</div>
    <div class="answer-line"></div>
    <div class="question">🌟 3. Name two new words the friends learned:</div>
    <div class="answer-line"></div>
    <div class="question">🎨 4. Draw your favorite animal from the story in the box below:</div>
    <div style="border:3px dashed #CBD5E0;height:160px;border-radius:16px;margin-top:12px;background:#F8FAFC;position:relative;display:flex;align-items:center;justify-content:center;">
      <span style="color:#A0AEC0;font-weight:600;font-size:1.1rem;font-family:'Fredoka',sans-serif;">✏️ Draw your masterpiece here!</span>
    </div>`,
  ),
  'ws-grammar': wrap(
    'Nouns and Verbs Activity',
    'Circle the NOUNS (naming words). Underline the VERBS (action words).',
    `<p style="margin-bottom:16px"><span style="background:linear-gradient(135deg, #EBF8FF, #EBF8FF);padding:6px 14px;border-radius:8px;font-weight:700;color:#2B6CB0;border:1px solid #BEE3F8;font-size:0.9rem;">💡 Remember: Noun = person, place, or thing | Verb = action word</span></p>
    ${[
      'The cat runs in the garden.',
      'Ruby reads a book.',
      'Birds sing in the tree.',
      'Children play at school.',
      'The sun shines brightly.',
    ].map((s, i) => `<div class="grammar-sentence"><strong>${i + 1}.</strong> ${s}</div>`).join('')}
    <p style="margin-top:24px;font-weight:700;color:#2D3748;font-family:'Fredoka',sans-serif;">Write one noun and one verb you found in the sentences above:</p>
    <div style="display:flex;gap:32px;margin-top:12px;">
      <div style="flex:1;"><strong>Noun:</strong> <div style="border-bottom:2px dashed #999;height:32px;margin-top:4px;"></div></div>
      <div style="flex:1;"><strong>Verb:</strong> <div style="border-bottom:2px dashed #999;height:32px;margin-top:4px;"></div></div>
    </div>`,
  ),
  'ws-spell': wrap(
    'Spelling Practice Challenge',
    'Fill in the missing letters to complete each word. Use the picture clues!',
    `${[
      { clue: 'cat', word: 'c_t', answer: 'a' },
      { clue: 'dog', word: 'd_g', answer: 'o' },
      { clue: 'sun', word: 's_n', answer: 'u' },
      { clue: 'hat', word: 'h_t', answer: 'a' },
      { clue: 'apple', word: 'app_e', answer: 'l' },
      { clue: 'tree', word: 'tre_', answer: 'e' },
    ].map(({ clue, word }) => `
      <div class="spell-row" style="display: flex; align-items: center; gap: 20px; margin: 20px 0; font-size: 1.4rem; font-family: 'Fredoka', sans-serif; page-break-inside: avoid;">
        <div style="width: 60px; height: 60px; border: 2px solid #E2E8F0; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #F7FAFC; padding: 4px;">
          ${SPELL_CLUES_SVGS[clue] ?? ''}
        </div>
        <div style="display: flex; align-items: center; letter-spacing: 0.1em;">
          ${word.split('').map(c => c === '_' ? '<span class="spell-blank" style="display: inline-block; width: 32px; height: 38px; border-bottom: 3px solid #5BA85E; text-align: center; margin: 0 4px; border-radius: 0;"></span>' : `<span style="padding: 0 4px; font-weight: 700; color: #2D3748;">${c.toUpperCase()}</span>`).join('')}
        </div>
      </div>
    `).join('')}
    <p style="margin-top:24px;font-weight:600">Now write two words on your own:</p>
    <div class="practice-line" style="height: 48px; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;48&quot; viewBox=&quot;0 0 100 48&quot;><line x1=&quot;0&quot; y1=&quot;8&quot; x2=&quot;100&quot; y2=&quot;8&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/><line x1=&quot;0&quot; y1=&quot;20&quot; x2=&quot;100&quot; y2=&quot;20&quot; stroke=&quot;%2399ccff&quot; stroke-width=&quot;1.2&quot; stroke-dasharray=&quot;4 3&quot;/><line x1=&quot;0&quot; y1=&quot;32&quot; x2=&quot;100&quot; y2=&quot;32&quot; stroke=&quot;%234d94ff&quot; stroke-width=&quot;1.5&quot;/><line x1=&quot;0&quot; y1=&quot;44&quot; x2=&quot;100&quot; y2=&quot;44&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/></svg>'); background-size: auto 48px; background-repeat: repeat-x;"></div>
    <div style="height: 20px;"></div>
    <div class="practice-line" style="height: 48px; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;48&quot; viewBox=&quot;0 0 100 48&quot;><line x1=&quot;0&quot; y1=&quot;8&quot; x2=&quot;100&quot; y2=&quot;8&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/><line x1=&quot;0&quot; y1=&quot;20&quot; x2=&quot;100&quot; y2=&quot;20&quot; stroke=&quot;%2399ccff&quot; stroke-width=&quot;1.2&quot; stroke-dasharray=&quot;4 3&quot;/><line x1=&quot;0&quot; y1=&quot;32&quot; x2=&quot;100&quot; y2=&quot;32&quot; stroke=&quot;%234d94ff&quot; stroke-width=&quot;1.5&quot;/><line x1=&quot;0&quot; y1=&quot;44&quot; x2=&quot;100&quot; y2=&quot;44&quot; stroke=&quot;%23ff9999&quot; stroke-width=&quot;1.2&quot;/></svg>'); background-size: auto 48px; background-repeat: repeat-x;"></div>`,
  ),

  // 12 New Premium Coloring worksheets
  'ws-color-teddy': wrapColoringSheet('Teddy Bear Coloring Sheet', 'teddy.png', 'Color the cute teddy bear picnic scene!'),
  'ws-color-animals': wrapColoringSheet('Animals Coloring Sheet', 'animals.png', 'Color adorable animals in the forest!'),
  'ws-color-icecream': wrapColoringSheet('Ice Cream Coloring Sheet', 'icecream.png', 'Color delicious ice cream cones and sundae treats!'),
  'ws-color-flowers': wrapColoringSheet('Beautiful Flowers Coloring Sheet', 'flowers.png', 'Color beautiful blooming garden flowers!'),
  'ws-color-nature': wrapColoringSheet('Garden Coloring Sheet', 'nature.png', 'Color the garden scene with trees, flowers, and sunshine!'),
  'ws-color-space': wrapColoringSheet('Space Adventure Coloring Sheet', 'space.png', 'Color rocket ships, planets, and astronauts!'),
  'ws-color-sports': wrapColoringSheet('Sports Coloring Sheet', 'sports.png', 'Color action-packed sports equipment and fields!'),
  'ws-color-fantasy': wrapColoringSheet('Magic Unicorn Coloring Sheet', 'fantasy.png', 'Color a magical unicorn in a fairytale land!'),
  'ws-color-educational': wrapColoringSheet('Letters & Numbers Coloring Sheet', 'educational.png', 'Color and learn letters and numbers!'),
  'ws-color-dino': wrapColoringSheet('Dinosaur Coloring Sheet', 'dinosaur.png', 'Color a friendly dinosaur stomping around!'),
  'ws-color-castle': wrapColoringSheet('Magic Castle Coloring Sheet', 'castle.png', 'Color a beautiful fairytale castle with flags!'),
  'ws-color-underwater': wrapColoringSheet('Underwater World Coloring Sheet', 'underwater.png', 'Color funny fish, octopus, and sea plants!'),
};

export function printWorksheet(id: string, title: string, fallbackContent: string): void {
  const win = window.open('', '_blank');
  if (!win) return;
  const html = WORKSHEET_HTML[id] ?? wrap(title, fallbackContent, `<p>${fallbackContent}</p>`);
  win.document.write(html);
  win.document.close();
}
