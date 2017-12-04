import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'
import HomeHeader from './components/HomeHeader'
import BackHeader from './components/BackHeader'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import QuizView from './components/QuizView'
import { getDecks, getDeck } from './helpers/asyncStorageHelpers'
import { setLocalNotification } from './helpers/notificationHelpers'

export default class App extends Component {
  state = {
    view: 'DeckList',
    decks: [],
    selectedDeck: ''
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.setState({decks}))
      .then(() => setLocalNotification())
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
      case 'QuizView':
        return (
          <BackHeader title='Quiz' handleBack={this.handleBackToDetail} />
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
    getDecks().then(decks => this.setState({
      view: 'DeckList',
      selectedDeck: '',
      decks
    })
  )}

  handleAddQuestion = () => {
    this.setState({view: 'AddQuestion'})
  }

  handleQuiz = () => {
    this.setState({view: 'QuizView'})
  }

  handleBackToDetail = () => {
    const { title } = this.state.selectedDeck
    Promise.all([getDecks(), getDeck(title)])
      .then(values => {
        this.setState({
          view: 'DeckDetail',
          selectedDeck: values[1],
          decks: values[0]
        })
      })
  }

  render() {
    const { view } = this.state
    return (
      <ScrollView>
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
              handleQuiz={this.handleQuiz}
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
          ),
          'QuizView': (
            <QuizView
              deck={this.state.selectedDeck}
              handleBackToDetail={this.handleBackToDetail}
            />
          )
        }[view]}

      </ScrollView>
    )
  }
}
