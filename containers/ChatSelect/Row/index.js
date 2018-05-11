import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';

import Avatar from '../../../components/Post/Avatar';

import colors from '../../../colors';
import styles from './styles';

const defaultProps = {
  user: {
    firstName: 'Kristiyan',
    lastName: 'Serafimov',
    avatarURL: 'https://orig00.deviantart.net/3bf1/f/2015/016/1/a/chun_li_by_kasai-d8e7g3s.jpg'
  },
  message: 'Hello bitch, how are you today?',
  time: '12:29',
  outerWrap: {},
  onPress: () => {}
};

const Row = ({
  user: {
    firstName,
    lastName,
    avatarURL
  },
  message,
  time,
  outerWrap,
  onPress
}) => (
  <View style={[styles.rowWrap, outerWrap]}>
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#FF467E', true)}
    >
      <View style={styles.rowInnerWrap}>
        <Avatar
          image={avatarURL}
          outerStyle={styles.avatar}
        />
        <View style={styles.nameLastTextWrap}>
          <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.lastText}>{message}</Text>
        </View>
        <View style={styles.timeWrap}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  </View>
);

Row.defaultProps = defaultProps;

export default Row;
