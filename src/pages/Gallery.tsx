import { useProgress } from '../context/ProgressContext'
import './Gallery.css'

export default function Gallery() {
  const { progress } = useProgress()

  const handleDownload = (dataUrl: string, title: string) => {
    const link = document.createElement('a')
    link.download = `${title}.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>🖼️ My Art Gallery</h1>
        <p>Your colored drawings, certificates, and achievement rewards!</p>
      </div>

      <h2 className="section-title">🎨 Colored Drawings ({progress.artwork.length})</h2>
      {progress.artwork.length === 0 ? (
        <div className="card empty-gallery">
          <span>🎨</span>
          <p>No artwork yet! Visit the Coloring Studio to create your first masterpiece!</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {progress.artwork.map(art => (
            <div key={art.id} className="card gallery-item">
              <img src={art.dataUrl} alt={art.title} />
              <h4>{art.title}</h4>
              <p>{new Date(art.date).toLocaleDateString()}</p>
              <div className="gallery-actions">
                <button className="btn btn-outline" onClick={() => handleDownload(art.dataUrl, art.title)}>⬇️ Download</button>
                <button className="btn btn-outline" onClick={() => window.print()}>🖨️ Print</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title" style={{ marginTop: '2rem' }}>📜 Certificates ({progress.certificates.length})</h2>
      {progress.certificates.length === 0 ? (
        <div className="card empty-gallery"><p>Complete levels to earn certificates!</p></div>
      ) : (
        <div className="cert-gallery">
          {progress.certificates.map(c => (
            <div key={c.id} className="card cert-gallery-item">
              <span>📜</span>
              <h4>{c.title}</h4>
              <p>{new Date(c.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title" style={{ marginTop: '2rem' }}>🏅 Badges ({progress.badges.length})</h2>
      <div className="badges-display">
        {progress.badges.length === 0 ? (
          <p className="empty-text">Earn badges by completing lessons!</p>
        ) : (
          progress.badges.map(b => <span key={b} className="badge-pill">🏅 {b}</span>)
        )}
      </div>
    </div>
  )
}
