import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import resolvers from './resolvers';
import Login from '../Login';
// import HomeScreen from '../HomeScreen';
import FeedScreen from '../Feed';


class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initialRouteName: null,
      isRouteFetched: false,
      authToken: '',
    };
  }

  componentWillMount() {
    this.getInitialRoute();
  }

  get client() {
    const cache = new InMemoryCache();
    const stateLink = withClientState({ resolvers });
    const httpLink = new HttpLink({ uri: 'https://5fa2ebee.ngrok.io/graphql' });
    const middlewareAuthLink = new ApolloLink((operation, forward) => {
      const token = this.state.authToken;
      if (token) {
        operation.setContext({
          headers: {
            authorization: token
          }
        });
      }
      return forward(operation);
    });
    return new ApolloClient({
      link: ApolloLink.from([middlewareAuthLink, stateLink, httpLink]),
      cache,
    });
  }

  getInitialRoute() {
    AsyncStorage.getItem('authToken').then((authToken) => {
      const initialRouteName = authToken ? 'Home' : 'Login';
      this.setState({ initialRouteName, isRouteFetched: true, authToken });
    });
  }

  getNavigator() {
    const Navigator = StackNavigator({
      Login: { screen: Login },
      Home: {
        screen: TabNavigator({
          Feed: {
            screen: FeedScreen,
          },
        }, {
          tabBarComponent: TabBarBottom,
          tabBarPosition: 'bottom',
          animationEnabled: true,
          tabBarOptions: {
            showLabel: false,
            activeTintColor: '#152346',
            style: {
              backgroundColor: 'white',
            },
          },
        })
      },
    }, { headerMode: 'none', initialRouteName: this.state.initialRouteName });
    return <Navigator />;
  }

  render() {
    if (!this.state.isRouteFetched) {
      return <View />;
    }
    return (
      <ApolloProvider client={this.client}>
        {this.state.initialRouteName && this.getNavigator()}
      </ApolloProvider>
    );
  }
}

export default App;
