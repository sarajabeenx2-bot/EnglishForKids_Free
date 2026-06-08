import { Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { useProgress } from './context/ProgressContext'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Alphabet from './pages/Alphabet'
import Phonics from './pages/Phonics'
import Stories from './pages/Stories'
import StoryReader from './pages/StoryReader'
import Vocabulary from './pages/Vocabulary'
import Speaking from './pages/Speaking'
import Grammar from './pages/Grammar'
import Spelling from './pages/Spelling'
import Games from './pages/Games'
import Challenges from './pages/Challenges'
import Rewards from './pages/Rewards'
import ColoringStudio from './pages/ColoringStudio'
import Gallery from './pages/Gallery'
import Worksheets from './pages/Worksheets'
import ParentZone from './pages/ParentZone'
import StoryCreator from './pages/StoryCreator'
import InfoPages from './pages/InfoPages'
import './pages/InfoPages.css'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="alphabet" element={<Alphabet />} />
          <Route path="phonics" element={<Phonics />} />
          <Route path="stories" element={<Stories />} />
          <Route path="stories/:id" element={<StoryReader />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="speaking" element={<Speaking />} />
          <Route path="grammar" element={<Grammar />} />
          <Route path="spelling" element={<Spelling />} />
          <Route path="games" element={<Games />} />
          <Route path="games/:id" element={<Games />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="coloring" element={<ColoringStudio />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="worksheets" element={<Worksheets />} />
          <Route path="parent" element={<ParentZone />} />
          <Route path="story-creator" element={<StoryCreator />} />
          <Route path="about" element={<InfoPages />} />
          <Route path="contact" element={<InfoPages />} />
          <Route path="privacy" element={<InfoPages />} />
          <Route path="terms" element={<InfoPages />} />
          <Route path="faq" element={<InfoPages />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default function App() {
  const { profile } = useProgress()

  if (!profile.onboarded) {
    return (
      <>
        <Onboarding />
        <Analytics />
      </>
    )
  }

  return <AppRoutes />
}
