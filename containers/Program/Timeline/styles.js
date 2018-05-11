
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  timelineWrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5
  },
  lessonsWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  timePeriodsWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 20
  },
});
