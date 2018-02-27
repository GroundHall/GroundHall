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
import LottieView from 'lottie-react-native';

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

class CreatePost extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  renderName() {
    const { me: { firstName, lastName } } = this.props;
    if (firstName) {
      return <Text style={style.nameText}>{`${firstName} ${lastName}`}</Text>;
    }
    return (
      <LottieView
        ref={(animation) => { this.animation = animation; }}
        loop
        style={{
          width: 180,
          height: 21,
          marginLeft: -2
      }}
        source={require('./assets/data.json')}
      />
    );
  }

  render() {
    const { me: { firstName, lastName, avatarURL }, onCreate } = this.props;
    return (
      <View>
        <View style={style.tagWrap}>
          <Text style={style.tagText}>Boyana</Text>
        </View>
        <View style={style.postWrap}>
          <View style={style.headingWrap}>
            <Avatar image={avatarURL} />
            <View style={style.nameDataWrap}>
              {this.renderName()}
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
            onPress={onCreate}
          >
            <SVG
              width="28"
              height="28"
              source={send}
              fill="white"
            />
          </Ripple>
        </View>
      </View>
    );
  }
}

CreatePost.defaultProps = defaultProps;
CreatePost.propTypes = propTypes;

export default CreatePost;
