import React, { Component } from 'react';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faStar, faVideo } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

library.add(faImage, faStar, faVideo);

const Wrapper = styled.div`
  background: #250448;
  margin-bottom: 2rem;
  padding: 1rem;

  h2 {
    color: #f60261
  }

  @media (min-width: 600px) {
    padding: 3rem;  
  }

`
const List = styled.ul`
  margin: 0;
  padding: 0;
`
const ListItem = styled.li`
  list-style: none;

  a {
    color: white;
  }
  small {
    color: #fdcb01; 
    font-weight: bold

    a {
      color: #00ebea;
    }
  }
`

class SubReddit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedSubs: []
    }
  }

  componentDidMount() {
    this.setState({ updatedSubs: this.props.data2})
  }
    
  displayLinks(data, key) {

    const isStickied = data.data.stickied ? 'stickied' : '';
    const isGilded = data.data.gilded > 0 ? <FontAwesomeIcon className="icon-link icon--star" icon="star" /> : '';
    const isImage = data.data.link_flair_text === "image" || data.data.link_flair_text === "Picture" ? <FontAwesomeIcon className="icon-link icon--image" icon="image" /> : '';
    const isVideo = data.data.is_video === true ? <FontAwesomeIcon className="icon-link icon--video" icon="video" /> : '';

    return (
      <ListItem>
        <a className={`subreddit-topic__link ${isStickied}`} href={data.data.url} target="_blank" rel="noopener noreferrer">{data.data.title}</a>
        <small> by <a href={`https://reddit.com/u/${data.data.author}`}>{data.data.author}</a> </small>
        <small>{moment(data.data.created_utc * 1000).fromNow()}</small>
        <small style={{marginRight: '1rem'}}> <a href={`https://reddit.com${data.data.permalink}`}>{data.data.num_comments} comments</a></small>
        {isGilded}
        {isImage}
        {isVideo}
      </ListItem>
    )
  }

  render() {

    const { data } = this.props;

    if(!this.props.data) {
      return <div></div>
    }

    return (
      <Wrapper className="animated fadeIn">
        <a className="subreddit-title" href={`https://reddit.com/${data[0].data.permalink}`}>
          <h2>{data[0].data.subreddit}</h2>
        </a>
        <List>
          {data.map(this.displayLinks)}
        </List>
      </Wrapper>
    );
  }
}

export default SubReddit;
