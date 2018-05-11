
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
    elevation: 2,
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
    justifyContent: 'center'
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
  textWrap: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 24
  },
  text: {
    fontSize: 16,
    fontFamily: 'Product Sans Regular',
    color: colors.secondary.dark
  },
  likeBubbleWrap: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: '#F3F3F5',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 6,
    marginBottom: -11,
    zIndex: 5,
    marginLeft: 32
  },
  likeBubbleText: {
    color: '#E91E63',
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    alignSelf: 'flex-start',
  },
  bottomPostWrap: {
    paddingVertical: 12,
    borderTopColor: '#F3F3F5',
    borderTopWidth: 2,
    paddingLeft: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  likeTextWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 2,
    paddingTop: 2
  },
  likeText: {
    fontSize: 16,
    color: 'rgba(233, 30, 99, .6)',
    fontFamily: 'Lato-Bold',
    opacity: 70
  }
});
