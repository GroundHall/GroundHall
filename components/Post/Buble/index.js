import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import SVG from 'react-native-svg-uri';
import style from './style.css';
import colors from '../../../colors';
import bublePoint from './assets/bublePoint.svg';

const defaultProps = {
  text: ''
};

const Buble = ({
  text
}) => (
  <View>
    <SVG
      width="50"
      height="15"
      source={require('./assets/bublePoint.svg')}
      fill={colors.primary.dark}
    />
    <View style={style.bubble}>
      <TextInput
        style={style.text}
        multiline
        underlineColorAndroid="rgba(0,0,0,0)"
        selectionColor={colors.secondary.medium}
        placeholder="What do you have to say?"
      />
    </View>
  </View>
);

Buble.defaultProps = defaultProps;

export default Buble;
