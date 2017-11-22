import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default class DeckDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: props.deck
    }
  }

  render() {
    const { deck } = this.state
    console.log(deck)
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 50}}>
          {deck.title}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50, color: 'grey'}}>
          Questions: {deck.questions.length}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50, marginBottom: 50}}>
          {deck.description ? deck.description : 'No description provided'}
        </Text>
        <Button
          backgroundColor='#2894F3'
          raised
          icon={{name: 'add'}}
          title='ADD QUESTION'
          onPress={() => this.props.handleAddQuestion()}
        />
        <Button
          backgroundColor='#89C14B'
          buttonStyle={{marginTop: 10}}
          raised
          icon={{name: 'launch'}}
          title='START QUIZ'
          onPress={() => this.props.handleQuiz()}
        />
      </View>
    )
  }
}
