
import { StyleSheet } from 'react-native';

import colors from '../../../colors';

export default StyleSheet.create({
  postWrap: {
    elevation: 2,
    backgroundColor: colors.primary.light,
    borderRadius: 2
  },
  headingWrap: {
    marginHorizontal: 14,
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameDataWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textWrap: {
    marginTop: 13,
    marginBottom: 14,
    marginHorizontal: 18,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#263238'
  },
  bottomPostWrap: {
    paddingVertical: 12,
    borderTopColor: '#F3F3F5',
    borderTopWidth: 2,
    paddingLeft: 20
  },
});
