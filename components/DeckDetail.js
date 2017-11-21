import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { denormalize } from '../helpers/asyncStorageHelpers'

export default class DeckDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: props.deck
    }
  }

  render() {
    const { deck } = this.state
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 50}}>
          {deck.title}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50, color: 'grey'}}>
          Questions: {denormalize(deck.questions).length}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50, marginBottom: 50}}>
          {deck.description ? deck.description : 'No description provided'}
        </Text>
        <Button
          backgroundColor='#2894F3'
          raised
          icon={{name: 'add'}}
          title='ADD QUESTION' />
        <Button
          backgroundColor='#89C14B'
          buttonStyle={{marginTop: 10}}
          raised
          icon={{name: 'launch'}}
          title='START QUIZ' />
      </View>
    )
  }
}
