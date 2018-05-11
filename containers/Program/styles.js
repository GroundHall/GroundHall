
import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  imageWrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 16,
    alignItems: 'center'
  },
  imageDimensions: {
    width: 320,
    height: 240
  },
  programWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginBottom: 16,
    marginHorizontal: 16
  },
  programDimensions: {
    height: 300
  },
  programHeadingWrap: {
    backgroundColor: colors.secondary.medium,
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: -4,
    marginLeft: 16,
    display: 'flex',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    borderRadius: 5
  },
  programHeadingText: {
    fontSize: 16,
    fontFamily: 'Product Sans Regular',
    color: 'white',
  },
  titleWrap: {
    marginLeft: 32,
    marginTop: 24,
    marginBottom: 16
  }
});
