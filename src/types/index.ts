export type AgeGroup = '3-5' | '6-8' | '9-10'
export type Buddy = 'rabbit' | 'owl' | 'bird'
export type Level = 1 | 2 | 3 | 4 | 5

export interface UserProfile {
  name: string
  ageGroup: AgeGroup
  favoriteColor: string
  buddy: Buddy
  onboarded: boolean
}

export interface Progress {
  xp: number
  stars: number
  level: Level
  streak: number
  lastChallengeDate: string
  badges: string[]
  certificates: Certificate[]
  completedLessons: string[]
  artwork: Artwork[]
  performance: {
    reading: number
    speaking: number
    vocabulary: number
    spelling: number
  }
  unlockedColoring: string[]
  dailyChallengeCompleted: boolean
  treehouseItems: string[]
  soundEnabled: boolean
}

export interface Certificate {
  id: string
  title: string
  date: string
  type: string
}

export interface Artwork {
  id: string
  title: string
  dataUrl: string
  date: string
  category: string
}

export interface Story {
  id: string
  title: string
  category: string
  level: AgeGroup[]
  content: string[]
  vocabulary: { word: string; meaning: string }[]
  moral?: string
}

export interface VocabWord {
  word: string
  meaning: string
  sentence: string
  emoji: string
  category: string
}

export interface Game {
  id: string
  name: string
  description: string
  emoji: string
  xp: number
}

export interface Worksheet {
  id: string
  title: string
  category: string
  content: string
}

export interface SeasonalChallenge {
  title: string
  task: string
}

export interface SeasonalEvent {
  id: string
  name: string
  description: string
  emoji: string
  season: string
  challenges?: SeasonalChallenge[]
}
