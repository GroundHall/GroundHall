import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import SVG from 'react-native-svg-uri';

import style from './style.css';
import colors from '../../../colors';
import Avatar from '../Avatar';


const ViewPost = ({
  post: { user: { firstName, lastName, avatarURL }, likeCount, text }
}) => (
  <View>
    <View style={style.postWrap}>
      <View style={style.headingWrap}>
        <Avatar image={avatarURL} />
        <View style={style.nameDataWrap}>
          <Text style={style.nameText}>{`${firstName} ${lastName}`}</Text>
          <Text style={style.dateText}>now</Text>
        </View>
      </View>
      <View style={style.textWrap}>
        <Text style={style.text}>{text}</Text>
      </View>
      <View style={style.likeBubbleWrap}>
        <Text style={style.likeBubbleText}>{likeCount}</Text>
      </View>
      <View style={style.bottomPostWrap}>
        <View style={style.row}>
          <View style={{
            paddingTop: 2
          }}>
            <SVG
              width="18"
              height="18"
              source={require('./assets/fire.svg')}
              fill="rgba(233, 30, 99, .6)"
            />
          </View>
          <View style={style.likeTextWrap}>
            <Text style={style.likeText}>Like</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default ViewPost;
