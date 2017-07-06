import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../utils/api/API';
import Loading from '../../components/Loading';

import './Reddit.css';

function Topic(props) {
  return (
    <li
      className={props.selected ? 'active' : ''}
      onClick={props.onSelect.bind(this, props.topic.name)}
    >
      {props.topic.title}
    </li>
  );
}

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

function SelectTopics(props) {
  const topics = [
    {
      name: 'javascript',
      title: 'JavaScript'
    },
    {
      name: 'typescript',
      title: 'TypeScript'
    },
    {
      name: 'angular',
      title: 'Angular'
    },
    {
      name: 'reactjs',
      title: 'React'
    }
  ];
  return (
    <ul className="topics">
      {topics.map(topic =>
        <Topic
          key={topic.name}
          topic={topic}
          selected={topic.name === props.selected}
          onSelect={props.onSelect}
        />
      )}
    </ul>
  );
}

SelectTopics.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function Post(props) {
  const post = props.post;
  let classNames = props.visited ? 'visited' : '';
  classNames += props.favorite ? ' favorite' : '';
  return (
    <li className={classNames}>
      <a
        onClick={props.handleClick.bind(this, post.id)}
        href={'https://www.reddit.com' + post.permalink}
        target="_blank"
      >
        {post.title}
      </a>
      <button
        className="button favorite-button"
        onClick={props.handleFavorite.bind(this, post.id)}
      >
        &hearts;
      </button>
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  visited: PropTypes.bool.isRequired,
  favorite: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired
};

function PostsGrid(props) {
  return (
    <ul className="posts">
      {props.posts.map(post => {
        let hasVisited = props.visited.indexOf(post.data.id) !== -1;
        let isFavorite = props.favorites.indexOf(post.data.id) !== -1;
        return (
          <Post
            key={post.data.id}
            post={post.data}
            visited={hasVisited}
            favorite={isFavorite}
            handleClick={props.handlePostClick}
            handleFavorite={props.handlePostFavorite}
          />
        );
      })}
    </ul>
  );
}

PostsGrid.propTypes = {
  posts: PropTypes.array.isRequired,
  visited: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handlePostFavorite: PropTypes.func.isRequired
};

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      visitedPosts: ['6kmkr0'],
      favoritePosts: ['6kmkr0'],
      selectedTopic: 'javascript'
    };

    this.updateTopic = this.updateTopic.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handlePostFavorite = this.handlePostFavorite.bind(this);
  }

  componentDidMount() {
    this.updateTopic(this.state.selectedTopic);
  }

  updateTopic(topicName) {
    this.setState(() => {
      return {
        selectedTopic: topicName,
        posts: null
      };
    });

    API.fetchHotPosts(topicName).then(posts => {
      this.setState(() => {
        return { posts };
      });
    });
  }

  handlePostClick(postId) {
    this.setState(prevState => {
      let visitedPostsArr = prevState.visitedPosts;
      const postIndex = visitedPostsArr.indexOf(postId);
      if (postIndex !== -1) {
        //
      } else {
        visitedPostsArr.push(postId);
      }

      return {
        visitedPosts: visitedPostsArr
      };
    });
  }

  handlePostFavorite(postId) {
    this.setState(prevState => {
      let favPostsArr = prevState.favoritePosts;
      const postIndex = favPostsArr.indexOf(postId);
      if (postIndex !== -1) {
        favPostsArr.splice(postIndex, 1);
      } else {
        favPostsArr.push(postId);
      }

      return {
        favoritePosts: favPostsArr
      };
    });
  }

  render() {
    let { selectedTopic, posts, visitedPosts, favoritePosts } = this.state;

    return (
      <section>
        <div className="topics-wrapper">
          <SelectTopics selected={selectedTopic} onSelect={this.updateTopic} />

          {!posts
            ? <Loading />
            : <PostsGrid
                posts={posts}
                visited={visitedPosts}
                favorites={favoritePosts}
                handlePostClick={this.handlePostClick}
                handlePostFavorite={this.handlePostFavorite}
              />}
        </div>
      </section>
    );
  }
}

export default Reddit;
