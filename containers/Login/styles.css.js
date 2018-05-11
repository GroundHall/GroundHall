
import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  flexed: {
    flex: 1
  },
  titleWrap: {
    paddingTop: 90,
    paddingLeft: 30,
    marginBottom: 30
  },
  title: {
    fontFamily: 'Product Sans Bold',
    fontSize: 28,
    color: colors.secondary.dark
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 40,
    marginTop: -25,
  },
  inputWrap: {
    backgroundColor: colors.primary.light,
    marginHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    padding: 15,
    paddingTop: 40,
    paddingBottom: 80
  },
  orRegisterWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orWrap: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'Lato-Regular'
  },
  registerText: {
    fontSize: 20,
    color: colors.secondary.dark,
    marginTop: 20,
    fontFamily: 'Lato-Bold',
  }
});
