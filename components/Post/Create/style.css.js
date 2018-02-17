
import { StyleSheet } from 'react-native';

import colors from '../../../colors';

export default StyleSheet.create({
  tagWrap: {
    backgroundColor: colors.secondary.dark,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  tagText: {
    alignSelf: 'flex-start',
    color: colors.primary.light
  },
  postWrap: {
    marginTop: -25,
    elevation: 3,
    paddingBottom: 40,
    backgroundColor: colors.primary.light,
    borderRadius: 5
  },
  headingWrap: {
    marginHorizontal: 16,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  nameDataWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: colors.secondary.dark
  },
  dateText: {
    fontFamily: 'Lato-Bold',
    color: colors.secondary.medium,
    fontSize: 12,
    paddingLeft: 2,
    marginTop: -2
  },
  bubbleWrap: {
    marginHorizontal: 20
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    elevation: 5,
    paddingRight: 3,
    alignSelf: 'flex-end',
    marginRight: 20
  }
});
