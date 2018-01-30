
import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  programTimelineWrap: {
    marginHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: -2,
    display: 'flex',
    flexDirection: 'row',
  },
  programWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  timePeriodsWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 20
  },
  lessonWrap: {
    flex: 1,
    justifyContent: 'center'
  },
  lessonText: {
    fontSize: 17,
    fontFamily: 'Lato-Regular',
    color: colors.secondary.medium,
  },
  singlePeriodText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: colors.secondary.medium
  },
  timePeriodWrap: {
    flex: 1,
    justifyContent: 'center'
  },
});
