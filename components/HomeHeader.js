import React, { Component } from 'react'
import { Header } from 'react-native-elements'

export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Header
        centerComponent={{
          text: 'My Decks',
          style: {color: '#fff'}
        }}
        rightComponent={{
          icon: 'add',
          color: '#fff',
          onPress: () => this.props.handleAddDeck()
        }}
      />
    )
  }
}
