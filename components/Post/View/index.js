import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import style, { colors } from './style.css';

import Avatar from '../Avatar';


const ViewPost = ({
  post: { user: { firstName, lastName, avatarURL} }
}) => (
  <View>
    <View style={style.tagWrap}>
      <Text style={style.tagText}>Boyana</Text>
    </View>
    <View style={style.postWrap}>
      <View style={style.headingWrap}>
        <Avatar image={avatarURL} />
        <View style={style.nameDataWrap}>
          <Text style={style.nameText}>{`${firstName} ${lastName}`}</Text>
          <Text style={style.dateText}>now</Text>
        </View>
      </View>
    </View>
  </View>
);

export default ViewPost;
