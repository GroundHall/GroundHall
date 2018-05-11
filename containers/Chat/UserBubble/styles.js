import { StyleSheet } from 'react-native';

import colors from '../../../colors';

const styles = StyleSheet.create({
  bubbleWrap: {
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 64,
    paddingLeft: 16,
    paddingRight: 32,
    borderRadius: 32
  },
  avatar: {
    width: 40,
    height: 40
  },
  nameUsernameWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 18
  },
  name: {
    fontSize: 16,
    color: colors.secondary.dark,
    fontFamily: 'OpenSans-SemiBold'
  },
  username: {
    fontSize: 14,
    color: colors.secondary.medium,
    fontFamily: 'Product Sans Regular'
  }
});


export default styles;
