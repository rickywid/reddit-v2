import React, { Component } from 'react';

class SubReddit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedSubs: []
    }
  }

  componentDidMount() {
    this.setState({ updatedSubs: this.props.data2},()=>console.log(this.state.updatedSubs))
  }
    
  displayLinks(data, key) {
    return (
      <li key={key} className="subreddit-topic">
        <a className="subreddit-topic__link" href={data.data.url} target="_blank">{data.data.title}</a>
        <small> by user </small>
        <small>3 hours ago</small>
      </li>
    )
  }

  deleteSub(id) {
    let updatedSubsCopy = this.state.updatedSubs;
    updatedSubsCopy.splice(id, 1);

    this.setState({ updatedSubs: updatedSubsCopy}, ()=> this.props.updateSubs(this.state.updatedSubs));
    
  }

  render() {

    const { data, id } = this.props;

    if(!this.props.data) {
      return <div>loading</div>
    }

    return (
      <div className="subreddit">
        <h2 className="subreddit-title">r/{data[0].data.subreddit} <button onClick={()=>this.deleteSub(id)}>remove</button></h2>
        <ul className="subreddit-topics">{data.map(this.displayLinks)}</ul>
      </div>
    );
  }
}

export default SubReddit;
