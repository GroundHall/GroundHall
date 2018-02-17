import React from 'react';
import {
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';

import SVG from 'react-native-svg-uri';
import Ripple from 'react-native-material-ripple';

import Arrow from './assets/arrow-right.svg';
import style from './style.css';

const propTypes = {
  widthHeight: PropTypes.number,
  loading: PropTypes.bool,
  outerStyle: PropTypes.shape(),
  onPressIn: PropTypes.func
};

const defaultProps = {
  widthHeight: 50,
  loading: false,
  outerStyle: {},
  onPressIn: () => { console.log('Button Pressed'); }
};

const NextCircle = ({
  widthHeight, loading, outerStyle, onPressIn
}) => {
  const dimentionStyles = {
    width: widthHeight,
    height: widthHeight,
    borderRadius: widthHeight / 2
  };
  return (
    <Ripple
      style={[style.button, dimentionStyles, outerStyle]}
      rippleContainerBorderRadius={widthHeight / 2}
      rippleColor="#FFF"
      onPressIn={onPressIn}
    >
      {loading ?
        <ActivityIndicator size="large" color="#FFF" /> :
        <SVG
          width="26"
          height="26"
          source={Arrow}
        />
      }
    </Ripple>
  );
};

NextCircle.propTypes = propTypes;
NextCircle.defaultProps = defaultProps;

export default NextCircle;
