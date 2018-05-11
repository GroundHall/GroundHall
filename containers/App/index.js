import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink, split } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import BottomNavigation from './BottomNavigation';

import resolvers from './resolvers';
import Login from '../Login';
// import HomeScreen from '../HomeScreen';
import FeedScreen from '../Feed';
import ProgramScreen from '../Program';
import Chat from '../Chat';
import ChatSelectScreen from '../ChatSelect';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initialRouteName: null,
      isRouteFetched: false
    };
    // AsyncStorage.removeItem('authToken');
  }

  componentWillMount() {
    this.getInitialRoute();
  }

  get client() {
    const cache = new InMemoryCache();
    const stateLink = withClientState({ resolvers });
    const httpLink = new HttpLink({ uri: 'http://172.16.24.109/graphql' });
    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
      uri: 'ws://172.16.24.109/subscriptions',
      options: {
        reconnect: true
      }
    });

    const wsHttpLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );

    const authLink = setContext((_, { headers }) =>
      // get the authentication token from local storage if it exists
      AsyncStorage.getItem('authToken').then(token => ({
        headers: {
          ...headers,
          authorization: token || '',
        }
      }))
    );

    return new ApolloClient({
      link: ApolloLink.from([stateLink, authLink, wsHttpLink]),
      cache,
    });
  }

  getInitialRoute() {
    AsyncStorage.getItem('authToken').then((authToken) => {
      const initialRouteName = authToken ? 'Home' : 'Login';
      this.setState({ initialRouteName, isRouteFetched: true });
    });
  }

  getNavigator() {
    const Navigator = StackNavigator({
      Login: { screen: Login },
      Home: {
        screen: TabNavigator({
          ChatSelect: {
            screen: ChatSelectScreen
          },
          Feed: {
            screen: FeedScreen,
          },
          TimeLine: {
            screen: ProgramScreen
          }
        }, {
          tabBarComponent: BottomNavigation,
          tabBarPosition: 'bottom',
          animationEnabled: true,
          initialRouteName: 'ChatSelect',
          tabBarOptions: {
            showLabel: false,
            activeTintColor: '#FF467E',
            style: {
              backgroundColor: 'white',
            },
          },
        })
      },
      Chat: { screen: Chat }
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
