import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SVG from 'react-native-svg-uri';

import style, { colors } from './style.css';
import CreatePost from '../../components/Post/Create';
import ViewPost from '../../components/Post/View';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const defaultProps = {
  me: {
    firstName: '',
    lastName: ''
  }
};

class Feed extends Component {
  static navigationOptions() {
    return {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => (
        <SVG
          width="26"
          height="26"
          fill={tintColor}
          source={require('./assets/fire.svg')}
        />
      ),
    };
  }

  renderPosts() {
    return this.props.posts.map(post => <ViewPost post={post} />);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={style.feedWrap}>
          <StatusBar backgroundColor="#152346" />
          <View style={style.headerWrap} />
          <View style={{
            marginHorizontal: 20,
            marginTop: 18,
          }}
          >
            <CreatePost me={this.props.me} />
          </View>
          {}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const query = gql`
  query {
    me {
      firstName
      lastName
      avatarURL
    }
    posts {
      user {
        firstName
        lastName
        avatarURL
      }
      text
      likeCount
    }
  }
`;

Feed.defaultProps = defaultProps;

export default compose(
  graphql(query, {
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data
    })
  }),
)(Feed);
