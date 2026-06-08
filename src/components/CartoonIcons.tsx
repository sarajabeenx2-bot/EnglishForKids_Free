import React from 'react'

interface IconProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

// Helper component to wrap SVG elements and handle sizing
const CartoonIconWrap: React.FC<IconProps & { viewBox?: string, children: React.ReactNode }> = ({
  className = '',
  size = 24,
  style,
  viewBox = '0 0 24 24',
  children
}) => {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={`cartoon-icon ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
        ...style
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

// 1. Sunflower Logo Icon (Sunflower Emoji)
export const LogoIcon: React.FC<IconProps> = ({ className = '', style, size = 24 }) => (
  <span 
    className={`brand-logo-icon ${className}`} 
    style={{ 
      fontSize: `${size}px`, 
      lineHeight: 1, 
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style 
    }}
  >
    🌻
  </span>
)

// 2. Home Icon
export const HomeIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="homeRoof" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
      <linearGradient id="homeWall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF0" />
        <stop offset="100%" stopColor="#FFE7A5" />
      </linearGradient>
    </defs>
    <rect x="4" y="10" width="16" height="11" rx="2" fill="url(#homeWall)" stroke="#2D3748" strokeWidth="2.5" />
    <polygon points="2 10 12 2 22 10" fill="url(#homeRoof)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="10" y="14" width="4" height="7" rx="1" fill="#FF8A65" stroke="#2D3748" strokeWidth="2" />
    <circle cx="8" cy="14" r="1.75" fill="#6ECFFF" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 3. Treehouse Icon
export const TreehouseIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="thLeaves" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7BC67E" />
        <stop offset="100%" stopColor="#3C8F5E" />
      </linearGradient>
      <linearGradient id="thTrunk" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A8795A" />
        <stop offset="100%" stopColor="#5C2C16" />
      </linearGradient>
    </defs>
    <rect x="10" y="12" width="4" height="10" rx="1" fill="url(#thTrunk)" stroke="#2D3748" strokeWidth="2.5" />
    <line x1="8" y1="15" x2="16" y2="15" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="19" x2="16" y2="19" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="6" fill="url(#thLeaves)" stroke="#2D3748" strokeWidth="2" />
    <circle cx="8" cy="9" r="4.5" fill="url(#thLeaves)" stroke="#2D3748" strokeWidth="2" />
    <circle cx="16" cy="9" r="4.5" fill="url(#thLeaves)" stroke="#2D3748" strokeWidth="2" />
    <rect x="9" y="8" width="6" height="5" rx="1" fill="#FFE7A5" stroke="#2D3748" strokeWidth="2" />
    <polygon points="8 8 12 5 16 8" fill="#FF6B6B" stroke="#2D3748" strokeWidth="1.5" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 4. Open Book Icon (Learn / Stories)
export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ECFFF" />
        <stop offset="100%" stopColor="#3B9CFF" />
      </linearGradient>
    </defs>
    <path d="M2 18V5c0-1.5 1-2 3-2h6v15H5c-2 0-3 .5-3 0z" fill="url(#bookCover)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M22 18V5c0-1.5-1-2-3-2h-6v15h6c2 0 3 .5 3 0z" fill="url(#bookCover)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M4 4h7v13H4z" fill="#FFFDF0" stroke="#2D3748" strokeWidth="1.5" />
    <path d="M20 4h-7v13h7z" fill="#FFFDF0" stroke="#2D3748" strokeWidth="1.5" />
    <line x1="6" y1="7" x2="9" y2="7" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="10" x2="9" y2="10" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="7" x2="18" y2="7" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="10" x2="18" y2="10" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 5. Volume/Megaphone Icon (Phonics)
export const VolumeIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="volGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
    </defs>
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="url(#volGrad)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 6. Library Book Rack Icon (Stories Page)
export const LibraryIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <rect x="2" y="2" width="20" height="20" rx="3" fill="#FFE7A5" stroke="#2D3748" strokeWidth="2.5" />
    <rect x="4" y="5" width="4" height="11" rx="1" fill="#FF6B6B" stroke="#2D3748" strokeWidth="1.75" />
    <rect x="9" y="8" width="4" height="8" rx="1" fill="#6ECFFF" stroke="#2D3748" strokeWidth="1.75" />
    <rect x="14" y="6" width="5" height="10" rx="1" fill="#7BC67E" stroke="#2D3748" strokeWidth="1.75" />
    <line x1="2" y1="16" x2="22" y2="16" stroke="#2D3748" strokeWidth="2.5" />
    <rect x="5" y="18" width="14" height="2" rx="0.5" fill="#FF8A65" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 7. Languages Icon (Alphabet/Vocabulary)
export const LanguagesIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="bubbleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ECFFF" />
        <stop offset="100%" stopColor="#2D9CFF" />
      </linearGradient>
      <linearGradient id="bubblePink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6C1" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    {/* Bubble Left */}
    <path d="M10 14a4 4 0 1 1-4-4h4v4z" fill="url(#bubblePink)" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Bubble Right */}
    <path d="M14 6a4 4 0 1 1 4 4h-4V6z" fill="url(#bubbleBlue)" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    <text x="6" y="13" fontSize="6px" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFDF0" textAnchor="middle">a</text>
    <text x="18" y="9" fontSize="6px" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFDF0" textAnchor="middle">A</text>
  </CartoonIconWrap>
)

// 8. Puzzle Piece Icon (Grammar)
export const PuzzleIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="puzzleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C9A0FF" />
        <stop offset="100%" stopColor="#A06BFF" />
      </linearGradient>
    </defs>
    <path d="M19 11h-2.22a3 3 0 0 0-5.56 0H9V9.22a3 3 0 0 0 0-5.56V3H5v4.22a3 3 0 0 0 0 5.56V15h2.22a3 3 0 0 0 5.56 0H15v2.22a3 3 0 0 0 0 5.56V21h4v-4.22a3 3 0 0 0 0-5.56z" 
          fill="url(#puzzleGrad)" stroke="#2D3748" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 9. Checklist Board Icon (Vocabulary/Spelling)
export const SpellCheckIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="boardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="100%" stopColor="#FFE49E" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="16" height="18" rx="2" fill="url(#boardGrad)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M9 3h6v3H9z" fill="#D2996C" stroke="#2D3748" strokeWidth="1.5" />
    {/* Checks and Lines */}
    <circle cx="8" cy="9" r="1.5" fill="#7BC67E" stroke="#2D3748" strokeWidth="1" />
    <line x1="12" y1="9" x2="17" y2="9" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="13" r="1.5" fill="#7BC67E" stroke="#2D3748" strokeWidth="1" />
    <line x1="12" y1="13" x2="17" y2="13" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="17" r="1.5" fill="#7BC67E" stroke="#2D3748" strokeWidth="1" />
    <line x1="12" y1="17" x2="16" y2="17" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 10. Microphone Icon (Speaking)
export const MicIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="micMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    <rect x="9" y="3" width="6" height="11" rx="3" fill="url(#micMetal)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M5 10a7 7 0 0 0 14 0" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="9" y1="21" x2="15" y2="21" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 11. Game Controller Icon (Games)
export const GamepadIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="padGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF280" />
        <stop offset="100%" stopColor="#FFAB00" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="4" fill="url(#padGrad)" stroke="#2D3748" strokeWidth="2.5" />
    {/* D-Pad */}
    <line x1="6" y1="12" x2="10" y2="12" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="8" y1="10" x2="8" y2="14" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    {/* Action buttons */}
    <circle cx="15" cy="13" r="1.5" fill="#FF6B6B" stroke="#2D3748" strokeWidth="1.5" />
    <circle cx="18" cy="10" r="1.5" fill="#6ECFFF" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 12. Trophy Cup Icon (Challenges)
export const TrophyIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF780" />
        <stop offset="50%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FF9F1C" />
      </linearGradient>
    </defs>
    {/* Handles */}
    <path d="M4 9c0-2.5 2-3 2-3h12s2 .5 2 3c0 3-3 3.5-3 3.5" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 9c0-2.5-2-3-2-3H6s-2 .5-2 3c0 3 3 3.5 3 3.5" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    {/* Cup */}
    <path d="M6 6c0 6 3 8 6 8s6-2 6-8H6z" fill="url(#trophyGold)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Stem */}
    <path d="M12 14v4" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    {/* Base */}
    <rect x="7" y="18" width="10" height="3" rx="1" fill="#A06BFF" stroke="#2D3748" strokeWidth="2.5" />
  </CartoonIconWrap>
)

// 13. Paintbrush Icon (Coloring Studio)
export const PaintbrushIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="brushWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="100%" stopColor="#D7CCC8" />
      </linearGradient>
    </defs>
    <path d="M18 3l3 3L8 19l-4 1 1-4z" fill="url(#brushWood)" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Metal band */}
    <rect x="5.5" y="14.5" width="4" height="2.5" rx="0.5" fill="#CFD8DC" stroke="#2D3748" strokeWidth="1.5" transform="rotate(-45 7.5 15.75)" />
    {/* Brush bristles */}
    <path d="M3 21c-.5-1 .5-3 1.5-3.5s2.5.5 2.5 1.5c0 1.5-2.5 2.5-4 1z" fill="#FF6B6B" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 14. Magic Sparkles Icon (Story Creator)
export const SparklesIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    {/* Main large sparkle */}
    <path d="M10 3L12 8L17 10L12 12L10 17L8 12L3 10L8 8Z" fill="#FFD93D" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Small sparkle */}
    <path d="M18 14L19 17L22 18L19 19L18 22L17 19L14 18L17 17Z" fill="#6ECFFF" stroke="#2D3748" strokeWidth="1.5" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 15. Printer Icon (Worksheets)
export const PrinterIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <rect x="4" y="8" width="16" height="9" rx="2" fill="#E2E8F0" stroke="#2D3748" strokeWidth="2.5" />
    {/* Paper feed */}
    <path d="M7 8V4h10v4" fill="#FFFDF0" stroke="#2D3748" strokeWidth="1.5" />
    {/* Paper out */}
    <path d="M7 15v5h10v-5" fill="#FFFDF0" stroke="#2D3748" strokeWidth="2" />
    <line x1="9" y1="18" x2="15" y2="18" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* Power dot */}
    <circle cx="17" cy="11" r="1" fill="#7BC67E" />
  </CartoonIconWrap>
)

// 16. User Boy/Girl Icon (Profile)
export const UserIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF1E0" />
        <stop offset="100%" stopColor="#FFDCA9" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="#FFFDF0" stroke="#2D3748" strokeWidth="2.5" />
    {/* Hair */}
    <path d="M4 10c1-3 4-5 8-5s7 2 8 5c-2-1-4-1-6 0c-1 0-3 1-5 1c-2 0-4-.5-5-1z" fill="#FF8A65" stroke="#2D3748" strokeWidth="1.5" />
    {/* Smiling face inside */}
    <circle cx="9" cy="12" r="1.25" fill="#2D3748" />
    <circle cx="15" cy="12" r="1.25" fill="#2D3748" />
    <path d="M10 15c.5.8 1.5.8 2 0" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </CartoonIconWrap>
)

// 17. Award Medal Icon (Rewards)
export const AwardIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="medalGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
    </defs>
    {/* Ribbon */}
    <polygon points="8 12 5 22 12 18 19 22 16 12" fill="#FF6B6B" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Medal Outer */}
    <circle cx="12" cy="10" r="7.5" fill="url(#medalGold)" stroke="#2D3748" strokeWidth="2.5" />
    {/* Medal Star */}
    <path d="M12 6.5l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z" fill="#FFF" />
  </CartoonIconWrap>
)

// 18. Image Frame Icon (Gallery)
export const ImageIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6ECFFF" />
        <stop offset="100%" stopColor="#FFF" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#8D5B4C" stroke="#2D3748" strokeWidth="2.5" />
    <rect x="5" y="5" width="14" height="14" rx="0.5" fill="url(#skyGrad)" stroke="#2D3748" strokeWidth="1.5" />
    {/* Sun */}
    <circle cx="15" cy="8" r="2" fill="#FFD93D" />
    {/* Mountains */}
    <polygon points="5 19 11 11 15 15 19 19" fill="#7BC67E" stroke="#2D3748" strokeWidth="1.5" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 19. Two Users Smiling Icon (Parent Zone)
export const UsersIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    {/* Back Person */}
    <circle cx="16" cy="10" r="5" fill="#C9A0FF" stroke="#2D3748" strokeWidth="2" />
    <path d="M11 20a5 5 0 0 1 10 0" fill="#C9A0FF" stroke="#2D3748" strokeWidth="2" />
    {/* Front Person */}
    <circle cx="8" cy="12" r="5" fill="#FFB6C1" stroke="#2D3748" strokeWidth="2" />
    <path d="M3 21a5 5 0 0 1 10 0" fill="#FFB6C1" stroke="#2D3748" strokeWidth="2" />
  </CartoonIconWrap>
)

// 20. Lock Icon
export const LockIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="lockBronze" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#lockBronze)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.5" fill="#2D3748" />
    <line x1="12" y1="16.5" x2="12" y2="19" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 21. Unlock Icon
export const UnlockIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="lockBronze" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#lockBronze)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M8 11V7a4 4 0 1 1 8 0" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.5" fill="#2D3748" />
  </CartoonIconWrap>
)

// 22. Sun Icon
export const SunIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF780" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
    </defs>
    {/* Sun rays */}
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.17-8.83l-1.42 1.42m-10.82 10.82l-1.42 1.42m0-13.66l1.42 1.42m10.82 10.82l1.42 1.42" 
          stroke="#FF8A65" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="6" fill="url(#sunGrad)" stroke="#2D3748" strokeWidth="2.5" />
  </CartoonIconWrap>
)

// 23. Snowflake Icon
export const SnowflakeIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="#6ECFFF" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="#FFF" stroke="#2D3748" strokeWidth="2" />
  </CartoonIconWrap>
)

// 24. Crescent Moon Icon
export const MoonIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDD0" />
        <stop offset="100%" stopColor="#FFD93D" />
      </linearGradient>
    </defs>
    <path d="M12 3a9 9 0 1 0 9 9 7.5 7.5 0 0 1-9-9z" fill="url(#moonGrad)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="18" cy="5" r="0.75" fill="#FFE" />
    <circle cx="14" cy="7" r="0.5" fill="#FFE" />
  </CartoonIconWrap>
)

// 25. Gift Box Icon
export const GiftIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF416C" />
      </linearGradient>
    </defs>
    <rect x="4" y="9" width="16" height="12" rx="2" fill="url(#boxGrad)" stroke="#2D3748" strokeWidth="2.5" />
    <rect x="3" y="6" width="18" height="4" rx="1" fill="#FF8A65" stroke="#2D3748" strokeWidth="2.5" />
    {/* Ribbons */}
    <rect x="11" y="6" width="2" height="15" fill="#FFD93D" stroke="#2D3748" strokeWidth="1.5" />
    {/* Bow */}
    <circle cx="10" cy="4" r="2.25" fill="#FFD93D" stroke="#2D3748" strokeWidth="1.5" />
    <circle cx="14" cy="4" r="2.25" fill="#FFD93D" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 26. Fluffy Cloud Icon
export const CloudIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>
    <path d="M19 15a3.5 3.5 0 0 1-3.5 3.5H7.5A4.5 4.5 0 0 1 7.5 10a5 5 0 0 1 10-1c0 .2 0 .4-.1.6c1.6.4 1.6 3.4 1.6 5.4z" 
          fill="url(#cloudGrad)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 27. River Waves Icon
export const WavesIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <path d="M2 10c3 1.5 5-1.5 8 0s5 1.5 8 0s5-1.5 8 0" fill="none" stroke="#6ECFFF" strokeWidth="3" strokeLinecap="round" />
    <path d="M2 15c3 1.5 5-1.5 8 0s5 1.5 8 0s5-1.5 8 0" fill="none" stroke="#3B9CFF" strokeWidth="2.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 28. Compass Journey Map Icon
export const MapIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="mapPaper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF" />
        <stop offset="100%" stopColor="#FFE7A5" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#mapPaper)" stroke="#2D3748" strokeWidth="2.5" />
    <path d="M3 15c4-3 7 3 11 0s4-3 7 0" fill="none" stroke="#55B67E" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="7" cy="12" r="1.5" fill="#FF6B6B" />
    {/* Compass Needle */}
    <circle cx="15" cy="9" r="3" fill="#FFF" stroke="#2D3748" strokeWidth="1.5" />
    <polygon points="15 7 16 9 15 11 14 9" fill="#FF6B6B" />
  </CartoonIconWrap>
)

// 29. Golden Star Sticker Icon
export const StarIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="starSticker" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3B0" />
        <stop offset="50%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#starSticker)" stroke="#2D3748" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.5" cy="11" r="1" fill="#2D3748" />
    <circle cx="14.5" cy="11" r="1" fill="#2D3748" />
    <path d="M11 13.5c.5.5 1.5.5 2 0" stroke="#2D3748" strokeWidth="1" strokeLinecap="round" fill="none" />
  </CartoonIconWrap>
)

// 30. Lightning Zap XP Sticker Icon
export const ZapIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="zapSticker" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9A6" />
        <stop offset="100%" stopColor="#FFC837" />
      </linearGradient>
    </defs>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" fill="url(#zapSticker)" stroke="#2D3748" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 31. Flame Streak Sticker Icon
export const FlameIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="flameSticker" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF416C" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
    </defs>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" 
          fill="url(#flameSticker)" stroke="#2D3748" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 32. Rocket Space Station Icon (Space Node)
export const RocketIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6C1" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    {/* Rocket Flame */}
    <path d="M12 17v5" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 18v2" stroke="#FF8A65" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 18v2" stroke="#FF8A65" strokeWidth="2.5" strokeLinecap="round" />
    {/* Rocket Fins */}
    <path d="M8 13l-3 4v-3z" fill="#C9A0FF" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 13l3 4v-3z" fill="#C9A0FF" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Rocket Body */}
    <path d="M8 16V8c0-3 4-6 4-6s4 3 4 6v8H8z" fill="url(#rocketBody)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Window */}
    <circle cx="12" cy="9" r="2.25" fill="#6ECFFF" stroke="#2D3748" strokeWidth="1.5" />
  </CartoonIconWrap>
)

// 33. Compass Icon
export const CompassIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <circle cx="12" cy="12" r="9.5" fill="#6ECFFF" stroke="#2D3748" strokeWidth="2.5" />
    <polygon points="12 6 15 12 12 18 9 12" fill="#FF6B6B" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill="#FFF" />
  </CartoonIconWrap>
)

// 34. Trash2 Icon
export const TrashIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <rect x="5" y="6" width="14" height="15" rx="1.5" fill="#FF8A65" stroke="#2D3748" strokeWidth="2" />
    <line x1="2" y1="6" x2="22" y2="6" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 6V3h6v3" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="9" y1="10" x2="9" y2="17" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="10" x2="15" y2="17" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 35. Plus Icon
export const PlusIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 36. Info Icon
export const InfoIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <circle cx="12" cy="12" r="9.5" fill="#6ECFFF" stroke="#2D3748" strokeWidth="2" />
    <circle cx="12" cy="7.5" r="1.25" fill="#2D3748" />
    <line x1="12" y1="11" x2="12" y2="17" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
  </CartoonIconWrap>
)

// 37. Check Icon
export const CheckIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <circle cx="12" cy="12" r="9.5" fill="#7BC67E" stroke="#2D3748" strokeWidth="2" />
    <path d="M7.5 12l3 3 6.5-6.5" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </CartoonIconWrap>
)

// 38. Pen/Pencil Icon
export const PenToolIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="pencilWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
    </defs>
    <path d="M18 3l3 3L8 19l-4 1 1-4z" fill="url(#pencilWood)" stroke="#2D3748" strokeWidth="2" strokeLinejoin="round" />
    {/* Pencil tip eraser */}
    <path d="M18.5 4.5l1 1-1 1-1-1z" fill="#FFB6C1" stroke="#2D3748" strokeWidth="1" />
  </CartoonIconWrap>
)

// 39. Box Icon (Drawer)
export const BoxIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="boxWood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A8795A" />
        <stop offset="100%" stopColor="#5C2C16" />
      </linearGradient>
    </defs>
    <path d="M22 7.5L12 2.5L2 7.5L12 12.5Z" fill="#D2996C" stroke="#2D3748" strokeWidth="2.25" strokeLinejoin="round" />
    <path d="M2 7.5v9l10 5v-9Z" fill="url(#boxWood)" stroke="#2D3748" strokeWidth="2.25" strokeLinejoin="round" />
    <path d="M22 7.5v9l-10 5v-9Z" fill="#8D5B4C" stroke="#2D3748" strokeWidth="2.25" strokeLinejoin="round" />
    <line x1="12" y1="12.5" x2="12" y2="21.5" stroke="#2D3748" strokeWidth="2" />
  </CartoonIconWrap>
)

// 40. Paint Bucket Icon
export const BucketIcon: React.FC<IconProps> = (props) => (
  <CartoonIconWrap {...props}>
    <defs>
      <linearGradient id="bucketMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    {/* Handle */}
    <path d="M4 10C4 5 8 4 12 4s8 1 8 6" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    {/* Bucket Body */}
    <polygon points="5 10 19 10 17 21 7 21" fill="url(#bucketMetal)" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Paint dripping/flowing from bucket */}
    <path d="M8 10h8v3c0 2-2 3-4 3s-4-1-4-3v-3z" fill="#FF6B6B" />
  </CartoonIconWrap>
)
