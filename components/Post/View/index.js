import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';

import FireSVG from './assets/fire.svg';
import Avatar from '../Avatar';
import style from './style.css';

const propTypes = {
  text: PropTypes.string,
  isLiked: PropTypes.string,
  lastName: PropTypes.string,
  likeCount: PropTypes.number,
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  onLikeUnlikePress: PropTypes.func
};

const ViewPost = ({
  text,
  isLiked,
  lastName,
  likeCount,
  avatarURL,
  firstName,
  onLikeUnlikePress
}) => {
  const likeFillColor = isLiked ? 'rgba(233, 30, 99, 1)' : 'rgba(233, 30, 99, .5)';
  return (
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
          <TouchableOpacity onPress={onLikeUnlikePress}>
            <View style={[style.row, { alignSelf: 'flex-start' }]}>
              <View style={{ paddingTop: 2 }}>
                <SVG
                  width="18"
                  height="18"
                  source={FireSVG}
                  fill={likeFillColor}
                />
              </View>
              <View style={style.likeTextWrap}>
                <Text style={[style.likeText, { color: likeFillColor }]}>
                  { isLiked ? 'Liked' : 'Like' }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewPost;
