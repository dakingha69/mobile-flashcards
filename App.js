import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from 'react-native-elements'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
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

  getHeader = () => {
    const { view, selectedDeck } = this.state
    switch (view) {
      case 'DeckList':
        return (
          <Header
            centerComponent={{ text: 'My Decks', style: { color: '#fff' } }}
            rightComponent={{ icon: 'add', color: '#fff' }}
          />
        )
      case 'DeckDetail':
        return (
          <Header
            leftComponent={{
              icon: 'arrow-back',
              color: '#fff',
              onPress: () => this.handleBack()
            }}
            centerComponent={{ text: `${selectedDeck.title}`, style: { color: '#fff' } }}
          />
        )
      default:

    }
  }

  handleDeckSelect = selectedDeck => {
    this.setState({view: 'DeckDetail', selectedDeck})
  }

  handleBack = () => {
    this.setState({view: 'DeckList', selectedDeck: ''})
  }

  render() {
    const { view } = this.state
    return (
      <View>
        {this.getHeader()}
        {{
          'DeckList': (
            <DeckList
              decks={this.state.decks}
              handleDeckSelect={this.handleDeckSelect}
            />
          ),
          'DeckDetail': (
            <DeckDetail
              deck={this.state.selectedDeck}
              handleBack={this.handleBack}
            />
          )
        }[view]}

      </View>
    )
  }
}
