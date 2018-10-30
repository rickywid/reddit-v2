import React, { Component } from 'react';
import moment from 'moment';

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

    return (
      <li key={key} className="subreddit-topic">
        <a className={`subreddit-topic__link ${isStickied}`} href={data.data.url} target="_blank">{data.data.title}</a>
        <small> by <a href={`https://reddit.com/u/${data.data.author}`}>{data.data.author}</a> </small>
        <small>{moment(data.data.created_utc * 1000).fromNow()}</small>
        <small> <a href={`https://reddit.com${data.data.permalink}`}>{data.data.num_comments} comments</a></small>
      </li>
    )
  }

  render() {

    const { data, id } = this.props;

    if(!this.props.data) {
      return <div>loading</div>
    }

    return (
      <div className="subreddit">
        <a className="subreddit-title" href={`https://reddit.com/${data[0].data.permalink}`}>
          <h2>r/{data[0].data.subreddit}</h2>
        </a>
        <ul className="subreddit-topics">{data.map(this.displayLinks)}</ul>
      </div>
    );
  }
}

export default SubReddit;
