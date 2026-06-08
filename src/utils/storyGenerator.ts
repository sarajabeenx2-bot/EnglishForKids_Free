const templates: Record<string, string[]> = {
  garden: [
    'One sunny morning, {character} skipped into the beautiful green garden.',
    'Near a big rose bush, {character} saw a fluffy {animal} holding a {object}.',
    '"Look at this!" chirped the {animal}. "It\'s a magic {object} that makes flowers sing!"',
    '{character} giggled and held the {object}. Together, they played music with the roses.',
    'They shared fresh strawberries and became best friends in the garden.',
    'They promised to learn new words and play together every single day! 🌟',
  ],
  forest: [
    'Once upon a time, {character} went on a grand adventure in the whispering forest.',
    'Behind a giant mossy tree, {character} met a friendly {animal} carrying a glowing {object}.',
    '"Hello traveller!" whispered the {animal}. "This {object} lights up the secret paths."',
    'With a hop and a skip, they followed the light deep into the magical woods.',
    'They discovered a hidden waterfall and shared stories under the leafy canopy.',
    'They lived happily, learning the language of the forest and its creatures! 🌟',
  ],
  beach: [
    'On a warm summer afternoon, {character} walked along the sandy beach.',
    'Right by the splashing blue waves, {character} spotted a funny {animal} wearing a hat and carrying a {object}.',
    '"Chirp chirp!" laughed the {animal}. "I found this shiny {object} buried in the sand!"',
    'Together, they built a giant sandcastle and decorated it with the {object}.',
    'They chased friendly crabs, ate ice cream, and listened to the ocean breeze.',
    'They had the most magical beach adventure and learned many new English words! 🌟',
  ],
  castle: [
    'High up on a hill, {character} visited a majestic royal castle.',
    'In the grand library room, {character} was greeted by a wise {animal} guarding a golden {object}.',
    '"Welcome!" hooted the {animal}. "This {object} unlocks the secret rooms of the castle."',
    'Hand in hand, they explored towers, climbed staircases, and looked at ancient maps.',
    'They drank sweet tea in the castle gardens and read stories of knights and dragons.',
    'It was a royal day of learning and fun, and they became friends forever! 🌟',
  ],
  school: [
    'It was a bright morning, and {character} walked into the cheerful school.',
    'At the desk, {character} sat next to a friendly {animal} holding a colorful {object}.',
    '"Welcome to class!" said the {animal}. "Let\'s study English with this special {object}!"',
    'They wrote down new words, drew pictures, and answered questions together.',
    'At recess, they played games on the playground and shared their lunch.',
    'They learned that school is the best place to make friends and explore the world! 🌟',
  ],
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
  const selectedTemplate = templates[place.toLowerCase()] ?? templates.default
  return selectedTemplate.map(sentence =>
    sentence
      .replace(/{character}/g, character)
      .replace(/{place}/g, place)
      .replace(/{animal}/g, animal)
      .replace(/{object}/g, object)
  )
}
