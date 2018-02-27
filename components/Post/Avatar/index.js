import React from 'react';
import {
  View,
  Image
} from 'react-native';

import colors from '../../../colors';
import style from './style.css';

const Avatar = ({
  image,
  outerStyle
}) => (
  image
    ? <Image
      style={[style.avatar, outerStyle]}
      source={{ uri: image }}
    />
    : <View style={{
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 6,
    backgroundColor: colors.primary.dark
  }}
    />
);

export default Avatar;
