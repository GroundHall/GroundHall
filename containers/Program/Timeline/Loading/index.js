import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import colors from '../../../../colors';

const Loading = () => (
  <View style={styles.loadingWrap}>
    <ActivityIndicator size="large" color={colors.secondary.dark} />
  </View>
);

export default Loading;
