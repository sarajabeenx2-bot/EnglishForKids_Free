import { useLocation, Link } from 'react-router-dom'

const pages: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: 'About Us',
    content: (
      <>
        <p>EnglishForKidsFree is a free, safe English learning platform designed for children aged 3–10 years.</p>
        <p>Our mission is to make learning English fun, engaging, and accessible to every child — with no login, no ads, and no cost.</p>
        <h3>What We Offer</h3>
        <ul>
          <li>Interactive alphabet and phonics lessons</li>
          <li>Story library with read-along mode</li>
          <li>Vocabulary builder and picture dictionary</li>
          <li>Speaking practice with pronunciation feedback</li>
          <li>Grammar, spelling, and learning games</li>
          <li>Coloring studio and art gallery</li>
          <li>Printable worksheets and certificates</li>
          <li>Daily challenges and reward system</li>
        </ul>
        <p>All progress is saved locally on your device — no account needed!</p>
      </>
    ),
  },
  contact: {
    title: 'Contact',
    content: (
      <>
        <p>We'd love to hear from parents and educators!</p>
        <p><strong>Email:</strong> hello@englishforkidsfree.com</p>
        <p><strong>For Parents:</strong> Questions about learning progress, safety, or features.</p>
        <p><strong>For Educators:</strong> Interested in using our platform in your classroom? Get in touch!</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <h3>Child-Safe Design</h3>
        <p>EnglishForKidsFree is designed with children's privacy as a top priority.</p>
        <ul>
          <li><strong>No login or account creation</strong> — children can start learning immediately</li>
          <li><strong>No advertisements</strong> — a completely ad-free experience</li>
          <li><strong>Local storage only</strong> — progress is saved on your device, not sent to any server</li>
          <li><strong>No personal data collection</strong> — we do not collect names, emails, or personal information</li>
          <li><strong>No third-party tracking</strong> — no analytics or tracking cookies</li>
        </ul>
        <h3>Microphone Access</h3>
        <p>Speaking practice features may request microphone access for practice mode. Audio is used only during the activity, is not stored, and is never sent to any server.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <p>By using EnglishForKidsFree, you agree to these terms.</p>
        <h3>Use of Service</h3>
        <ul>
          <li>This platform is free for personal and educational use</li>
          <li>Content is designed for children aged 3–10 with parental guidance recommended for younger children</li>
          <li>We provide the service "as is" without warranties</li>
        </ul>
        <h3>Parental Responsibility</h3>
        <p>Parents and guardians are responsible for supervising their children's use of the platform, especially for children under 6.</p>
      </>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: (
      <>
        <h3>Is EnglishForKidsFree really free?</h3>
        <p>Yes! Completely free with no hidden costs, subscriptions, or advertisements.</p>
        <h3>Do I need to create an account?</h3>
        <p>No. Children can start learning immediately. Progress is saved on your device automatically.</p>
        <h3>What ages is this for?</h3>
        <p>Children aged 3–10. The platform adapts difficulty based on the age group selected during onboarding.</p>
        <h3>Is it safe for kids?</h3>
        <p>Yes. No ads, no login, no data collection. Safe Kids Mode is always active.</p>
        <h3>Can I use it on a tablet?</h3>
        <p>Yes! The platform is mobile-first and works on phones, tablets, and desktop computers.</p>
        <h3>How is progress saved?</h3>
        <p>Progress is stored in your browser's local storage. It stays on your device until you clear browser data or reset progress in Parent Zone.</p>
      </>
    ),
  },
}

export default function InfoPages() {
  const location = useLocation()
  const pageKey = location.pathname.replace('/', '') || 'about'
  const info = pages[pageKey] ?? pages.about

  if (!info) {
    return (
      <div className="card">
        <h2>Page not found</h2>
        <Link to="/">← Home</Link>
      </div>
    )
  }

  return (
    <div className="info-page">
      <div className="card info-content">
        <h1>{info.title}</h1>
        <div className="info-body">{info.content}</div>
        <Link to="/" className="btn btn-outline" style={{ marginTop: '2rem' }}>← Back to Home</Link>
      </div>
    </div>
  )
}
