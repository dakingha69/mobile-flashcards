import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { addQuestion } from '../helpers/asyncStorageHelpers'

export default class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: this.props.deck,
      counter: 0,
      correct: 0,
      showAnswer: false
    }
  }

  showAnswer = () => {
    this.setState({showAnswer: true})
  }

  showQuestion = () => {
    this.setState({showAnswer: false})
  }

  correct = () => {
    const { counter, correct } = this.state
    this.setState({
      counter: counter + 1,
      correct: correct + 1,
      showAnswer: false
    })
  }

  incorrect = () => {
    const { counter } = this.state
    this.setState({
      counter: counter + 1,
      showAnswer: false
    })
  }

  tryAgain = () => {
    this.setState({
      counter: 0,
      correct: 0,
      showAnswer: false
    })
  }

  render() {
    const { counter, showAnswer, correct } = this.state
    const { questions } = this.state.deck
    console.log(this.state)
    return (
      <View>
        {
          counter + 1 <= questions.length
            ? (
              <View>
                <Text style={{paddingLeft: 15, paddingTop: 15}}>
                  {counter + 1}/{questions.length}
                </Text>
                <Text style={{textAlign: 'center', fontSize: 25, marginTop: 100, marginBottom: 100}}>
                {
                  !showAnswer ? questions[counter].question : questions[counter].answer
                }
                </Text>
                {
                  !showAnswer
                    ? (
                      <Button
                        backgroundColor='#2894F3'
                        title='SHOW ANSWER'
                        onPress={this.showAnswer}
                      />
                    )
                    : (
                      <Button
                        backgroundColor='#2894F3'
                        title='SHOW QUESTION'
                        onPress={this.showQuestion}
                      />
                    )
                }
                <Button
                  backgroundColor='#89C14B'
                  buttonStyle={{marginTop: 50}}
                  title='CORRECT'
                  onPress={this.correct}
                />
                <Button
                  backgroundColor='#e52929'
                  buttonStyle={{marginTop: 10}}
                  title='INCORRECT'
                  onPress={this.incorrect}
                />
              </View>
            )
            : (
              <View>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 50,
                  marginTop: 100
                }}>
                  {Math.round(correct / questions.length * 100)} %
                </Text>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 25,
                  marginBottom: 100
                }}>
                  Correct Answers
                </Text>
                <Button
                  backgroundColor='#2894F3'
                  title='TRY AGAIN'
                  onPress={this.tryAgain}
                />
                <Button
                  backgroundColor='#2894F3'
                  title='BACK TO DECK'
                  buttonStyle={{marginTop: 10}}
                  onPress={() => this.props.handleBackToDetail()}
                />
              </View>
            )
        }
      </View>
    )
  }
}
