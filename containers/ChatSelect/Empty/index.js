import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

import CoffeeAndChillPNG from './assets/coffee-and-chill.png';

const Empty = () => (
  <View style={styles.emptyWrap}>
    <Image
      source={CoffeeAndChillPNG}
      style={styles.image}
    />
    <Text style={styles.text}>
      {"Search, make friends and \nchat! It's that easy..."}
    </Text>
  </View>
);

export default Empty;
