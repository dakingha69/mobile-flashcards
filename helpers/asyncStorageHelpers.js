import { AsyncStorage } from 'react-native'

const DECK_SUPER_STORE = 'Decks:'

export function getDecks() {
  return AsyncStorage.getAllKeys()
    .then(keys => {
      const filteredKeys = keys.filter(key => key.startsWith(DECK_SUPER_STORE))
      return AsyncStorage.multiGet(filteredKeys)
    })
    .then(stores => stores.map(store => ({
      ...JSON.parse(store[1]),
      id: store[0]
    }))
  )
}

export function addDeck(deck) {
  deck.questions = []
  AsyncStorage.setItem(DECK_SUPER_STORE + deck.title, JSON.stringify(deck))
}

export function addQuestion(key, question) {
  return AsyncStorage.getItem(DECK_SUPER_STORE + key)
    .then(deck => {
      let parsedDeck = JSON.parse(deck)
      parsedDeck.questions.push(question)
      return AsyncStorage.mergeItem(DECK_SUPER_STORE + key, JSON.stringify(parsedDeck))
    })
}

export function getDeck(key) {
  return AsyncStorage.getItem(DECK_SUPER_STORE + key)
    .then(deck => ({
      ...JSON.parse(deck),
      id: key
    })
  )
}
