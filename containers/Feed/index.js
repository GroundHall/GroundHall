import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import SVG from 'react-native-svg-uri';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import style from './style.css';
import fireIcon from './assets/fire.svg';
import CreatePost from '../../components/Post/Create';
import ViewPost from '../../components/Post/View';
import LoadingPost from '../../components/Post/Loading';

import colors from '../../colors';

const INITIAL_SKIP = 0;
const POSTS_PER_FETCH = 4;

const POST_UPDATE_QUERY_TAG = gql`
query {
  posts(skip: ${INITIAL_SKIP}, limit: ${POSTS_PER_FETCH}) {
    id
    user {
      id
      firstName
      lastName
      avatarURL
    }
    text
    likeCount
    iLike
  }
}
`;

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
    this.renderPost = this.renderPost.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.handleCreatePostTextChange = this.handleCreatePostTextChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.unsubscribe = () => {};
    this.state = {
      createPostText: ''
    };
  }

  unlikePost(postId, postLikeCount, me) {
    const nextPostLikeCount = postLikeCount - 1;
    this.props.unlikePost({
      variables: { postId },
      update: (store, { data: { unlikePost: { id, likeCount, iLike } } }) => {
        const { posts } = store.readQuery({
          query: POST_UPDATE_QUERY_TAG,
        });
        const changedPostIndex = posts.findIndex(post => post.id === id);
        posts[changedPostIndex].likeCount = likeCount;
        posts[changedPostIndex].iLike = iLike;

        store.writeQuery({
          query: POST_UPDATE_QUERY_TAG,
          data: { posts }
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        unlikePost: {
          id: postId,
          likeCount: nextPostLikeCount,
          iLike: false,
          __typename: 'Post',
        }
      }
    });
  }

  likePost(postId, postLikeCount, me) {
    const nextPostLikeCount = postLikeCount + 1;
    this.props.likePost({
      variables: { postId },
      update: (store, { data: { likePost: { id, likeCount, iLike } } }) => {
        const { posts } = store.readQuery({
          query: POST_UPDATE_QUERY_TAG,
        });
        const changedPostIndex = posts.findIndex(post => post.id === id);
        posts[changedPostIndex].likeCount = likeCount;
        posts[changedPostIndex].iLike = iLike;
        store.writeQuery({
          query: POST_UPDATE_QUERY_TAG,
          data: { posts }
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likePost: {
          id: postId,
          likeCount: nextPostLikeCount,
          iLike: true,
          __typename: 'Post',
        }
      }
    });
  }

  handleCreatePostTextChange(value) {
    debugger;
    this.setState({ createPostText: value });
  }

  handleCreatePost() {
    if (this.state.createPostText) {
      this.setState(() => ({
        createPostLoading: true
      }));
      debugger;
      this.props.createPost({
        variables: { text: this.state.createPostText, isPublic: false },
        update: (store, { data: { createPost: { optimisticResponse, ...newPost } } }) => {
          const { posts } = store.readQuery({
            query: POST_UPDATE_QUERY_TAG
          });
          debugger;
          posts.unshift(newPost);
          store.writeQuery({
            query: POST_UPDATE_QUERY_TAG,
            data: { posts }
          });
          !optimisticResponse && this.setState(() => ({
            createPostLoading: false,
            createPostText: '',
            createPostPublicity: false
          }));
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            id: 'newPost',
            likeCount: 0,
            iLike: false,
            text: this.state.createPostText,
            user: this.props.me,
            loading: true,
            optimisticResponse: true,
            __typename: 'Post',
          }
        }
      });
    }
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
        <Text style={style.headingText}>News Feed</Text>
        <CreatePost me={this.props.me} text={this.state.createPostText} onChange={this.handleCreatePostTextChange} onCreate={this.handleCreatePost} />
      </View>
    );
  }

  renderPost({ item: post }) {
    const { me } = this.props;
    const {
      text,
      likeCount,
      iLike,
      user: { firstName, lastName, avatarURL }
    } = post;

    return (
      <View style={style.singlePostWrap} key={post.id}>
        <ViewPost
          text={text}
          firstName={firstName}
          lastName={lastName}
          likeCount={likeCount}
          isLiked={iLike}
          avatarURL={avatarURL}
          onLikeUnlikePress={() => {
            if (iLike) {
              this.unlikePost(post.id, likeCount, me);
            } else {
              this.likePost(post.id, likeCount, me);
            }
          }}
        />
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
        <StatusBar backgroundColor={colors.secondary.medium} />
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
      likedBy {
        id
      }
    }
  }
`;

const LIKE_POST_MUTAITON = gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId) {
      id
    } 
  }
`;

const POST_QUERY = gql`
  query getFeed($skip: Int, $limit: Int){
    me {
      id
      firstName
      lastName
      avatarURL
    }
    posts(skip: $skip, limit: $limit) {
      id
      user {
        id
        firstName
        lastName
        avatarURL
      }
      text
      likeCount
      iLike
    }
  }
`;

Feed.propTypes = propTypes;
Feed.defaultProps = defaultProps;

const masterQuery = graphql(POST_QUERY, {
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
        const next = Object.assign({}, prev);
        next.posts = next.posts.map((post) => {
          if (post.id === subscriptionData.postChanged.id) {
            next.likeCount = subscriptionData.postChanged.likeCount;
            next.likedBy = subscriptionData.postChanged.likedBy;
          }
          return post;
        });
        return next;
      }
    }),
    ...data
  }),
  options: { variables: { skip: 0, limit: POSTS_PER_FETCH } },
});


const LIKE_POST_MUTAITON_TAG = gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId) {
      id
      likeCount
      iLike
    } 
  }
`;

const UNLIKE_POST_MUTAITON_TAG = gql`
  mutation unlikePost($postId: String!) {
    unlikePost(postId: $postId) {
      id
      likeCount
      iLike
    } 
  }
`;

const CREATE_POST_MUTATION_TAG = gql`
  mutation createPost($text: String!, $isPublic: Boolean) {
    createPost(text: $text, isPublic: $isPublic) {
      id
      text
      likeCount
      iLike
      user {
        id
        firstName
        lastName
        avatarURL
      }
    } 
  }
`;


const likePost = graphql(LIKE_POST_MUTAITON_TAG, { name: 'likePost' });
const unlikePost = graphql(UNLIKE_POST_MUTAITON_TAG, { name: 'unlikePost' });
const createPost = graphql(CREATE_POST_MUTATION_TAG, { name: 'createPost' });

export default compose(
  masterQuery,
  likePost,
  unlikePost,
  createPost
)(Feed);
