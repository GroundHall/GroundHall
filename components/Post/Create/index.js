import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';
import Ripple from 'react-native-material-ripple';

import style, { colors } from './style.css';
import image from '../../../containers/HomeScreen/assets/camila_cabelo_avatar.jpg';
import send from './assets/send.svg';

import Avatar from '../Avatar';
import Buble from '../Buble';

const propTypes = {
  me: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarURL: PropTypes.string,
  })
};

const defaultProps = {
  me: {
    firstName: '',
    lastName: '',
    avatarURL: ''
  }
};

const CreatePost = ({
  me: { firstName, lastName, avatarURL }
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
      <View style={style.bubbleWrap}>
        <Buble />
      </View>
    </View>
    <View style={style.sendButtonWrap}>
      <Ripple
        style={style.sendButton}
        rippleContainerBorderRadius={25}
        rippleColor="#FFF"
      >
        <SVG
          width="30"
          height="30"
          source={send}
          fill="white"
        />
      </Ripple>
    </View>
  </View>
);

CreatePost.defaultProps = defaultProps;
CreatePost.propTypes = propTypes;

export default CreatePost;
