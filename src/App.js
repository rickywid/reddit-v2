import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
import './App.scss';

class App extends Component {

  constructor() {
    super();

    this.state = {
      subreddits: ['webdev', 'cscareerquestions', 'learnprogramming', 'javascript', 'python'],
      subredditsData: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const fetch = new fetchReddit();

    fetch.getData(this.state.subreddits).then(subredditsData =>{
      this.setState({ subredditsData });
    })
  }

  updateSubReddit(subreddits) {
    this.setState({ subreddits }, ()=>this.getData())
  }

  render() {
    return (
      <div className="App">
        <div className="subreddit-wrap">
          {this.state.subreddits.map((subreddit, key)=>{
            return <SubReddit 
                      key={key} 
                      data={this.state.subredditsData[key]} 
                  />
          })}
          <SettingsTab subreddits={this.state.subreddits} updateSubs={this.updateSubReddit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
