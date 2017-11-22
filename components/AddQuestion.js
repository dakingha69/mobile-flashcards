import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { addQuestion } from '../helpers/asyncStorageHelpers'

export default class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      question: '',
      answer: ''
    }
  }

  createQuestion = () => {
    const { title, question, answer } = this.state
    addQuestion(title, { question, answer })
      .then(() => this.props.handleBackToDetail())
  }

  render() {
    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput onChangeText={question => this.setState({question})} />
        <FormLabel>Answer</FormLabel>
        <FormInput onChangeText={answer => this.setState({answer})} />
        <Button
          backgroundColor='#89C14B'
          title='CREATE CARD'
          onPress={this.createQuestion}
        />
      </View>
    )
  }
}
