
import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  imageBackground: {
    flex: 1
  },
  programHeadingWrap: {
    backgroundColor: colors.secondary.medium,
    padding: 10,
    marginLeft: 30,
    marginTop: 20,
    width: 120,
    borderRadius: 3
  },
  programHeadingText: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: 'white',
  },
  titleWrap: {
    marginLeft: 30,
    marginTop: 25
  },
  titleText: {
    fontSize: 26,
    fontFamily: 'Lato-Black',
    color: colors.secondary.dark,
  },
  schoolHeadingWrap: {
    backgroundColor: colors.secondary.medium,
    padding: 10,
    marginLeft: 30,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
    borderRadius: 3,
    alignSelf: 'flex-start'
  },
  schollHeadingText: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'flex-start'
  },
  lastSchoolPost: {
    marginTop: -2,
    marginHorizontal: 20,
    height: 175,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2
  }
});
