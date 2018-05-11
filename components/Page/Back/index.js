import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import SVG from 'react-native-svg-uri';
import LeftArrowSVG from './assets/baseline-arrow_back-24px.svg';

import colors from '../../../colors';

const propTypes = {
  onPress: PropTypes.func
};

const defaultProps = {
  onPress: () => {}
};

const Back = ({
  onPress
}) => (
  <TouchableOpacity onPress={onPress}>
    <SVG
      source={LeftArrowSVG}
      width="26"
      height="26"
      fill={colors.secondary.dark}
    />
  </TouchableOpacity>
);

Back.propTypes = propTypes;
Back.defaultProps = defaultProps;

export default Back;
