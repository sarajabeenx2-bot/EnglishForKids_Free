export interface AgeContent3_5 {
  word: string
  emoji: string
  phonics: string
  fact: string
}

export interface AgeContent6_8 {
  word: string
  emoji: string
  sentence: string
  spellingWord: string // e.g. "Apple"
  missingPattern: string // e.g. "A _ _ l e"
  missingLetters: string[] // e.g. ["p", "p"]
}

export interface AgeContent9_10 {
  word: string
  emoji: string
  sentence: string
  definition: string
  unscrambleWord: string // scrambled version e.g. "T A S U N O R T A"
}

export interface AlphabetAgeItem {
  letter: string
  lowercase: string
  '3-5': AgeContent3_5
  '6-8': AgeContent6_8
  '9-10': AgeContent9_10
}

export const alphabetAgeData: Record<string, AlphabetAgeItem> = {
  A: {
    letter: 'A',
    lowercase: 'a',
    '3-5': {
      word: 'Apple',
      emoji: '🍎',
      phonics: 'A says /æ/ as in Apple',
      fact: 'Apples can be red, green, or yellow, and they are super crunchy!'
    },
    '6-8': {
      word: 'Apple',
      emoji: '🍎',
      sentence: 'The red apple hangs high on the tree branch.',
      spellingWord: 'Apple',
      missingPattern: 'A _ _ l e',
      missingLetters: ['p', 'p']
    },
    '9-10': {
      word: 'Astronaut',
      emoji: '🚀',
      sentence: 'The adventurous astronaut floated weightlessly outside the spaceship.',
      definition: 'A person who is trained to travel and work in outer space.',
      unscrambleWord: 'T A S U N O R T A'
    }
  },
  B: {
    letter: 'B',
    lowercase: 'b',
    '3-5': {
      word: 'Ball',
      emoji: '⚽',
      phonics: 'B says /b/ as in Ball',
      fact: 'Balls are round and bounce high on the playground!'
    },
    '6-8': {
      word: 'Ball',
      emoji: '⚽',
      sentence: 'The blue soccer ball bounces high into the sky.',
      spellingWord: 'Ball',
      missingPattern: 'B _ _ l',
      missingLetters: ['a', 'l']
    },
    '9-10': {
      word: 'Bicycle',
      emoji: '🚲',
      sentence: 'Riding a bicycle is an excellent way to exercise and explore the city.',
      definition: 'A vehicle with two wheels that is powered by pushing foot pedals.',
      unscrambleWord: 'C B Y L I E C'
    }
  },
  C: {
    letter: 'C',
    lowercase: 'c',
    '3-5': {
      word: 'Cat',
      emoji: '🐱',
      phonics: 'C says /k/ as in Cat',
      fact: 'Cats say meow, purr when happy, and love warm napping spots!'
    },
    '6-8': {
      word: 'Cat',
      emoji: '🐱',
      sentence: 'The fluffy orange cat sleeps soundly on the soft rug.',
      spellingWord: 'Cat',
      missingPattern: 'C _ _',
      missingLetters: ['a', 't']
    },
    '9-10': {
      word: 'Compass',
      emoji: '🧭',
      sentence: 'A compass helps wild explorers find their way in the deep green forest.',
      definition: 'An instrument with a magnetic needle that always points north.',
      unscrambleWord: 'M A C S O P S'
    }
  },
  D: {
    letter: 'D',
    lowercase: 'd',
    '3-5': {
      word: 'Dog',
      emoji: '🐶',
      phonics: 'D says /d/ as in Dog',
      fact: 'Dogs wag their tails and bark happily when they see their friends!'
    },
    '6-8': {
      word: 'Dog',
      emoji: '🐶',
      sentence: 'The happy dog chases the yellow ball across the green park.',
      spellingWord: 'Dog',
      missingPattern: 'D _ _',
      missingLetters: ['o', 'g']
    },
    '9-10': {
      word: 'Dolphin',
      emoji: '🐬',
      sentence: 'Dolphins are highly intelligent mammals that communicate using clicks and whistles.',
      definition: 'A very smart, friendly sea mammal with a snout and blowhole.',
      unscrambleWord: 'P H I L D O N'
    }
  },
  E: {
    letter: 'E',
    lowercase: 'e',
    '3-5': {
      word: 'Elephant',
      emoji: '🐘',
      phonics: 'E says /e/ as in Elephant',
      fact: 'Elephants are the biggest land animals and have long, useful trunks!'
    },
    '6-8': {
      word: 'Elephant',
      emoji: '🐘',
      sentence: 'A big gray elephant can lift heavy logs with its trunk.',
      spellingWord: 'Elephant',
      missingPattern: 'E _ _ _ h a n t',
      missingLetters: ['l', 'e', 'p']
    },
    '9-10': {
      word: 'Eclipse',
      emoji: '🌑',
      sentence: 'During a solar eclipse, the moon passes directly between the earth and the sun.',
      definition: 'An astronomical event where one space body blocks the view of another.',
      unscrambleWord: 'P S E C L I E'
    }
  },
  F: {
    letter: 'F',
    lowercase: 'f',
    '3-5': {
      word: 'Fish',
      emoji: '🐟',
      phonics: 'F says /f/ as in Fish',
      fact: 'Fish live underwater, blow bubbles, and breathe through gills!'
    },
    '6-8': {
      word: 'Fish',
      emoji: '🐟',
      sentence: 'The tiny gold fish swims quickly inside the glass aquarium.',
      spellingWord: 'Fish',
      missingPattern: 'F _ _ h',
      missingLetters: ['i', 's']
    },
    '9-10': {
      word: 'Fossil',
      emoji: '🦴',
      sentence: 'Paleontologists examine stone fossils to understand ancient creatures like dinosaurs.',
      definition: 'The preserved remains or traces of a prehistoric organism embedded in rock.',
      unscrambleWord: 'S I L O F S'
    }
  },
  G: {
    letter: 'G',
    lowercase: 'g',
    '3-5': {
      word: 'Grapes',
      emoji: '🍇',
      phonics: 'G says /g/ as in Grapes',
      fact: 'Grapes grow in large, juicy bunches on winding garden vines!'
    },
    '6-8': {
      word: 'Grapes',
      emoji: '🍇',
      sentence: 'My father packed sweet purple grapes in my school lunchbox.',
      spellingWord: 'Grapes',
      missingPattern: 'G _ _ p e s',
      missingLetters: ['r', 'a']
    },
    '9-10': {
      word: 'Glacier',
      emoji: '🏔️',
      sentence: 'Glaciers are massive, slow-moving rivers of ice found in freezing regions.',
      definition: 'A slowly moving mass or river of ice formed by the accumulation of snow.',
      unscrambleWord: 'R E I C A L G'
    }
  },
  H: {
    letter: 'H',
    lowercase: 'h',
    '3-5': {
      word: 'Hat',
      emoji: '🎩',
      phonics: 'H says /h/ as in Hat',
      fact: 'Hats keep our heads cool in summer and warm during winter!'
    },
    '6-8': {
      word: 'Hat',
      emoji: '🎩',
      sentence: 'She wore a wide straw hat to protect her face from the hot sun.',
      spellingWord: 'Hat',
      missingPattern: 'H _ _',
      missingLetters: ['a', 't']
    },
    '9-10': {
      word: 'Horizon',
      emoji: '🌅',
      sentence: 'We watched the golden sun sink slowly beneath the distant ocean horizon.',
      definition: 'The line at which the earth\'s surface and the sky appear to meet.',
      unscrambleWord: 'N O Z I O H R'
    }
  },
  I: {
    letter: 'I',
    lowercase: 'i',
    '3-5': {
      word: 'Ice cream',
      emoji: '🍦',
      phonics: 'I says /aɪ/ as in Ice cream',
      fact: 'Ice cream is a freezing, sweet treat that melts if you eat it too slowly!'
    },
    '6-8': {
      word: 'Ice cream',
      emoji: '🍦',
      sentence: 'We always buy double scoop strawberry ice cream cones in summer.',
      spellingWord: 'Icecream',
      missingPattern: 'I _ _ c r e a m',
      missingLetters: ['c', 'e']
    },
    '9-10': {
      word: 'Iguana',
      emoji: '🦎',
      sentence: 'The green iguana blended perfectly into the dense jungle foliage.',
      definition: 'A large, plant-eating lizard found in warm, tropical climates.',
      unscrambleWord: 'U A N A G I'
    }
  },
  J: {
    letter: 'J',
    lowercase: 'j',
    '3-5': {
      word: 'Juice',
      emoji: '🧃',
      phonics: 'J says /dʒ/ as in Juice',
      fact: 'Juice is made by squeezing delicious fresh fruits like oranges and apples!'
    },
    '6-8': {
      word: 'Juice',
      emoji: '🧃',
      sentence: 'I drank a cold cup of sweet apple juice with my snack.',
      spellingWord: 'Juice',
      missingPattern: 'J _ _ c e',
      missingLetters: ['u', 'i']
    },
    '9-10': {
      word: 'Journey',
      emoji: '⛵',
      sentence: 'The explorers embarked on a dangerous journey to explore uncharted islands.',
      definition: 'An act of traveling from one place to another, especially over a long distance.',
      unscrambleWord: 'E N R J U O Y'
    }
  },
  K: {
    letter: 'K',
    lowercase: 'k',
    '3-5': {
      word: 'Kite',
      emoji: '🪁',
      phonics: 'K says /k/ as in Kite',
      fact: 'Kites fly high and dance in the sky when the wind blows hard!'
    },
    '6-8': {
      word: 'Kite',
      emoji: '🪁',
      sentence: 'The children flew their colorful kite high above the windy beach.',
      spellingWord: 'Kite',
      missingPattern: 'K _ _ e',
      missingLetters: ['i', 't']
    },
    '9-10': {
      word: 'Kaleidoscope',
      emoji: '🌀',
      sentence: 'Peering into the kaleidoscope revealed a magical array of geometric colors.',
      definition: 'A tube toy containing mirrors and loose colored beads that reflect symmetrical shapes.',
      unscrambleWord: 'C O P E O L E I D A K S'
    }
  },
  L: {
    letter: 'L',
    lowercase: 'l',
    '3-5': {
      word: 'Lion',
      emoji: '🦁',
      phonics: 'L says /l/ as in Lion',
      fact: 'Lions roar loudly, sleep on rocks, and are called kings of the jungle!'
    },
    '6-8': {
      word: 'Lion',
      emoji: '🦁',
      sentence: 'The brave male lion stands proudly showing off his thick golden mane.',
      spellingWord: 'Lion',
      missingPattern: 'L _ _ n',
      missingLetters: ['i', 'o']
    },
    '9-10': {
      word: 'Labyrinth',
      emoji: '🌀',
      sentence: 'The heroic travelers wandered through a winding stone labyrinth looking for treasure.',
      definition: 'A complicated, irregular network of paths or passages in which it is easy to get lost; a maze.',
      unscrambleWord: 'H T N I R B A Y L'
    }
  },
  M: {
    letter: 'M',
    lowercase: 'm',
    '3-5': {
      word: 'Moon',
      emoji: '🌙',
      phonics: 'M says /m/ as in Moon',
      fact: 'The glowing moon changes shapes in the dark sky and shines at night!'
    },
    '6-8': {
      word: 'Moon',
      emoji: '🌙',
      sentence: 'The bright round moon illuminates the quiet dark garden.',
      spellingWord: 'Moon',
      missingPattern: 'M _ _ n',
      missingLetters: ['o', 'o']
    },
    '9-10': {
      word: 'Meteor',
      emoji: '☄️',
      sentence: 'A blazing meteor shot across the atmosphere, lighting up the sky.',
      definition: 'A small body of matter from space that enters the earth\'s atmosphere and glows due to friction.',
      unscrambleWord: 'O E T R E M'
    }
  },
  N: {
    letter: 'N',
    lowercase: 'n',
    '3-5': {
      word: 'Nest',
      emoji: '🪺',
      phonics: 'N says /n/ as in Nest',
      fact: 'Mother birds build cozy nests out of grass and twigs to keep eggs safe!'
    },
    '6-8': {
      word: 'Nest',
      emoji: '🪺',
      sentence: 'Three tiny blue bird eggs sit safely in the hidden tree nest.',
      spellingWord: 'Nest',
      missingPattern: 'N _ _ t',
      missingLetters: ['e', 's']
    },
    '9-10': {
      word: 'Nebula',
      emoji: '🌌',
      sentence: 'Astronomers used the telescope to take photos of a colorful star-forming nebula.',
      definition: 'A giant cloud of gas and dust in outer space, often a birthplace for new stars.',
      unscrambleWord: 'A L U B E N'
    }
  },
  O: {
    letter: 'O',
    lowercase: 'o',
    '3-5': {
      word: 'Orange',
      emoji: '🍊',
      phonics: 'O says /ɒ/ as in Orange',
      fact: 'Oranges are round, juicy, and grow on trees in sunny gardens!'
    },
    '6-8': {
      word: 'Orange',
      emoji: '🍊',
      sentence: 'He peeled the orange and shared the sweet juicy sections with his sister.',
      spellingWord: 'Orange',
      missingPattern: 'O _ _ n g e',
      missingLetters: ['r', 'a']
    },
    '9-10': {
      word: 'Oasis',
      emoji: '🌴',
      sentence: 'The weary camel drivers drank fresh water at the beautiful desert oasis.',
      definition: 'A fertile spot in a desert where water is found, surrounded by plants and trees.',
      unscrambleWord: 'S I A S O'
    }
  },
  P: {
    letter: 'P',
    lowercase: 'p',
    '3-5': {
      word: 'Penguin',
      emoji: '🐧',
      phonics: 'P says /p/ as in Penguin',
      fact: 'Penguins wear black and white suits, waddle on land, and swim super fast!'
    },
    '6-8': {
      word: 'Penguin',
      emoji: '🐧',
      sentence: 'The cute little penguin slides on its tummy across the slippery ice.',
      spellingWord: 'Penguin',
      missingPattern: 'P _ _ g u i n',
      missingLetters: ['e', 'n']
    },
    '9-10': {
      word: 'Pyramid',
      emoji: '🔺',
      sentence: 'We stood in awe looking at the massive stone pyramids of Giza in Egypt.',
      definition: 'A monumental stone structure with a square base and sloping triangular sides that meet at a point.',
      unscrambleWord: 'D I M A R Y P'
    }
  },
  Q: {
    letter: 'Q',
    lowercase: 'q',
    '3-5': {
      word: 'Queen',
      emoji: '👑',
      phonics: 'Q says /kw/ as in Queen',
      fact: 'Queens wear beautiful crowns, live in large castles, and rule kingdoms!'
    },
    '6-8': {
      word: 'Queen',
      emoji: '👑',
      sentence: 'The kind queen greeted all the children at the castle gate.',
      spellingWord: 'Queen',
      missingPattern: 'Q _ _ e n',
      missingLetters: ['u', 'e']
    },
    '9-10': {
      word: 'Quasar',
      emoji: '🌌',
      sentence: 'A quasar is a brilliant space object powered by a supermassive black hole.',
      definition: 'A massive, extremely remote celestial object emitting exceptionally large amounts of energy.',
      unscrambleWord: 'R A S A U Q'
    }
  },
  R: {
    letter: 'R',
    lowercase: 'r',
    '3-5': {
      word: 'Rainbow',
      emoji: '🌈',
      phonics: 'R says /r/ as in Rainbow',
      fact: 'Rainbows are beautiful colors that show up in the sky after the rain stops!'
    },
    '6-8': {
      word: 'Rainbow',
      emoji: '🌈',
      sentence: 'A vibrant, seven-colored rainbow curved across the blue sky.',
      spellingWord: 'Rainbow',
      missingPattern: 'R _ _ n b o w',
      missingLetters: ['a', 'i']
    },
    '9-10': {
      word: 'Reef',
      emoji: '🐠',
      sentence: 'Diverse coral reefs are home to thousands of colourful marine creatures.',
      definition: 'A ridge of jagged rock, coral, or sand just above or below the surface of the sea.',
      unscrambleWord: 'E E R F'
    }
  },
  S: {
    letter: 'S',
    lowercase: 's',
    '3-5': {
      word: 'Sun',
      emoji: '☀️',
      phonics: 'S says /s/ as in Sun',
      fact: 'The sun is a giant hot star that shines during the day and keeps us warm!'
    },
    '6-8': {
      word: 'Sun',
      emoji: '☀️',
      sentence: 'The hot summer sun shines brightly upon the sandy beach.',
      spellingWord: 'Sun',
      missingPattern: 'S _ _',
      missingLetters: ['u', 'n']
    },
    '9-10': {
      word: 'Submarine',
      emoji: '🚢',
      sentence: 'The crew rode the submarine down to explore the mysterious deep ocean floor.',
      definition: 'A specialized watercraft designed to operate independently deep underwater.',
      unscrambleWord: 'N I R A M B U S E'
    }
  },
  T: {
    letter: 'T',
    lowercase: 't',
    '3-5': {
      word: 'Tree',
      emoji: '🌳',
      phonics: 'T says /t/ as in Tree',
      fact: 'Trees have green leaves, brown bark, and grow tall over many years!'
    },
    '6-8': {
      word: 'Tree',
      emoji: '🌳',
      sentence: 'A cute little squirrel ran up the trunk of the oak tree.',
      spellingWord: 'Tree',
      missingPattern: 'T _ _ e',
      missingLetters: ['r', 'e']
    },
    '9-10': {
      word: 'Telescope',
      emoji: '🔭',
      sentence: 'We peered through the telescope to observe the craters on the surface of the moon.',
      definition: 'An optical instrument designed to make distant objects appear much nearer and larger.',
      unscrambleWord: 'P O C E S E L T'
    }
  },
  U: {
    letter: 'U',
    lowercase: 'u',
    '3-5': {
      word: 'Umbrella',
      emoji: '☂️',
      phonics: 'U says /ʌ/ as in Umbrella',
      fact: 'Umbrellas keep us perfectly dry and cozy when raindrops start falling!'
    },
    '6-8': {
      word: 'Umbrella',
      emoji: '☂️',
      sentence: 'I opened my colorful umbrella when the rain began to pour.',
      spellingWord: 'Umbrella',
      missingPattern: 'U _ _ r e l l a',
      missingLetters: ['m', 'b']
    },
    '9-10': {
      word: 'Universe',
      emoji: '🌌',
      sentence: 'The vast universe contains billions of mysterious galaxies and planetary systems.',
      definition: 'All of space, time, matter, and energy, including planets, stars, and galaxies.',
      unscrambleWord: 'E S E R V I N U'
    }
  },
  V: {
    letter: 'V',
    lowercase: 'v',
    '3-5': {
      word: 'Violin',
      emoji: '🎻',
      phonics: 'V says /v/ as in Violin',
      fact: 'Violins make beautiful high notes when you draw a bow across their strings!'
    },
    '6-8': {
      word: 'Violin',
      emoji: '🎻',
      sentence: 'He played a lovely, gentle classical song on his wooden violin.',
      spellingWord: 'Violin',
      missingPattern: 'V _ _ l i n',
      missingLetters: ['i', 'o']
    },
    '9-10': {
      word: 'Volcano',
      emoji: '🌋',
      sentence: 'Streams of red hot molten lava cascaded down the sides of the erupting volcano.',
      definition: 'A mountain with a crater or vent through which lava, rock fragments, and gas erupt.',
      unscrambleWord: 'C A N O L O V'
    }
  },
  W: {
    letter: 'W',
    lowercase: 'w',
    '3-5': {
      word: 'Whale',
      emoji: '🐋',
      phonics: 'W says /w/ as in Whale',
      fact: 'Whales are the absolute biggest animals in the sea and sing deep songs!'
    },
    '6-8': {
      word: 'Whale',
      emoji: '🐋',
      sentence: 'The massive blue whale sprayed water high out of its blowhole.',
      spellingWord: 'Whale',
      missingPattern: 'W _ _ l e',
      missingLetters: ['h', 'a']
    },
    '9-10': {
      word: 'Wilderness',
      emoji: '🌲',
      sentence: 'We packed our bags and went camping in the beautiful mountain wilderness.',
      definition: 'A wild, uncultivated region of land that is left in its natural state.',
      unscrambleWord: 'S E N R E D L I W'
    }
  },
  X: {
    letter: 'X',
    lowercase: 'x',
    '3-5': {
      word: 'Xylophone',
      emoji: '🎵',
      phonics: 'X says /z/ as in Xylophone',
      fact: 'You strike metal keys on a xylophone with little mallets to make music!'
    },
    '6-8': {
      word: 'Xylophone',
      emoji: '🎵',
      sentence: 'She practiced playing a cheerful little tune on her colorful xylophone.',
      spellingWord: 'Xylophone',
      missingPattern: 'X _ _ o p h o n e',
      missingLetters: ['y', 'l']
    },
    '9-10': {
      word: 'Xenon',
      emoji: '🧪',
      sentence: 'Xenon gas glows with a bright blue light when electricity passes through it.',
      definition: 'A heavy, colorless, odorless noble gas used in high-intensity lamps and flash tubes.',
      unscrambleWord: 'N E O X N'
    }
  },
  Y: {
    letter: 'Y',
    lowercase: 'y',
    '3-5': {
      word: 'Yacht',
      emoji: '⛵',
      phonics: 'Y says /j/ as in Yacht',
      fact: 'Yachts are big, beautiful boats that sail across the ocean waves!'
    },
    '6-8': {
      word: 'Yacht',
      emoji: '⛵',
      sentence: 'The luxurious white sailing yacht sailed smoothly into the harbor.',
      spellingWord: 'Yacht',
      missingPattern: 'Y _ _ h t',
      missingLetters: ['a', 'c']
    },
    '9-10': {
      word: 'Yearning',
      emoji: '💭',
      sentence: 'The young adventurer felt a deep yearning to travel around the whole world.',
      definition: 'A strong feeling of intense longing or desire for something.',
      unscrambleWord: 'I N G N E A R Y'
    }
  },
  Z: {
    letter: 'Z',
    lowercase: 'z',
    '3-5': {
      word: 'Zebra',
      emoji: '🦓',
      phonics: 'Z says /z/ as in Zebra',
      fact: 'Zebras have black and white striped coats that look like warm pajamas!'
    },
    '6-8': {
      word: 'Zebra',
      emoji: '🦓',
      sentence: 'The wild zebra eats green grass and runs fast in the open fields.',
      spellingWord: 'Zebra',
      missingPattern: 'Z _ _ r a',
      missingLetters: ['e', 'b']
    },
    '9-10': {
      word: 'Zenith',
      emoji: '☀️',
      sentence: 'At exactly midday, the blazing hot sun reached its highest point in the sky, or zenith.',
      definition: 'The time or point at which something is at its most powerful, successful, or highest level.',
      unscrambleWord: 'H T I N E Z'
    }
  }
}
