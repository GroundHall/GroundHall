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
import { graphql } from 'react-apollo';

import style from './style.css';
import fireIcon from './assets/fire.svg';
import CreatePost from '../../components/Post/Create';
import ViewPost from '../../components/Post/View';
import LoadingPost from '../../components/Post/Loading';

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
  }),
  updateFeed: PropTypes.func.isRequired,
  subscribeToPostChanges: PropTypes.func.isRequired,
};

const defaultProps = {
  me: {
    firstName: '',
    lastName: ''
  },
  posts: []
};

const POSTS_PER_FETCH = 4;

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
  constructor(props) {
    super(props);
    this.handleEndReached = this.handleEndReached.bind(this);
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this);
    this.unsubscribe = () => {};
  }

  handleEndReached() {
    if (this.props.posts.length) {
      this.props.updateFeed();
    }
  }

  handleViewableItemsChanged({ viewableItems }) {
    this.unsubscribe();
    const viewableItemsIds = viewableItems.map(item => item.key);
    this.unsubscribe = this.props.subscribeToPostChanges({ postIds: viewableItemsIds });
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
      <View style={style.singlePostWrap}>
        <LoadingPost />
      </View>
    );
  }


  render() {
    const { posts } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#152346" />
        <View style={style.headerWrap} />
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <FlatList
            style={{ flex: 1 }}
            data={posts}
            renderItem={this.renderPost}
            ListHeaderComponent={this.renderCreatePost()}
            ListFooterComponent={this.renderEmpty()}
            keyExtractor={item => item.id}
            onEndReached={this.handleEndReached}
            onEndReachedThreshold={0.2}
            onViewableItemsChanged={this.handleViewableItemsChanged}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const POST_SUBSCRIPTIONS = gql`
  subscription onPostChanged($postIds: [String]){
    postChanged(postIds: $postIds){
      id
      likeCount
    }
  }
`;

const POST_QUERY = gql`
  query getFeed($skip: Int, $limit: Int){
    me {
      firstName
      lastName
      avatarURL
    }
    posts(skip: $skip, limit: $limit) {
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
const withData = graphql(POST_QUERY, {
  props: ({ ownProps, data: { fetchMore, subscribeToMore, ...data } }) => ({
    ...ownProps,
    updateFeed: () => {
      const skipOnFetchMore = 'posts' in data ? data.posts.length : POSTS_PER_FETCH;
      return fetchMore({
        variables: { skip: skipOnFetchMore, limit: POSTS_PER_FETCH },
        updateQuery: (previousResult, { fetchMoreResult }) => Object.assign({}, previousResult, {
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        })
      });
    },
    subscribeToPostChanges: params => subscribeToMore({
      document: POST_SUBSCRIPTIONS,
      variables: {
        postIds: params.postIds,
      },
      updateQuery: (prev, { subscriptionData }) => {
        const next = prev;
        next.posts = prev.posts.map((post) => {
          if (post.id === subscriptionData.postChanged.id) {
            next.likeCount = subscriptionData.postChanged.likeCount;
          }
          return post;
        });

        return Object.assign({}, prev);
      }
    }),
    ...data
  }),
  options: { variables: { skip: 0, limit: POSTS_PER_FETCH } },
});


const FeedWithData = withData(Feed);
export default FeedWithData;
