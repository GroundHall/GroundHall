import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import SVG from 'react-native-svg-uri';

import Page, { Title } from '../../components/Page';
import Avatar from '../../components/Post/Avatar';
import Search from '../../components/Search';
import Empty from './Empty';
import Row from './Row';
import styles from './styles';
import colors from '../../colors';

import CommentSVG from './assets/comments.svg';

class Chat extends Component {
  static navigationOptions() {
    return {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => (
        <SVG
          width="26"
          height="26"
          fill={tintColor}
          source={CommentSVG}
        />
      ),
    };
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <Page>
        <StatusBar backgroundColor={colors.secondary.medium} barStyle="dark-content" />
        <Title text="Chat with someone..." />
        <View style={styles.searchWrap}>
          <Search />
        </View>
        <Row outerWrap={{ marginTop: 16 }} onPress={() => navigate('Chat')} />
      </Page>
    );
  }
}

export default Chat;

