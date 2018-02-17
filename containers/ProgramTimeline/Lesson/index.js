import React from 'react';
import {
  View,
  Text
} from 'react-native';

import style from './style.css';

const Lesson = ({ lesson }) => (
  <View
    style={style.lessonWrap}
  >
    <Text style={style.lessonText}>
      {lesson.subject.name}
    </Text>
  </View>
);

export default Lesson;
