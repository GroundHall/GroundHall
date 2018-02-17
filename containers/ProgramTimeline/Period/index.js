import React from 'react';
import {
  View,
  Text
} from 'react-native';

import style from './style.css';

const Period = ({ lesson }) => (
  <View
    style={style.periodWrap}
  >
    <Text style={style.periodText}>
      {lesson.time_start}
    </Text>
  </View>
);

export default Period;
