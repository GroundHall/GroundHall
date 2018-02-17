import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SVG from 'react-native-svg-uri';

import ProgramTimeline from '../../containers/ProgramTimeline';

import styles from './styles.css';
import colors from '../../colors';
import HomeBackground from './assets/HomeBackground.png';

class HomeScreen extends Component {
  static navigationOptions() {
    return {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => (
        <SVG
          width="26"
          height="26"
          fill={tintColor}
          source={require('./assets/book.svg')}
        />
      ),
    };
  }

  get todayWeekDay() {
    return this.props.today.length
      ? this.props.today[0].day
      : 'Loading...';
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <StatusBar backgroundColor={colors.primary.dark} barStyle="dark-content" />
        <ImageBackground
          source={HomeBackground}
          style={styles.imageBackground}
        >
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>{this.todayWeekDay}</Text>
          </View>
          <View style={styles.schoolHeadingWrap}>
            <Text style={styles.schollHeadingText}>#npmg</Text>
          </View>
          <View style={styles.lastSchoolPost}>
            <View style={{
              display: 'flex',
              flex: 1,
              marginHorizontal: 50,
              justifyContent: 'center',
              flexDirection: 'column'
            }}
            >
              <Text style={{
                fontSize: 24,
                fontFamily: 'Lato-BoldItalic',
                color: colors.secondary.dark,
                textAlign: 'center'
              }}
              >
              Today, no scholl because of
                the flue, wohoo!

              </Text>
            </View>
            <View style={{
              height: 45,
              borderTopColor: '#E8E8EB',
              borderTopWidth: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 6
                }}
                source={require('./assets/great.png')}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Lato-Bold',
                  color: colors.secondary.medium,
                  textAlign: 'center'
                }}
              >Great
              </Text>
            </View>
          </View>
          <View style={styles.programHeadingWrap}>
            <Text style={styles.programHeadingText}>Program - 12I</Text>
          </View>
          <ProgramTimeline />
        </ImageBackground>
      </View>
    );
  }
}

HomeScreen.defaultProps = {
  today: []
};

const query = gql`
  query {
    today {
      day
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

