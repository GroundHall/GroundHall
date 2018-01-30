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

import FlexView from '../../components/FlexView';
import ProgramTimeline from '../../components/ProgramTimeline';

import styles from './styles.css';
import colors from '../../colors';
import HomeBackground from './assets/HomeBackground.png';
import Avatar from './assets/camila_cabelo_avatar.jpg';

class HomeScreen extends Component {
  get todayWeekDay() {
    return this.props.today.length
      ? this.props.today[0].day
      : 'Loading';
  }

  render() {
    return (
      <FlexView>
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
              flexDirection: 'row',
              marginTop: 15,
              marginHorizontal: 16
            }}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 22,
                  borderWidth: 2,
                  borderColor: colors.secondary.medium,
                  marginRight: 6
                }}
                source={Avatar}
              />
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Lato-Bold',
                    color: colors.secondary.dark
                  }}
                >Camila Cabelo
                </Text>
                <Text style={{
                    fontFamily: 'Lato-Bold',
                    color: colors.secondary.light,
                    fontSize: 12,
                    paddingLeft: 2,
                    marginTop: -2
                  }}
                >
                    now
                </Text>
              </View>
            </View>
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
          <ProgramTimeline lessons={this.props.today} />
        </ImageBackground>
      </FlexView>
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
      index
      time_start
      time_end
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

