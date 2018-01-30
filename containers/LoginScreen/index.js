import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';


import Button from 'react-native-nativebutton';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import FlexView from '../../components/FlexView';
import colors from '../../colors';
import styles from './styles.css';

const CIRCLE_BUTTON_WIDTH_HEIGHT = 50;
const CIRCLE_BUTTON_RADIUS = CIRCLE_BUTTON_WIDTH_HEIGHT / 2;
const KEYBOARD_VERTICAL_OFFSET_VALUE = -170;
const CIRCLE_BUTTON_ICON_SIZE = 26;
const LABEL_HEIGHT = 20;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleSummit = this.handleSummit.bind(this);
  }

  handleInputChange(input) {
    return (data) => {
      this.props.changeLoginScreenField({
        variables: {
          fieldName: input,
          value: data
        }
      });
    };
  }

  handleSummit() {
    const { email, password } = this.props.loginScreen;
    this.props.authenticate({
      variables: {
        email, password
      }
    }).then((result) => {

    }).catch((error) => {
      const errorMessage = error.graphQLErrors[0].message;
      this.props.changeLoginScreenField({
        variables: {
          fieldName: 'error',
          value: errorMessage
        }
      });
    });
  }

  render() {
    const { email, password, error } = this.props.loginScreen;
    const { loading } = this.props;

    return (
      <FlexView>
        <StatusBar backgroundColor={colors.primary.dark} barStyle="dark-content" />
        <ImageBackground
          source={require('./assets/LoginBackground.png')}
          style={styles.flexed}
        >
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET_VALUE}
            style={styles.flexed}
          >
            <View style={styles.titleWrap}>
              <Text style={styles.title}>
                                    Login
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <TextField
                label="Email"
                title="Please enter email here..."
                value={email}
                onChangeText={this.handleInputChange('email')}
                textColor={colors.secondary.medium}
                tintColor={colors.secondary.light}
                labelHeight={LABEL_HEIGHT}
                error={error}
              />
              <TextField
                label="Password"
                title="Please enter password here..."
                value={password}
                onChangeText={this.handleInputChange('password')}
                textColor={colors.secondary.medium}
                tintColor={colors.secondary.light}
                labelHeight={LABEL_HEIGHT}
                error={error}
              />
            </View>
            <View style={styles.buttonWrap}>
              <Ripple
                style={styles.button}
                rippleContainerBorderRadius={CIRCLE_BUTTON_RADIUS}
                rippleColor="#FFF"
                onPressIn={this.handleSummit}
              >
                {loading ?
                  <ActivityIndicator size="large" color="#FFF" /> :
                  <Icon
                    name="md-arrow-round-forward"
                    size={CIRCLE_BUTTON_ICON_SIZE}
                    color={colors.primary.light}
                  />
                }
              </Ripple>
            </View>
            <View style={styles.orRegisterWrap}>
              <Text style={styles.orWrap}>or</Text>
              <Text style={styles.registerText}>Register</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </FlexView>
    );
  }
}

const authenticate = gql`
    mutation authenticate($email: String!, $password: String!) {
        authenticate(email: $email, password: $password)
    }
`;

const changeLoginScreenField = gql`
    mutation changeLoginScreenField($fieldName: String!, $value: String! ) {
        changeLoginScreenField(fieldName: $fieldName, value: $value) @client
    }`;

const query = gql`
    query {
        loginScreen @client {
            email
            password
            error
        }
    }
`;

LoginScreen.defaultProps = {
  loginScreen: {
    email: '',
    password: '',
    error: ''
  }
};

export default compose(
  graphql(query, {
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data
    })
  }),
  graphql(authenticate, { name: 'authenticate' }),
  graphql(changeLoginScreenField, { name: 'changeLoginScreenField' })
)(LoginScreen);

