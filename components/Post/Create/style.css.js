
import { StyleSheet } from 'react-native';

import colors from '../../../colors';

export default StyleSheet.create({
  tagWrap: {
    backgroundColor: colors.secondary.medium,
    alignSelf: 'flex-start',
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: 8,
    borderRadius: 3,
    marginLeft: 16,
  },
  tagText: {
    alignSelf: 'flex-start',
    color: colors.primary.light,
    fontFamily: 'Product Sans Regular',
    fontSize: 15
  },
  postWrap: {
    marginTop: -8,
    elevation: 2,
    paddingBottom: 40,
    backgroundColor: colors.primary.light,
    borderRadius: 2
  },
  headingWrap: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row'
  },
  nameDataWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: colors.secondary.dark
  },
  dateText: {
    fontFamily: 'OpenSans-Regular',
    color: colors.secondary.medium,
    fontSize: 14,
    marginTop: -4
  },
  bubbleWrap: {
    marginHorizontal: 24
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    elevation: 5,
    paddingRight: 3,
    alignSelf: 'flex-end',
    marginRight: 20
  }
});
