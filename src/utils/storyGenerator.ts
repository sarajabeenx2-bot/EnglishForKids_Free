const templates: Record<string, string[]> = {
  default: [
    'Once upon a time, {character} went to the {place}.',
    'There, {character} met a friendly {animal} holding a shiny {object}.',
    '"Hello!" said the {animal}. "Would you like to play with my {object}?"',
    '{character} smiled and said, "Yes, let\'s have an adventure!"',
    'They played together all day and became best friends.',
    'And they lived happily, learning new English words every day! 🌟',
  ],
}

export function generateStory(
  character: string,
  place: string,
  animal: string,
  object: string,
): string[] {
  return templates.default.map(sentence =>
    sentence
      .replace(/{character}/g, character)
      .replace(/{place}/g, place)
      .replace(/{animal}/g, animal)
      .replace(/{object}/g, object)
  )
}
