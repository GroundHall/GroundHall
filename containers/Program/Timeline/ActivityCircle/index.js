import React from 'react';
import { Circle } from 'react-native-svg';

import colors from '../../../../colors';

const ActivityCircle = ({
  activityState, cx, cy
}) => {
  switch (activityState) {
    case 'active':
      return (
        <Circle
          cx={cx}
          cy={cy}
          r="6"
          stroke={colors.secondary.dark}
          strokeWidth="4"
          fill="#FB9F17"
        />
      );
    default:
      return (
        <Circle
          cx={cx}
          cy={cy}
          r="6"
          stroke={colors.secondary.dark}
          strokeWidth="2"
          fill="white"
        />
      );
  }
};

export default ActivityCircle;
