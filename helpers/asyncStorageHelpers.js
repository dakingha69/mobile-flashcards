const decks = {
  React: {
    title: 'React',
    description: 'Flashcards for learning React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    description: 'Flashcards for learning JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function denormalize(normalized) {
  const keys = Object.keys(normalized)
  return keys.map(key => (
    {
      ...normalized[key],
      id: key
    }
  ))
}

export function getDecks() {
  return denormalize(decks)
}
