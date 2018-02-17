import React from 'react';
import {
  Image
} from 'react-native';

import style from './style.css';

const Avatar = ({
  image,
  outerStyle
}) => (
  <Image
    style={[style.avatar, outerStyle]}
    source={{ uri: image }}
  />
);

export default Avatar;
