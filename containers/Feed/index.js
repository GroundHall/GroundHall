import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import LottieView from 'lottie-react-native';

import style, { colors } from './style.css';
import fireIcon from './assets/fire.svg';
import CreatePost from '../../components/Post/Create';
import ViewPost from '../../components/Post/View';
import LoadingPost from '../../components/Post/Loading'

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarURL: PropTypes.string,
    }),
    text: PropTypes.string,
    likeCount: PropTypes.number
  })),
  me: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })
};

const defaultProps = {
  me: {
    firstName: '',
    lastName: ''
  },
  posts: []
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
          source={fireIcon}
        />
      ),
    };
  }

  componentDidMount() {
    // this.animation.play();
  }

  renderCreatePost() {
    return (
      <View style={style.createPostWrap}>
        <CreatePost me={this.props.me} />
      </View>
    );
  }

  renderPost({ item: post }) {
    return (
      <View style={style.singlePostWrap} key={post.id}>
        <ViewPost post={post} />
      </View>
    );
  }

  renderEmpty() {
    return (
      <LoadingPost />
    );
  }

  render() {
    const { posts } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={style.feedWrap}>
          <StatusBar backgroundColor="#152346" />
          <View style={style.headerWrap} />
          <FlatList
            data={posts}
            renderItem={this.renderPost}
            ListHeaderComponent={this.renderCreatePost()}
            ListEmptyComponent={this.renderEmpty()}
            keyExtractor={item => item.id}
          />
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
      id
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

Feed.propTypes = propTypes;
Feed.defaultProps = defaultProps;

export default compose(
  graphql(query, {
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data
    })
  }),
)(Feed);
