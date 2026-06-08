import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import GardenBackground from './GardenBackground'
import Navbar from './Navbar'
import Footer from './Footer'
import SearchBar from './SearchBar'
import { useProgress } from '../context/ProgressContext'

export default function Layout() {
  const { isYoungMode, profile } = useProgress()

  return (
    <div
      className={`app-container ${isYoungMode() ? 'young-mode' : ''}`}
      style={{ '--accent-color': profile.favoriteColor } as CSSProperties}
    >
      <GardenBackground />
      <Navbar />
      <main className="main-content">
        <SearchBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
