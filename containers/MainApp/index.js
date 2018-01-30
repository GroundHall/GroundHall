import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import { StackNavigator } from 'react-navigation';

import { resolvers } from './resolvers';

import LoginScreen from '../LoginScreen';
import HomeScreen from '../HomeScreen';

const Stack = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen}
}, {
  headerMode: 'none'
});


class App extends Component {
  constructor(...args) {
    super(...args);
    const cache = new InMemoryCache();
    const stateLink = withClientState({ resolvers });
    this.client = new ApolloClient({
      link: ApolloLink.from([stateLink, new HttpLink({ uri: 'http://192.168.88.40:3000/graphql' })]),
      cache,
    });    
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Stack />
      </ApolloProvider>
    );
  }
}

export default App;