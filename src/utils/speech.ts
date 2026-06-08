export function speak(text: string, rate = 0.9): void {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = 1.1
  utterance.lang = 'en-US'
  window.speechSynthesis.speak(utterance)
}

export function speakSlow(text: string): void {
  speak(text, 0.6)
}
