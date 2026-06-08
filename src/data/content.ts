import type { Story, VocabWord, Game, Worksheet, SeasonalEvent } from '../types'

export const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => ({
  letter,
  lowercase: letter.toLowerCase(),
  word: ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grapes', 'Hat', 'Ice cream', 'Juice', 'Kite', 'Lion', 'Moon', 'Nest', 'Orange', 'Penguin', 'Queen', 'Rainbow', 'Sun', 'Tree', 'Umbrella', 'Violin', 'Whale', 'Xylophone', 'Yacht', 'Zebra'][i],
  emoji: ['🍎', '⚽', '🐱', '🐶', '🐘', '🐟', '🍇', '🎩', '🍦', '🧃', '🪁', '🦁', '🌙', '🪺', '🍊', '🐧', '👑', '🌈', '☀️', '🌳', '☂️', '🎻', '🐋', '🎵', '⛵', '🦓'][i],
  sound: `/ə/`,
}))

export const phonicsData = [
  { sound: 'a', words: ['apple', 'ant', 'alligator'], blend: 'a-p-p-l-e' },
  { sound: 'b', words: ['ball', 'bear', 'book'], blend: 'b-a-ll' },
  { sound: 'c', words: ['cat', 'cup', 'cake'], blend: 'c-a-t' },
  { sound: 'd', words: ['dog', 'duck', 'door'], blend: 'd-o-g' },
  { sound: 'e', words: ['egg', 'elf', 'elephant'], blend: 'e-g-g' },
  { sound: 'f', words: ['fish', 'fan', 'frog'], blend: 'f-i-sh' },
  { sound: 'g', words: ['goat', 'girl', 'gift'], blend: 'g-oa-t' },
  { sound: 'h', words: ['hat', 'hen', 'house'], blend: 'h-a-t' },
  { sound: 'i', words: ['igloo', 'ink', 'insect'], blend: 'i-g-l-oo' },
  { sound: 'j', words: ['jam', 'jet', 'juice'], blend: 'j-a-m' },
]

export const stories: Story[] = [
  {
    id: 'brave-bunny',
    title: 'The Brave Little Bunny',
    category: 'Animal Stories',
    level: ['3-5', '6-8'],
    moral: 'Being brave means trying even when you are scared.',
    content: [
      'In a green garden, a little bunny named Pip lived near a big oak tree.',
      'Pip was small but had a big heart.',
      'One day, Pip heard a bird crying in a tall tree.',
      '"Help me!" said the bird. "I cannot fly down!"',
      'Pip was afraid of heights, but he wanted to help.',
      'He climbed slowly, step by step.',
      'At last, Pip reached the bird and helped it down safely.',
      'All the animals cheered. Pip learned that bravery is helping others.',
    ],
    vocabulary: [
      { word: 'brave', meaning: 'Not afraid to try hard things' },
      { word: 'garden', meaning: 'A place where plants and flowers grow' },
      { word: 'heights', meaning: 'Being up high' },
    ],
  },
  {
    id: 'sharing-owl',
    title: 'Ollie the Sharing Owl',
    category: 'Moral Stories',
    level: ['3-5', '6-8', '9-10'],
    moral: 'Sharing makes everyone happy.',
    content: [
      'Ollie the owl loved reading books under the moonlight.',
      'He had many colorful books in his tree house.',
      'His friend Robin had no books to read.',
      'Ollie thought for a moment and smiled.',
      '"Let\'s read together!" said Ollie.',
      'They shared stories every evening and learned new words.',
      'Robin was happy. Ollie was happy too.',
      'Sharing made their friendship grow stronger.',
    ],
    vocabulary: [
      { word: 'sharing', meaning: 'Giving part of what you have to others' },
      { word: 'friendship', meaning: 'Being kind and caring with a friend' },
    ],
  },
  {
    id: 'river-adventure',
    title: 'Adventure by the River',
    category: 'Adventure Stories',
    level: ['6-8', '9-10'],
    content: [
      'Mia and her dog Max walked along a sparkling river.',
      'They found a map hidden inside an old bottle.',
      'The map showed a path through hills and flowers.',
      'They followed the trail, counting birds and naming colors.',
      'Behind a waterfall, they discovered a secret garden full of butterflies.',
      'Mia wrote new words in her notebook: river, adventure, butterfly, secret.',
      'It was the best day ever!',
    ],
    vocabulary: [
      { word: 'adventure', meaning: 'An exciting journey' },
      { word: 'sparkling', meaning: 'Shining brightly' },
      { word: 'butterfly', meaning: 'A colorful flying insect' },
    ],
  },
  {
    id: 'sleepy-moon',
    title: 'Sleepy Moon Stories',
    category: 'Bedtime Stories',
    level: ['3-5', '6-8'],
    content: [
      'The moon smiled down on the quiet garden.',
      'Little flowers closed their petals for the night.',
      'A soft wind sang a gentle lullaby.',
      'The rabbit, the owl, and the bird said goodnight.',
      'Stars twinkled like tiny night lights.',
      'Tomorrow would bring new words and new adventures.',
      'Sweet dreams, little learner!',
    ],
    vocabulary: [
      { word: 'lullaby', meaning: 'A soft song to help you sleep' },
      { word: 'twinkled', meaning: 'Flashed with little lights' },
    ],
  },
  {
    id: 'colors-rainbow',
    title: 'The Rainbow Lesson',
    category: 'Educational Stories',
    level: ['3-5', '6-8', '9-10'],
    content: [
      'After the rain, a beautiful rainbow appeared in the sky.',
      'Red, orange, yellow, green, blue, and purple shone brightly.',
      'Teacher Bird gathered all the young animals.',
      '"Today we learn colors in English!" she chirped.',
      'Each child found something matching every color.',
      'They practiced saying: red rose, green grass, blue sky.',
      'Learning colors was as fun as chasing butterflies!',
    ],
    vocabulary: [
      { word: 'rainbow', meaning: 'Colors in the sky after rain' },
      { word: 'appear', meaning: 'To come into view' },
    ],
  },
]

export const vocabulary: VocabWord[] = [
  { word: 'cat', meaning: 'A small furry pet', sentence: 'The cat sleeps on the mat.', emoji: '🐱', category: 'Animals' },
  { word: 'dog', meaning: 'A loyal pet animal', sentence: 'The dog loves to play.', emoji: '🐶', category: 'Animals' },
  { word: 'lion', meaning: 'A big wild cat', sentence: 'The lion roars loudly.', emoji: '🦁', category: 'Animals' },
  { word: 'apple', meaning: 'A sweet red or green fruit', sentence: 'I eat an apple every day.', emoji: '🍎', category: 'Food' },
  { word: 'bread', meaning: 'Food made from flour', sentence: 'We buy fresh bread.', emoji: '🍞', category: 'Food' },
  { word: 'milk', meaning: 'A white drink', sentence: 'Children drink milk.', emoji: '🥛', category: 'Food' },
  { word: 'mother', meaning: 'Your mom', sentence: 'My mother reads to me.', emoji: '👩', category: 'Family' },
  { word: 'father', meaning: 'Your dad', sentence: 'My father plays games.', emoji: '👨', category: 'Family' },
  { word: 'sister', meaning: 'A girl sibling', sentence: 'My sister is kind.', emoji: '👧', category: 'Family' },
  { word: 'book', meaning: 'Pages you read', sentence: 'I read a book at school.', emoji: '📚', category: 'School' },
  { word: 'pencil', meaning: 'Tool for writing', sentence: 'I write with a pencil.', emoji: '✏️', category: 'School' },
  { word: 'tree', meaning: 'A tall plant', sentence: 'Birds live in the tree.', emoji: '🌳', category: 'Nature' },
  { word: 'flower', meaning: 'A colorful plant', sentence: 'The flower smells nice.', emoji: '🌸', category: 'Nature' },
  { word: 'red', meaning: 'A bright color', sentence: 'The rose is red.', emoji: '🔴', category: 'Colors' },
  { word: 'blue', meaning: 'The color of the sky', sentence: 'The sky is blue.', emoji: '🔵', category: 'Colors' },
  { word: 'bus', meaning: 'A big vehicle', sentence: 'We go to school by bus.', emoji: '🚌', category: 'Transportation' },
  { word: 'car', meaning: 'A vehicle with wheels', sentence: 'Dad drives the car.', emoji: '🚗', category: 'Transportation' },
  { word: 'hand', meaning: 'Part at the end of your arm', sentence: 'Wash your hands.', emoji: '✋', category: 'Body Parts' },
  { word: 'eye', meaning: 'You see with your eyes', sentence: 'I have two eyes.', emoji: '👁️', category: 'Body Parts' },
  { word: 'doctor', meaning: 'Helps sick people', sentence: 'The doctor is kind.', emoji: '👨‍⚕️', category: 'Occupations' },
  { word: 'teacher', meaning: 'Helps you learn', sentence: 'My teacher is wonderful.', emoji: '👩‍🏫', category: 'Occupations' },
  { word: 'ball', meaning: 'A round toy', sentence: 'Kick the ball!', emoji: '⚽', category: 'Everyday Objects' },
  { word: 'chair', meaning: 'Something you sit on', sentence: 'Sit on the chair.', emoji: '🪑', category: 'Everyday Objects' },
]

export const games: Game[] = [
  { id: 'alphabet-match', name: 'Alphabet Match', description: 'Match letters with pictures', emoji: '🔤', xp: 15 },
  { id: 'word-match', name: 'Word Match', description: 'Match words with meanings', emoji: '🎯', xp: 20 },
  { id: 'vocab-hunt', name: 'Vocabulary Hunt', description: 'Find hidden words', emoji: '🔍', xp: 25 },
  { id: 'reading-race', name: 'Reading Race', description: 'Read words quickly', emoji: '🏃', xp: 20 },
  { id: 'memory-game', name: 'Memory Game', description: 'Match pairs of cards', emoji: '🧠', xp: 15 },
  { id: 'puzzle', name: 'Puzzle Challenge', description: 'Solve word puzzles', emoji: '🧩', xp: 25 },
  { id: 'spelling-challenge', name: 'Spelling Challenge', description: 'Spell words correctly', emoji: '✍️', xp: 20 },
]

export const grammarTopics = [
  { id: 'nouns', title: 'Nouns', description: 'Naming words for people, places, and things', examples: ['cat', 'school', 'London'], emoji: '📦' },
  { id: 'pronouns', title: 'Pronouns', description: 'Words that replace nouns', examples: ['I', 'you', 'he', 'she', 'they'], emoji: '👤' },
  { id: 'verbs', title: 'Verbs', description: 'Action words', examples: ['run', 'jump', 'read', 'play'], emoji: '🏃' },
  { id: 'adjectives', title: 'Adjectives', description: 'Describing words', examples: ['big', 'happy', 'blue', 'soft'], emoji: '🎨' },
  { id: 'adverbs', title: 'Adverbs', description: 'Words that describe verbs', examples: ['quickly', 'slowly', 'happily'], emoji: '⚡' },
  { id: 'tenses', title: 'Tenses', description: 'Past, present, and future', examples: ['I play', 'I played', 'I will play'], emoji: '⏰' },
  { id: 'sentences', title: 'Sentence Building', description: 'Put words together', examples: ['The cat sits.', 'I like apples.'], emoji: '📝' },
]

export const spellingWords = {
  easy: ['cat', 'dog', 'sun', 'hat', 'cup', 'pen', 'box', 'run'],
  medium: ['apple', 'happy', 'water', 'green', 'school', 'friend', 'flower', 'rabbit'],
  hard: ['beautiful', 'adventure', 'butterfly', 'elephant', 'rainbow', 'together'],
}

export const worksheets: Worksheet[] = [
  { id: 'ws-alpha', title: 'Alphabet Tracing A-M', category: 'Alphabet Worksheets', content: 'Trace letters A through M with dotted guides.' },
  { id: 'ws-alpha2', title: 'Alphabet Tracing N-Z', category: 'Alphabet Worksheets', content: 'Trace letters N through Z with dotted guides.' },
  { id: 'ws-trace', title: 'Word Tracing Practice', category: 'Tracing Worksheets', content: 'Trace simple words: cat, dog, sun, hat.' },
  { id: 'ws-vocab', title: 'Animal Vocabulary', category: 'Vocabulary Worksheets', content: 'Match animals to their names and color the pictures.' },
  { id: 'ws-read', title: 'Short Reading Passage', category: 'Reading Worksheets', content: 'Read about the garden and answer questions.' },
  { id: 'ws-grammar', title: 'Nouns and Verbs', category: 'Grammar Worksheets', content: 'Circle nouns and underline verbs in sentences.' },
  { id: 'ws-spell', title: 'Spelling Practice', category: 'Spelling Worksheets', content: 'Fill in missing letters to complete words.' },
  { id: 'ws-color-teddy', title: 'Teddy Bear Coloring Sheet', category: 'Coloring Worksheets', content: 'Color the cute teddy bear picnic scene.' },
  { id: 'ws-color-animals', title: 'Animals Coloring Sheet', category: 'Coloring Worksheets', content: 'Color adorable animals in the forest.' },
  { id: 'ws-color-icecream', title: 'Ice Cream Coloring Sheet', category: 'Coloring Worksheets', content: 'Color delicious ice cream cones and sundae treats.' },
  { id: 'ws-color-flowers', title: 'Beautiful Flowers Coloring Sheet', category: 'Coloring Worksheets', content: 'Color beautiful blooming garden flowers.' },
  { id: 'ws-color-nature', title: 'Garden Coloring Sheet', category: 'Coloring Worksheets', content: 'Color the garden scene with trees, flowers, and sunshine.' },
  { id: 'ws-color-space', title: 'Space Adventure Coloring Sheet', category: 'Coloring Worksheets', content: 'Color rocket ships, planets, and astronauts.' },
  { id: 'ws-color-sports', title: 'Sports Coloring Sheet', category: 'Coloring Worksheets', content: 'Color action-packed sports equipment and fields.' },
  { id: 'ws-color-fantasy', title: 'Magic Unicorn Coloring Sheet', category: 'Coloring Worksheets', content: 'Color a magical unicorn in a fairytale land.' },
  { id: 'ws-color-educational', title: 'Letters & Numbers Coloring Sheet', category: 'Coloring Worksheets', content: 'Color and learn letters and numbers.' },
  { id: 'ws-color-dino', title: 'Dinosaur Coloring Sheet', category: 'Coloring Worksheets', content: 'Color a friendly dinosaur stomping around.' },
  { id: 'ws-color-castle', title: 'Magic Castle Coloring Sheet', category: 'Coloring Worksheets', content: 'Color a beautiful fairytale castle with flags.' },
  { id: 'ws-color-underwater', title: 'Underwater World Coloring Sheet', category: 'Coloring Worksheets', content: 'Color funny fish, octopus, and sea plants.' },
]

export const seasonalEvents: SeasonalEvent[] = [
  {
    id: 'summer',
    name: '☀️ Summer Adventure Challenge',
    description: 'Dive into summer learning!',
    emoji: '☀️',
    season: 'Summer',
    challenges: [
      { title: '🌊 Beach Words', task: 'Learn 10 beach & ocean words: wave, sand, shell, swim, sunscreen, coral, anchor, tide, seagull, beach.' },
      { title: '🌈 Rainbow Art Story', task: 'Read "The Rainbow Lesson" and draw your own rainbow with 6 colors. Write the color name next to each stripe!' },
      { title: '🍦 Summer Spelling Bee', task: 'Spell these summer words out loud: sunshine, sandcastle, umbrella, watermelon, butterfly, lemonade.' },
      { title: '🌻 Nature Walk Journal', task: 'Go outside and find 5 things from nature. Draw them and write the English name for each one.' },
    ]
  },
  {
    id: 'winter',
    name: '❄️ Winter Wonderland Challenge',
    description: 'Cozy up with winter learning fun!',
    emoji: '❄️',
    season: 'Winter',
    challenges: [
      { title: '⛄ Snowman Story', task: 'Create a short story about a snowman! Use these words: cold, snow, scarf, carrot, magic, melt. Write at least 4 sentences.' },
      { title: '🧤 Winter Word Wall', task: 'Learn 10 winter words: blizzard, frost, icicle, mittens, fireplace, hibernate, snowflake, cozy, hot chocolate, avalanche.' },
      { title: '🎅 Holiday Vocabulary', task: 'Match each winter holiday word to its meaning: chimney, reindeer, sleigh, ornament, wreath, carol, festive, celebrate.' },
      { title: '🌨️ Describe the Weather', task: 'Practice describing winter weather! Say 3 sentences about cold weather using: It is..., The sky looks..., I feel...' },
    ]
  },
  {
    id: 'ramadan',
    name: '🌙 Ramadan Reading Challenge',
    description: 'Peaceful stories and mindful learning!',
    emoji: '🌙',
    season: 'Ramadan',
    challenges: [
      { title: '📖 Evening Story Time', task: 'Read "Sleepy Moon Stories" and "Ollie the Sharing Owl". After each story, write one sentence about what you learned.' },
      { title: '🤝 Kindness Word Journal', task: 'Write 5 sentences about kindness using these words: share, help, give, smile, care, friend, together, grateful.' },
      { title: '🌟 Good Deeds Diary', task: 'For 3 days, write one English sentence each day about a good deed you did. Example: "Today I helped my sister."' },
      { title: '🕌 Vocabulary of Giving', task: 'Learn these words and use each in a sentence: generous, grateful, peaceful, blessing, community, celebrate, charity, tradition.' },
    ]
  },
  {
    id: 'holiday',
    name: '🎄 Holiday Celebration Challenge',
    description: 'Festive fun with English learning!',
    emoji: '🎄',
    season: 'Holiday',
    challenges: [
      { title: '🎁 Gift Description Game', task: 'Describe a gift without saying its name! Use adjectives: color, size, shape, what it does. Can your family guess what it is?' },
      { title: '🎶 Holiday Song Writing', task: 'Write 4 lines of your own English holiday song! It can be about anything festive. Try to make two lines rhyme!' },
      { title: '✉️ Holiday Card Writing', task: 'Write a holiday card message in English to a friend or family member. Include: a greeting, a kind wish, and your signature.' },
      { title: '🍪 Recipe Vocabulary', task: 'Learn holiday cooking words: ingredient, mix, bake, sprinkle, decorate, oven, recipe, delicious, aroma, tradition.' },
    ]
  },
]

export const coloringCategories = [
  { id: 'teddy', name: 'Teddy Bears', emoji: '🧸' },
  { id: 'animals', name: 'Animals', emoji: '🐾' },
  { id: 'icecream', name: 'Ice Cream', emoji: '🍦' },
  { id: 'flowers', name: 'Flowers', emoji: '🌸' },
  { id: 'nature', name: 'Nature', emoji: '🌿' },
  { id: 'space', name: 'Space', emoji: '🚀' },
  { id: 'sports', name: 'Sports', emoji: '⚽' },
  { id: 'fantasy', name: 'Fantasy Art', emoji: '🦄' },
  { id: 'educational', name: 'Educational Sheets', emoji: '📖' },
  { id: 'dinosaur', name: 'Dinosaurs', emoji: '🦖' },
  { id: 'castle', name: 'Magic Castle', emoji: '🏰' },
  { id: 'underwater', name: 'Underwater', emoji: '🐙' },
]

export const storyCategories = ['Moral Stories', 'Animal Stories', 'Adventure Stories', 'Bedtime Stories', 'Educational Stories']
export const vocabCategories = ['Animals', 'Food', 'Family', 'School', 'Nature', 'Colors', 'Transportation', 'Body Parts', 'Occupations', 'Everyday Objects']

export const buddies = [
  { id: 'rabbit' as const, name: 'Ruby Rabbit', emoji: '🐰', greeting: 'Hi! I love hopping and learning letters!' },
  { id: 'owl' as const, name: 'Ollie Owl', emoji: '🦉', greeting: 'Hello! I enjoy reading wise stories!' },
  { id: 'bird' as const, name: 'Bella Bird', emoji: '🐦', greeting: 'Chirp chirp! Let\'s sing and speak English!' },
]

export const favoriteColors = [
  { name: 'Sunshine Yellow', value: '#FFD93D' },
  { name: 'Sky Blue', value: '#6ECFFF' },
  { name: 'Soft Green', value: '#7BC67E' },
  { name: 'Soft Pink', value: '#FFB6C1' },
  { name: 'Light Purple', value: '#C9A0FF' },
  { name: 'Coral', value: '#FF8A65' },
]

export const rewardChoices = [
  { id: 'coloring', label: 'Coloring Page', emoji: '🎨' },
  { id: 'badge', label: 'Badge', emoji: '🏅' },
  { id: 'story', label: 'Bonus Story', emoji: '📖' },
  { id: 'game', label: 'Mini Game', emoji: '🎮' },
  { id: 'xp', label: 'Extra XP', emoji: '⭐' },
  { id: 'surprise', label: 'Surprise Reward', emoji: '🎁' },
]

export const dailyChallenges = [
  { id: 'word', type: 'Word Challenge', task: 'Learn 3 new words today!', emoji: '📝', path: '/vocabulary' },
  { id: 'reading', type: 'Reading Challenge', task: 'Read one story aloud!', emoji: '📚', path: '/stories' },
  { id: 'speaking', type: 'Speaking Challenge', task: 'Practice saying 5 words!', emoji: '🗣️', path: '/speaking' },
  { id: 'vocabulary', type: 'Vocabulary Challenge', task: 'Complete a flashcard set!', emoji: '🃏', path: '/vocabulary' },
  { id: 'quiz', type: 'Quiz Challenge', task: 'Score 80% on a grammar quiz!', emoji: '✅', path: '/grammar' },
]
