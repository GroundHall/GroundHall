import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';

class FlexView extends Component {
    render() {
      return (
        <View style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }
}

export default FlexView;
  