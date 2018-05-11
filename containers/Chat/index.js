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
import Back from '../../components/Page/Back';

import UserBubble from './UserBubble';

import styles from './styles';
import colors from '../../colors';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { shit: 'shit' };
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <Page>
        <View style={{
          marginTop: 24,
          marginLeft: 32,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        >
          <Back onPress={() => this.props.navigation.goBack()} />
          <UserBubble outerStyle={styles.userBubbleWrap} />
        </View>
        <View style={{
 display: 'flex', flexDirection: 'column', flex: 1,
}}
        />
        <View style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 24, elevation: 5  }}>
          <View style={{ backgroundColor: '#FAFBFC', height: 40, borderColor: '#D8DBDF', elevation: 3, borderWidth: 2, borderRadius: 20 }} />
        </View>
      </Page>
    );
  }
}

export default Chat;

