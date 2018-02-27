
import { StyleSheet } from 'react-native';

import colors from '../../../colors';

export default StyleSheet.create({
  bubble: {
    borderRadius: 20,
    backgroundColor: '#F3F3F4',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    paddingVertical: 5,
    color: colors.text.placeholder
  }
});
