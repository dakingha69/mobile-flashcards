import React, { Component } from 'react'
import { Header } from 'react-native-elements'

export default class BackHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => this.props.handleBack()
        }}
        centerComponent={{
          text: `${this.props.title}`,
          style: {color: '#fff'}
        }}
      />
    )
  }
}
