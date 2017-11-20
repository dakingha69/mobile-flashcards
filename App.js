import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from 'react-native-elements'
import DeckList from './components/DeckList'
import { getDecks } from './helpers/asyncStorageHelpers'

export default class App extends Component {
  state = {
    view: 'DeckList',
    decks: [],
    selectedDeck: ''
  }

  componentDidMount() {
    this.setState({
      decks: getDecks()
    })
  }

  handleDeckSelect = selectedDeck => {
    this.setState({view: 'DeckDetail', selectedDeck})
  }

  render() {
    console.log(this.state)
    const { view } = this.state
    return (
      <View>
        <Header
          centerComponent={{ text: 'My Decks', style: { color: '#fff' } }}
          rightComponent={{ icon: 'add', color: '#fff' }}
        />
        {{
          'DeckList': (
            <DeckList
              decks={this.state.decks}
              handleDeckSelect={this.handleDeckSelect}
            />
          ),
        }[view]}

      </View>
    )
  }
}
