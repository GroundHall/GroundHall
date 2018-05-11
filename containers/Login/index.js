import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

// import jwt from 'jsonwebtoken';

import BackgroundImage from './assets/LoginBackground.png';
import colors from '../../colors';
import styles from './styles.css';
import NextCircle from '../../components/Button/NextCircle';

const KEYBOARD_VERTICAL_OFFSET_VALUE = -170;
const LABEL_HEIGHT = 20;

const propTypes = {
  changeLoginField: PropTypes.func.isRequired,
  setAuthentication: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool
  }),
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

const defaultProps = {
  login: {
    email: '',
    password: '',
    error: ''
  }
};

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Home'
    })
  ]
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleSummit = this.handleSummit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  setAuthToken(value) {
    try {
      AsyncStorage.setItem('authToken', value);
    } catch (error) {
      this.props.changeLoginField({
        variables: {
          field: 'error',
          value: 'There is an authentication token problem, please try again later!'
        }
      });
    }
  }

  handleInputChange(input) {
    return (data) => {
      this.props.changeLoginField({
        variables: {
          field: input,
          value: data
        }
      });
    };
  }

  handleSummit() {
    const { email, password } = this.props.login;
    this.props.toggleLoading();
    if (email && password) {
      debugger;
      this.props.authenticate({ variables: { email, password } })
        .then((result) => {
          debugger;
          this.props.toggleLoading();
          this.setAuthToken(result.data.authenticate);
          this.props.navigation.dispatch(resetAction);
        }).catch((error) => {
          debugger;
          const errorMessage = error.graphQLErrors[0].message;
          this.props.changeLoginField({
            variables: {
              field: 'error',
              value: errorMessage
            }
          });
          this.props.toggleLoading();
        });
    } else {
      this.props.changeLoginField({
        variables: {
          field: 'error',
          value: 'Please enter valid data, no whitespaces!'
        }
      });
      this.props.toggleLoading();
    }
  }

  render() {
    const {
      email, password, error, loading
    } = this.props.login;
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.flexed}>
          <StatusBar backgroundColor={colors.secondary.dark} />
          <ImageBackground
            source={BackgroundImage}
            style={styles.flexed}
          >
            <KeyboardAvoidingView
              behavior="position"
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
                  textColor={colors.secondary.dark}
                  tintColor={colors.secondary.medium}
                  labelHeight={LABEL_HEIGHT}
                  error={error}
                  autoCapitalize="none"
                  animationDuration={150}
                  onFocus={this.onFocus}
                />
                <TextField
                  label="Password"
                  title="Please enter password here..."
                  value={password}
                  onChangeText={this.handleInputChange('password')}
                  textColor={colors.secondary.dark}
                  tintColor={colors.secondary.medium}
                  labelHeight={LABEL_HEIGHT}
                  error={error}
                  animationDuration={150}
                  secureTextEntry
                  clearTextOnFocus
                  onFocus={this.onFocus}
                />
              </View>
              <View style={styles.buttonWrap}>
                <NextCircle onPressIn={this.handleSummit} loading={loading} />
              </View>
              {/* <View style={styles.orRegisterWrap}>
                <Text style={styles.orWrap}>or</Text>
                <Text style={styles.registerText}>Register</Text>
              </View> */}
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const authenticate = gql`
  mutation authenticate($email: String!, $password: String!) {
      authenticate(email: $email, password: $password)
  }
`;

const changeLoginField = gql`
  mutation changeLoginField($field: String!, $value: String! ) {
    changeLoginField(field: $field, value: $value) @client
  }
`;

const setAuthentication = gql`
  mutation setAuthentication($email: String!, $firstName: String!, $lastName: String!, $type: String!) {
    setAuthentication(email: $email, firstName: $firstName, lastName: $lastName, type: $type) @client
  }
`;

const toggleLoading = gql`
  mutation toggleLoading {
    toggleLoading @client
  }
`;

const query = gql`
  query {
    login @client {
      email
      password
      error
      loading
    }
  }
`;

LoginScreen.propTypes = propTypes;
LoginScreen.defaultProps = defaultProps;

export default compose(
  graphql(query, {
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data
    })
  }),
  graphql(authenticate, { name: 'authenticate' }),
  graphql(toggleLoading, { name: 'toggleLoading' }),
  graphql(changeLoginField, { name: 'changeLoginField' }),
  graphql(setAuthentication, { name: 'setAuthentication' })
)(LoginScreen);

