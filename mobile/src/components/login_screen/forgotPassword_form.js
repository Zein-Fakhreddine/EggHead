/**
 * this is the forgot password form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import { getColor } from '../config'
import * as Animatable from 'react-native-animatable'
import { firebaseApp } from '../../firebase'

export default class ForgotPassForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      email: ''
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'
    const errorMessage = this.state.errMsg ?
      <Text style={styles.errMsg}>{this.state.errMsg}</Text>
    : null

    return (
      <KeyboardAvoidingView behavior="padding">
        <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}>
          <Text style={styles.title}>Forgot Password</Text>
          {errorMessage}

            <View style={[styles.inputContainer, { marginBottom: 20 }]}>

              <TextInput
                style={styles.inputField}
                underlineColorAndroid='transparent'
                placeholder='Enter Your Email'
                placeholderTextColor='rgba(255,255,255,.6)'
                onChangeText={(text) => this.setState({ email: text })}
                />


            </View>

          <View style={styles.btnContainers}>
            <TouchableOpacity onPress={this._handleGoBack.bind(this)}>
              <View style={styles.submitBtnContainer}>
                <Text style={styles.submitBtn}>{'Back'.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleForgotPass.bind(this)}>
              <View style={styles.submitBtnContainer}>
                <Text style={styles.submitBtn}>{'Recover'.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    )
  }

  _handleForgotPass() {
    this.setState({errMsg: 'Please Wait...'})

    firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(()=> {
      this.setState({errMsg: 'An email has been sent!'})
    }).catch((error) => {
      this.setState({errMsg: error.message})
    })
  }

  _handleGoBack() {
    this.setState({ init: false })
  }

  _handleBackBtnPress() {
    this._handleGoBack()
    return true
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromForgotPass()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Courier',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)'
  },
  errMsg: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Helvetica',
    marginBottom: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Helvetica',
    color: '#ffffff'
  },
  btnContainers: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280
  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: getColor()
  }
})
