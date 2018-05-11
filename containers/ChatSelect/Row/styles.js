import { StyleSheet } from 'react-native';
import colors from '../../../colors';

const styles = StyleSheet.create({
  rowWrap: {
    display: 'flex',
    flexDirection: 'row',
    height: 74,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 8,
    elevation: 3
  },
  rowInnerWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    marginLeft: 18
  },
  nameLastTextWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
    justifyContent: 'center'
  },
  nameText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: colors.secondary.dark
  },
  lastText: {
    color: colors.secondary.medium,
    fontFamily: 'Product Sans Regular',
    fontSize: 15,
    paddingLeft: 2
  },
  timeWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 16
  },
  timeText: {
    color: colors.secondary.dark,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15
  }
});

export default styles;
