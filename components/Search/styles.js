import { StyleSheet } from 'react-native';

import colors from '../../colors';

const styles = StyleSheet.create({
  searchWrap: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'stretch',
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 28,
    elevation: 3
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 8,
  },
  input: {
    marginLeft: 12,
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.secondary.dark
  }
});

export default styles;
