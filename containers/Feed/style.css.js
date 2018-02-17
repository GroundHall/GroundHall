
import { StyleSheet } from 'react-native';

export const colors = {
  primary: {
    light: 'white',
    medium: '#FBFBFB',
    dark: ''
  },
  secondary: {
    light: '#C8E3FA',
    medium: '#49A2ED',
    dark: '#152346'
  },
  text: {
    dark: '#253450'
  }
};


export default StyleSheet.create({
  feedWrap: {
    flex: 1,
    backgroundColor: colors.primary.medium
  },
  headerWrap: {
    height: 50,
    backgroundColor: 'white',
    elevation: 1
  }
});
