import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';
import style from './style.css';
import colors from '../../../colors';
import bublePoint from './assets/bublePoint.svg';

const propTypes = {
  onChangeText: PropTypes.func,
  text: PropTypes.string
};

const defaultProps = {
  onChangeText: () => {},
  text: ''
};

const Buble = ({
  onChange,
  text
}) => (
  <View style={{
    minHeight: 50
  }}>
    <SVG
      width="50"
      height="15"
      source={bublePoint}
      fill={colors.primary.dark}
    />
    <View style={style.bubble}>
      <TextInput
        style={style.text}
        onChangeText={onChange}
        multiline
        value={text}
        underlineColorAndroid="rgba(0,0,0,0)"
        selectionColor={colors.secondary.medium}
        placeholder="What do you have to say?"
      />
    </View>
  </View>
);

Buble.propTypes = propTypes;
Buble.defaultProps = defaultProps;

export default Buble;
