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
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50}}>
          {deck.description}
        </Text>
        <Button
          buttonStyle={{marginTop: 50}}
          raised
          icon={{name: 'add'}}
          title='ADD QUESTION' />
        <Button
          buttonStyle={{marginTop: 10}}
          raised
          icon={{name: 'launch'}}
          title='START QUIZ' />
      </View>
    )
  }
}
