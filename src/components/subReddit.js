import React, { Component } from 'react';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

library.add(faImage, faStar, faVideo);

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1rem 0;

  h2 {
    color: #f60261;
    display: inline-block;
    font-weight: bold;
    transition: color .2s;

    &:hover {
      color: #f602616e;
    }
  }

  @media (min-width: 600px) {
    padding: 3rem 0;
  }

`;
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.3rem;

  a {
    color: white;

    &:hover {
      color: yellow;
    }
  }
  small {
    color: #fdcb01; 
    font-weight: bold

    a {
      color: #00ebea;
    }
  }
`;

class SubReddit extends Component {
  displayLinks = (data, key) => {
    const isStickied = data.data.stickied ? 'stickied' : '';
    const isGilded = data.data.gilded > 0 ? <FontAwesomeIcon className="icon-link icon--star" icon="star" /> : '';
    const isImage = data.data.link_flair_text === 'image' || data.data.link_flair_text === 'Picture' ? <FontAwesomeIcon className="icon-link icon--image" icon="image" /> : '';
    const isVideo = data.data.is_video === true ? <FontAwesomeIcon className="icon-link icon--video" icon="video" /> : '';

    return (
      <ListItem key={key}>
        <a className={`subreddit-topic__link ${isStickied}`} href={data.data.url} target="_blank" rel="noopener noreferrer">{data.data.title}</a>
        &nbsp;
        <small>
          by
          <a href={`https://reddit.com/u/${data.data.author}`}>
            &nbsp;
            {data.data.author}
          </a>
        </small>
        &nbsp;
        <small>{moment(data.data.created_utc * 1000).fromNow()}</small>
        &nbsp;
        <small style={{ marginRight: '1rem' }}>
          <a href={`https://reddit.com${data.data.permalink}`}>
            {data.data.num_comments}
            &nbsp;
            comments
          </a>
        </small>
        {isGilded}
        {isImage}
        {isVideo}
      </ListItem>
    );
  }

  render() {
    const { data, id } = this.props;

    if (!data) {
      return <div />;
    }

    return (
      <Wrapper id={id} className="animated fadeIn">
        <a className="subreddit-title" href={`https://reddit.com/r/${data[0].data.subreddit}`}>
          <h2>{data[0].data.subreddit}</h2>
        </a>
        <List>
          {data.map(this.displayLinks)}
        </List>
      </Wrapper>
    );
  }
}

SubReddit.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      data: PropTypes.shape(
        {
          subreddit: PropTypes.string,
        },
      ),
    })])),
  id: PropTypes.string.isRequired,
};

SubReddit.defaultProps = {
  data: null,
};

export default SubReddit;
