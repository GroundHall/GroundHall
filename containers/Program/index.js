import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SVG from 'react-native-svg-uri';

import HappyPNG from './assets/happy.png';
import DotCircleSVG from './assets/dot-circle.svg';

import Timeline from './Timeline';
import Page, { Title } from '../../components/Page';

import styles from './styles';
import colors from '../../colors';

const SVGProps = {
  width: 26,
  height: 26,
  source: DotCircleSVG,
};

class HomeScreen extends Component {
  static navigationOptions() {
    return {
      tabBarIcon: ({ tintColor }) => (
        <SVG {...SVGProps} fill={tintColor} />
      ),
    };
  }

  renderImage() {
    return (
      <View style={styles.imageWrap}>
        <Image
          source={HappyPNG}
          style={styles.imageDimensions}
        />
      </View>
    );
  }

  renderProgram() {
    const { lessons } = this.props;
    return (
      <View style={styles.programWrap}>
        <View style={styles.programHeadingWrap}>
          <Text style={styles.programHeadingText}>Monday Program</Text>
        </View>
        <View style={styles.programDimensions}>
          <Timeline lessons={lessons} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Page>
        <StatusBar backgroundColor={colors.secondary.medium} barStyle="light-content" />
        <Title text="What we have for today..." />
        {this.renderImage()}
        {this.renderProgram()}
      </Page>
    );
  }
}

HomeScreen.defaultProps = {
  lessons: []
};

const query = gql`
  query {
    lessons {
      id
      index
      day
      timeStart
      timeEnd
      subject {
        name
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
  })
)(HomeScreen);

