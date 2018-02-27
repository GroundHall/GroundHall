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

import resolvers from './resolvers';
import Login from '../Login';
// import HomeScreen from '../HomeScreen';
import FeedScreen from '../Feed';


class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initialRouteName: null,
      isRouteFetched: false
    };
  }

  componentWillMount() {
    this.getInitialRoute();
  }

  componentDidMount() {
    this.getInitialRoute();
  }

  get client() {
    const cache = new InMemoryCache();
    const stateLink = withClientState({ resolvers });
    const httpLink = new HttpLink({ uri: 'https://1fff3959.ngrok.io/graphql' });
    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
      uri: 'ws://1fff3959.ngrok.io/subscriptions',
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

    const link = stateLink.concat(authLink).concat(wsHttpLink);

    return new ApolloClient({
      link,
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
