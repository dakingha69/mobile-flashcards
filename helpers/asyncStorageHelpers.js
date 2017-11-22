import { AsyncStorage } from 'react-native'

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

export function getDecks() {
  return AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiGet(keys))
    .then(stores => stores.map(store => ({
      ...JSON.parse(store[1]),
      id: store[0]
    }))
  )
}

export function addDeck(deck) {
  deck.questions = []
  AsyncStorage.setItem(deck.title, JSON.stringify(deck))
}

export function addQuestion(key, question) {
  return AsyncStorage.getItem(key)
    .then(deck => {
      let parsedDeck = JSON.parse(deck)
      parsedDeck.questions.push(question)
      return AsyncStorage.mergeItem(key, JSON.stringify(parsedDeck))
    })
}

export function getDeck(key) {
  return AsyncStorage.getItem(key)
    .then(deck => ({
      ...JSON.parse(deck),
      id: key
    })
  )
}
