import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';

import SearchSVG from './assets/search.svg';

import styles from './styles';
import colors from '../../colors';

const propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  wrapStyle: PropTypes.shape(),
  textFieldStyle: PropTypes.shape()
};

const defaultProps = {
  value: '',
  onChangeText: () => {},
  wrapStyle: {},
  textFieldStyle: {}
};

const Search = ({
  value,
  onChangeText,
  wrapStyle,
  textFieldStyle
}) => (
  <View style={[styles.searchWrap, wrapStyle]}>
    <View style={styles.iconWrap}>
      <SVG
        fill="#748094"
        source={SearchSVG}
        width="16"
        height="16"
      />
    </View>
    <TextInput
      style={[styles.input, textFieldStyle]}
      placeholder="Search"
      placeholderTextColor="#748094"
      selectionColor={colors.secondary.medium}
      underlineColorAndroid="rgba(0, 0, 0, 0)"
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
