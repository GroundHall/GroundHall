import React from 'react';
import {
  View,
  Image
} from 'react-native';

import colors from '../../../colors';
import style from './style.css';

const Avatar = ({
  image,
  availability,
  outerStyle
}) => (
  image
    ?
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <Image
          style={[style.avatar, outerStyle] }
          source={{ uri: image }}
        />
        {availability && <View style={{width: 14, height: 14, borderRadius: 8, elevation: 3, borderColor: 'white',borderWidth: 2, backgroundColor: '#79F2C0', position: 'absolute', bottom: 12, right: 6}}/>}
      </View>
    : <View style={{
    width: 40,
    height: 40,
    borderRadius: 24,
    marginRight: 6,
    backgroundColor: colors.primary.dark
  }}
    />
);

export default Avatar;
