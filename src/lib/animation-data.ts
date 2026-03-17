import animationDataJson from '../../public/generated/animation-data.json'

export interface ManifestoWord {
  word: string
  start: number
  end: number
}

export interface ExperimentTiming {
  index: number
  enterProgress: number
  exitProgress: number
}

export interface AnimationData {
  manifesto: {
    words: ManifestoWord[]
    totalDuration: number
  }
  experiments: {
    timings: ExperimentTiming[]
    totalPinHeight: number
  }
  hero: {
    noiseDelay: number
    textDelay: number
    subtitleDelay: number
    ctaDelay: number
  }
  panorama: {
    bgSpeed: number
    midSpeed: number
    fgSpeed: number
  }
}

export const animationData = animationDataJson as AnimationData
