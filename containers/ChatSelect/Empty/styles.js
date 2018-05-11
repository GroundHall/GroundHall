
import { StyleSheet } from 'react-native';
import colors from '../../../colors';

const styles = StyleSheet.create({
  emptyWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 400,
    height: 300,
    marginTop: 32,
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Product Sans Regular',
    fontSize: 22,
    color: colors.secondary.dark,
    right: 20,
    bottom: 20
  }
});

export default styles;
