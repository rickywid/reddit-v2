import React, { Component } from 'react';

class SubReddit extends Component {

  render() {
    
    const { data } = this.props;

    if(!this.props.data) {
      return <div>loading</div>
    }

    return (
      <div className="subreddit">
        <h2 className="subreddit-title">{data[0].data.subreddit}</h2>
        <ul className="subreddit-topics">{data.map((data, key)=> <li key={key} className="subreddit-topic">{data.data.title}</li>)}</ul>
      </div>
    );
  }
}

export default SubReddit;
