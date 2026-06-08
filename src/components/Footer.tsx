import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-emoji">🌻</span>
          <h3>EnglishForKidsFree</h3>
          <p>Safe, free English learning for children aged 3–10. No ads. No login required.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Learn</h4>
            <Link to="/alphabet">Alphabet</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/games">Games</Link>
            <Link to="/vocabulary">Vocabulary</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/worksheets">Worksheets</Link>
            <Link to="/parent">Parent Zone</Link>
            <Link to="/about">About Us</Link>
            <Link to="/faq">FAQs</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EnglishForKidsFree. Made with 💚 for young learners.</p>
        <p className="safe-badge">🛡️ Safe Kids Mode — No Advertisements</p>
      </div>
    </footer>
  )
}
