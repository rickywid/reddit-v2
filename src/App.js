import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
import './App.scss';

class App extends Component {

  constructor() {
    super();

    this.state = {
      subreddits: [],
      subredditsData: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let subs = JSON.parse(localStorage.getItem("subreddits"));

    const fetch = new fetchReddit();

    fetch.getData(subs).then(subredditsData =>{
      this.setState({ subredditsData });
    })
  }

  updateSubReddit(subreddits) {
    localStorage.setItem("subreddits", JSON.stringify(subreddits));
    let subs = JSON.parse(localStorage.getItem("subreddits"));

    this.getData(subs);
  }

  render() {
    return (
      <div className="App">
        <div className="subreddit-wrap">
          {JSON.parse(localStorage.getItem("subreddits")).map((subreddit, key)=>{
            return <SubReddit 
                      key={key} 
                      id={key}
                      data={this.state.subredditsData[key]} 
                      data2={JSON.parse(localStorage.getItem("subreddits"))}
                  />
          })}
          <SettingsTab subreddits={JSON.parse(localStorage.getItem("subreddits"))} updateSubs={this.updateSubReddit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
