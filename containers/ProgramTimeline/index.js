import React, { Component } from 'react';
import Svg, { Line, Circle } from 'react-native-svg';
import { View, Text } from 'react-native';
import colors from '../../colors';
import styles from './styles.css';

import ActivityCircle from './ActivityCircle';

const lineProps = {
  x1: '30',
  y1: '0',
  x2: '30',
  y2: '400',
  stroke: colors.secondary.medium,
  strokeWidth: '2',
};

const STARTING_X_CIRCLE_POSITION = 30;

class ProgramTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgHeight: 400,
      deltaOfCirclePoints: null
    };
  }


  renderTimeline() {
    return (
      <Svg width="50" height={this.state.svgHeight}>
        <Line {...lineProps} />
        {this.props.lessons.map((point) => {
          const pointYPosition = point.index * this.state.deltaOfCirclePoints;
          const key = `point-${point.subject.name}-${point.index}`;
          return (
            <ActivityCircle
              key={key}
              activityState="inactive"
              cx={STARTING_X_CIRCLE_POSITION}
              cy={pointYPosition}
            />
          );
        })}
      </Svg>
    );
  }

  renderLesson(lesson) {
    return (
      <View
        style={styles.lessonWrap}
        key={`lesson-${lesson.subject.name}-${lesson.index}`}
      >
        <Text style={styles.lessonText}>
          {lesson.subject.name}
        </Text>
      </View>
    );
  }

  renderProgram() {
    const horizontalMargin = {
      marginVertical: this.state.deltaOfCirclePoints / 2
    };
    return (
      <View style={[styles.programWrap, horizontalMargin]} >
        {this.props.lessons.map(lesson => (
          this.renderLesson(lesson)
        ))}
      </View>
    );
  }

  renderSinglePeriod(lesson) {
    return (
      <View
        style={styles.timePeriodWrap}
        key={`lesson-${lesson.time_start}-${lesson.index}`}
      >
        <Text style={styles.singlePeriodText}>
          {lesson.time_start}
        </Text>
      </View>
    );
  }

  renderTimePeriods() {
    return (
      <View style={styles.timePeriodsWrap}>
        {this.props.lessons.map(lesson => (
          this.renderSinglePeriod(lesson)
        ))}
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.programTimelineWrap}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          this.setState({
            svgHeight: height,
            deltaOfCirclePoints: ((height) / 8)
          });
        }}
      >
        {this.renderTimeline()}
        {this.renderProgram()}
        {this.renderTimePeriods()}
      </View>
    );
  }
}


export default ProgramTimeline;
