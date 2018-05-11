import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Avatar from '../../../components/Post/Avatar';

import styles from './styles';

const defaultProps = {
  user: {
    firstName: 'Chun',
    lastName: 'Li',
    avatarURL: 'https://orig00.deviantart.net/3bf1/f/2015/016/1/a/chun_li_by_kasai-d8e7g3s.jpg',
    username: 'chunli'
  },
  outerStyle: {}
};

const Bubble = ({
  user: {
    firstName,
    lastName,
    avatarURL,
    username
  },
  outerStyle
}) => (
  <View style={[styles.bubbleWrap, outerStyle]}>
    <Avatar
      image={avatarURL}
      outerStyle={styles.avatar}
    />
    <View style={styles.nameUsernameWrap}>
      <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.username}>{`@${username}`}</Text>
    </View>
  </View>
);

Bubble.defaultProps = defaultProps;

export default Bubble;
