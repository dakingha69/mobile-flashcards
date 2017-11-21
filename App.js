import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from 'react-native-elements'
import HomeHeader from './components/HomeHeader'
import BackHeader from './components/BackHeader'
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
          <HomeHeader handleAddDeck={this.handleAddDeck} />
        )
      case 'DeckDetail':
        return (
          <BackHeader title={selectedDeck.title} handleBack={this.handleBack} />
        )
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
