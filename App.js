import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from 'react-native-elements'
import HomeHeader from './components/HomeHeader'
import BackHeader from './components/BackHeader'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import { getDecks, getDeck } from './helpers/asyncStorageHelpers'

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
      case 'AddDeck':
        return (
          <BackHeader title='Add Deck' handleBack={this.handleBack} />
        )
      case 'AddQuestion':
        return (
          <BackHeader title='Add Question' handleBack={this.handleBackToDetail} />
        )
      default:
        return (
          <HomeHeader handleAddDeck={this.handleAddDeck} />
        )
    }
  }

  handleAddDeck = () => {
    this.setState({view: 'AddDeck'})
  }

  handleDeckSelect = selectedDeck => {
    this.setState({view: 'DeckDetail', selectedDeck})
  }

  handleBack = () => {
    this.setState({
      view: 'DeckList',
      selectedDeck: '',
      decks: getDecks()
    })
  }

  handleAddQuestion = () => {
    this.setState({view: 'AddQuestion'})
  }

  handleBackToDetail = () => {
    const { title } = this.state.selectedDeck
    this.setState({
      view: 'DeckDetail',
      selectedDeck: getDeck(title),
      decks: getDecks()
    })
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
              handleAddQuestion={this.handleAddQuestion}
              handleBack={this.handleBack}
            />
          ),
          'AddDeck': (
            <AddDeck
              handleBack={this.handleBack}
            />
          ),
          'AddQuestion': (
            <AddQuestion
              title={this.state.selectedDeck.title}
              handleBackToDetail={this.handleBackToDetail}
            />
          )
        }[view]}

      </View>
    )
  }
}
