
import { StyleSheet } from 'react-native';

import colors from '../../../colors';

export default StyleSheet.create({
  bubble: {
    borderRadius: 24,
    backgroundColor: '#F3F3F4',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Product Sans Regular',
    color: colors.secondary.dark,
    paddingVertical: 6,
  }
});
