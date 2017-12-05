import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { addDeck } from '../helpers/asyncStorageHelpers'

export default class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }

  createDeck = () => {
    addDeck(this.state)
    this.props.handleBackToDetail(this.state.title)
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.setState({title})} />
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={description => this.setState({description})} />
        <Button
          title='CREATE DECK'
          onPress={this.createDeck}
        />
      </View>
    )
  }
}
