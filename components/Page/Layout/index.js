import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
};

const defaultProps = {
  style: {}
};

const Layout = ({ children, style, ...props }) => (
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    accessible={false}
  >
    <View style={[styles.layout, style]} {...props}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
