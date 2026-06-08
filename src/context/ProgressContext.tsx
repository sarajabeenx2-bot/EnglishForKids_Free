import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { UserProfile, Progress, Certificate, Artwork } from '../types'

const PROFILE_KEY = 'efkf_profile'
const PROGRESS_KEY = 'efkf_progress'

const defaultProfile: UserProfile = {
  name: '',
  ageGroup: '6-8',
  favoriteColor: '#FFD93D',
  buddy: 'rabbit',
  onboarded: false,
}

const defaultProgress: Progress = {
  xp: 0,
  stars: 0,
  level: 1,
  streak: 0,
  lastChallengeDate: '',
  badges: [],
  certificates: [],
  completedLessons: [],
  artwork: [],
  performance: { reading: 0, speaking: 0, vocabulary: 0, spelling: 0 },
  unlockedColoring: ['teddy', 'animals'],
  dailyChallengeCompleted: false,
}

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000]
const LEVEL_NAMES = ['', 'Beginner Explorer', 'Word Adventurer', 'Reading Hero', 'Vocabulary Master', 'English Champion']

function calcLevel(xp: number): 1 | 2 | 3 | 4 | 5 {
  if (xp >= 1000) return 5
  if (xp >= 600) return 4
  if (xp >= 300) return 3
  if (xp >= 100) return 2
  return 1
}

function applyXp(prev: Progress, amount: number): Progress {
  const xp = prev.xp + amount
  const newLevel = calcLevel(xp)
  const certs = [...prev.certificates]
  if (newLevel > prev.level) {
    certs.push({
      id: `cert-level-${newLevel}-${Date.now()}`,
      title: `${LEVEL_NAMES[newLevel]} Certificate`,
      date: new Date().toISOString(),
      type: 'level',
    })
  }
  return { ...prev, xp, level: newLevel, certificates: certs }
}

function getYesterdayString(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toDateString()
}

function normalizeProgress(prev: Progress): Progress {
  const today = new Date().toDateString()
  const yesterday = getYesterdayString()

  if (!prev.lastChallengeDate) {
    return { ...prev, dailyChallengeCompleted: false }
  }

  if (prev.lastChallengeDate === today) {
    return prev
  }

  const missedDay = prev.lastChallengeDate !== yesterday
  return {
    ...prev,
    dailyChallengeCompleted: false,
    streak: missedDay ? 0 : prev.streak,
  }
}

interface ProgressContextType {
  profile: UserProfile
  progress: Progress
  setProfile: (p: Partial<UserProfile>) => void
  completeOnboarding: (p: UserProfile) => void
  addXP: (amount: number) => void
  addStars: (amount: number) => void
  completeLesson: (id: string, xp?: number) => boolean
  isLessonCompleted: (id: string) => boolean
  addBadge: (badge: string) => void
  addCertificate: (cert: Omit<Certificate, 'id' | 'date'>) => void
  saveArtwork: (art: Omit<Artwork, 'id' | 'date'>) => void
  updatePerformance: (area: keyof Progress['performance'], score: number) => void
  completeDailyChallenge: () => boolean
  unlockColoring: (category: string) => void
  getLevelName: () => string
  getLevelProgress: () => number
  resetLearningProgress: () => void
  resetAll: () => void
  isYoungMode: () => boolean
  isAdvancedMode: () => boolean
}

const ProgressContext = createContext<ProgressContextType | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(() => load(PROFILE_KEY, defaultProfile))
  const [progress, setProgress] = useState<Progress>(() =>
    normalizeProgress(load(PROGRESS_KEY, defaultProgress))
  )

  useEffect(() => { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)) }, [profile])
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)) }, [progress])

  useEffect(() => {
    setProgress(prev => normalizeProgress(prev))
  }, [])

  const setProfile = useCallback((p: Partial<UserProfile>) => {
    setProfileState(prev => ({ ...prev, ...p }))
  }, [])

  const completeOnboarding = useCallback((p: UserProfile) => {
    setProfileState({ ...p, onboarded: true })
  }, [])

  const addXP = useCallback((amount: number) => {
    setProgress(prev => applyXp(prev, amount))
  }, [])

  const addStars = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, stars: prev.stars + amount }))
  }, [])

  const isLessonCompleted = useCallback(
    (id: string) => progress.completedLessons.includes(id),
    [progress.completedLessons],
  )

  const completeLesson = useCallback((id: string, xp = 10): boolean => {
    let wasNew = false
    setProgress(prev => {
      if (prev.completedLessons.includes(id)) return prev
      wasNew = true
      const withXp = applyXp(prev, xp)
      return {
        ...withXp,
        stars: withXp.stars + 1,
        completedLessons: [...withXp.completedLessons, id],
      }
    })
    return wasNew
  }, [])

  const addBadge = useCallback((badge: string) => {
    setProgress(prev => {
      if (prev.badges.includes(badge)) return prev
      return { ...prev, badges: [...prev.badges, badge] }
    })
  }, [])

  const addCertificate = useCallback((cert: Omit<Certificate, 'id' | 'date'>) => {
    setProgress(prev => ({
      ...prev,
      certificates: [...prev.certificates, { ...cert, id: `cert-${Date.now()}`, date: new Date().toISOString() }],
    }))
  }, [])

  const saveArtwork = useCallback((art: Omit<Artwork, 'id' | 'date'>) => {
    setProgress(prev => ({
      ...prev,
      artwork: [...prev.artwork, { ...art, id: `art-${Date.now()}`, date: new Date().toISOString() }],
    }))
  }, [])

  const updatePerformance = useCallback((area: keyof Progress['performance'], score: number) => {
    setProgress(prev => ({
      ...prev,
      performance: { ...prev.performance, [area]: Math.min(100, prev.performance[area] + score) },
    }))
  }, [])

  const completeDailyChallenge = useCallback((): boolean => {
    const today = new Date().toDateString()
    const yesterday = getYesterdayString()
    let wasNew = false

    setProgress(prev => {
      if (prev.lastChallengeDate === today && prev.dailyChallengeCompleted) return prev
      wasNew = true
      const newStreak =
        prev.lastChallengeDate === yesterday ? prev.streak + 1
        : prev.lastChallengeDate === today ? prev.streak
        : 1
      const withXp = applyXp(prev, 25)
      return {
        ...withXp,
        dailyChallengeCompleted: true,
        lastChallengeDate: today,
        streak: newStreak,
        stars: withXp.stars + 3,
      }
    })
    return wasNew
  }, [])

  const unlockColoring = useCallback((category: string) => {
    setProgress(prev => {
      if (prev.unlockedColoring.includes(category)) return prev
      return { ...prev, unlockedColoring: [...prev.unlockedColoring, category] }
    })
  }, [])

  const getLevelName = useCallback(() => LEVEL_NAMES[progress.level], [progress.level])

  const getLevelProgress = useCallback(() => {
    if (progress.level >= 5) return 100
    const current = LEVEL_THRESHOLDS[progress.level - 1] ?? 0
    const next = LEVEL_THRESHOLDS[progress.level] ?? 1000
    return Math.min(100, ((progress.xp - current) / (next - current)) * 100)
  }, [progress.xp, progress.level])

  const resetLearningProgress = useCallback(() => {
    setProgress(defaultProgress)
    localStorage.removeItem(PROGRESS_KEY)
  }, [])

  const resetAll = useCallback(() => {
    setProfileState(defaultProfile)
    setProgress(defaultProgress)
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(PROGRESS_KEY)
  }, [])

  const isYoungMode = useCallback(() => profile.ageGroup === '3-5', [profile.ageGroup])
  const isAdvancedMode = useCallback(() => profile.ageGroup === '9-10', [profile.ageGroup])

  return (
    <ProgressContext.Provider value={{
      profile, progress, setProfile, completeOnboarding, addXP, addStars,
      completeLesson, isLessonCompleted, addBadge, addCertificate, saveArtwork,
      updatePerformance, completeDailyChallenge, unlockColoring, getLevelName,
      getLevelProgress, resetLearningProgress, resetAll, isYoungMode, isAdvancedMode,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

export { LEVEL_NAMES }
