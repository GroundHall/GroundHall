import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  text: PropTypes.string,
  wrapStyle: PropTypes.shape({}),
  textStyle: PropTypes.shape({})
};

const defaultProps = {
  text: '',
  wrapStyle: {},
  textStyle: {}
};

const Title = ({
  text, wrapStyle, textStyle
}) => (
  <View style={[styles.titleWrap, wrapStyle]}>
    <Text style={[styles.titleText, textStyle]}>{text}</Text>
  </View>
);

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
