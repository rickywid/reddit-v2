import React, { Component } from 'react';

class SubReddit extends Component {
    
  displayLinks(data, key) {
    return (
      <li key={key} className="subreddit-topic">
        <a className="subreddit-topic__link" href={data.data.url} target="_blank">{data.data.title}</a>
        <small> by user </small>
        <small>3 hours ago</small>
      </li>
    )
  }

  render() {

    const { data } = this.props;

    if(!this.props.data) {
      return <div>loading</div>
    }

    return (
      <div className="subreddit">
        <h2 className="subreddit-title">r/{data[0].data.subreddit}</h2>
        <ul className="subreddit-topics">{data.map(this.displayLinks)}</ul>
      </div>
    );
  }
}

export default SubReddit;
