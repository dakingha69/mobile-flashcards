import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'

export default class DeckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: props.decks
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.decks !== nextProps.decks) {
      this.setState({decks: nextProps.decks})
    }
  }

  render() {
    const { decks } = this.state
    return (
      <View>
        {
          decks.map(deck => (
            <Card key={deck.id} title={deck.title}>
              <Text style={{ marginBottom:10 }}>
                {
                  deck.description
                    ? deck.description
                    : 'No description provided'
                }
              </Text>
              <Button
                icon={{name: 'search'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: -15, marginRight: -15, marginBottom: 0}}
                title='VIEW DECK'
                onPress={() => this.props.handleDeckSelect(deck)}
              />
            </Card>
          ))
        }
      </View>
    )
  }
}
