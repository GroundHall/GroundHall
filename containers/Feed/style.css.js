
import { StyleSheet } from 'react-native';

import colors from '../../colors';


export default StyleSheet.create({
  feedWrap: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#FAFBFC'
  },
  headerWrap: {
    backgroundColor: 'white',
    elevation: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 24,
    paddingVertical: 16,
    marginBottom: 16
  },
  headingText: {
    fontSize: 26,
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'Product Sans Regular',
    color: colors.secondary.dark
  },
  createPostWrap: {
    marginBottom: 8,
    marginHorizontal: 8
  },
  singlePostWrap: {
    marginBottom: 8,
    marginHorizontal: 8
  }
});
