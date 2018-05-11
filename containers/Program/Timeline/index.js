import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Svg, { Line } from 'react-native-svg';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import Period from './Period';
import Lesson from './Lesson';
import ActivityCircle from './ActivityCircle';
import Loading from './Loading';

import colors from '../../../colors';
import styles from './styles';

const propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string,
    index: PropTypes.number,
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    subject: PropTypes.shape({
      name: PropTypes.string
    }),
  })),
  programTimeline: PropTypes.shape({
    svgProps: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    lineProps: PropTypes.shape({
      x1: PropTypes.number,
      y1: PropTypes.number,
      x2: PropTypes.number,
      y2: PropTypes.number,
      stroke: PropTypes.string,
      strokeWidth: PropTypes.number,
    }),
    circleProps: PropTypes.shape({
      cx: PropTypes.number,
      cy: PropTypes.number,
      delta: PropTypes.number,
    })
  }),
  loading: PropTypes.bool.isRequired,
  changeSVGHeight: PropTypes.func.isRequired
};

const defaultProps = {
  lessons: [],
  programTimeline: {
    lineProps: {
      x1: 30,
      y1: 0,
      x2: 30,
      y2: 400,
      stroke: colors.secondary.dark,
      strokeWidth: 2,
      __typename: 'lineProps'
    },
    svgProps: {
      width: 50,
      height: 400,
      __typename: 'svgProps'
    },
    circleProps: {
      cx: 30,
      cy: 30,
      delta: 30,
      __typename: 'circleProps'
    },
    __typename: 'programTimeline'
  }
};

class ProgramTimeline extends Component {
  get horizontalMarginStyle() {
    return {
      marginVertical: this.props.programTimeline.circleProps.delta / 2
    };
  }

  renderActivityCircles() {
    const { lessons } = this.props;
    const { svgProps, lineProps, circleProps: { cx, delta } } = this.props.programTimeline;
    return (
      <Svg {...svgProps}>
        <Line {...lineProps} />
        {lessons.map((point) => {
          const pointYPosition = point.index * delta;
          const key = `point-${point.subject.name}-${point.index}`;
          return (
            <ActivityCircle
              key={key}
              cx={cx}
              cy={pointYPosition}
              activityState="inactive"
            />
          );
        })}
      </Svg>
    );
  }

  renderLessons() {
    return (
      <View style={[styles.lessonsWrap, this.horizontalMarginStyle]} >
        {this.props.lessons.map(lesson => (
          <Lesson
            lesson={lesson}
            key={`lesson-${lesson.subject.name}-${lesson.index}`}
          />
        ))}
      </View>
    );
  }

  renderTimePeriods() {
    return (
      <View style={[styles.timePeriodsWrap, this.horizontalMarginStyle]}>
        {this.props.lessons.map(lesson => (
          <Period
            lesson={lesson}
            key={`lesson-${lesson.timeStart}-${lesson.timeEnd}`}
          />
        ))}
      </View>
    );
  }


  render() {
    const { loading, lessons } = this.props;
    if (loading || !lessons.length) {
      return <Loading />;
    }
    return (
      <View
        style={styles.timelineWrap}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          const nRecords = this.props.lessons.length;
          this.props.changeSVGHeight({
            variables: {
              value: height,
              nRecords
            }
          });
        }}
      >
        {this.renderActivityCircles()}
        {this.renderLessons()}
        {this.renderTimePeriods()}
      </View>
    );
  }
}

ProgramTimeline.propTypes = propTypes;
ProgramTimeline.defaultProps = defaultProps;

const changeSVGHeight = gql`
  mutation changeSVGHeight($value: String!, $nRecords: Number!) {
    changeSVGHeight(value: $value, nRecords: $nRecords) @client
  }`;


const query = gql`
  query {
    programTimeline @client {
      lineProps {
        x1
        y1
        x2
        y2
        stroke
        strokeWidth
      }
      svgProps {
        width
        height
      }
      circleProps {
        cx
        cy
        delta
      }
    }
  }
`;


export default compose(
  graphql(query, {
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data
    })
  }),
  graphql(changeSVGHeight, { name: 'changeSVGHeight' }),
)(ProgramTimeline);
