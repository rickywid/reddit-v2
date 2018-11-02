import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);

class App extends Component {

  constructor() {
    super();

    this.state = {
      subreddits: [''],
      subredditsData: [],
      showInitialSetup: true
    }
  }

  componentDidMount() {

    // if there is already saved data in local storage, bypass initial screen
    if(JSON.parse(localStorage.getItem("subreddits")) !== null) {
      console.log('mounted')
      this.setState({ showInitialSetup: false }, ()=>this.getData())
    };

    // if local storage is empty or not items set then show initial screen

  }

  getData() {

    let subs = JSON.parse(localStorage.getItem("subreddits"));
    const fetch = new fetchReddit();

    fetch.getData(subs).then(subredditsData =>{
      this.setState({ subredditsData });
    })
  }

  updateSubReddit(subreddits, type) {
    
    // if local storage is empty, show initial screen & reset state
    if(type === 'delete' && subreddits.length === 0) {
        localStorage.removeItem("subreddits");
        this.setState({ showInitialSetup: true, subreddits: [""] })

        return;
    } 

    // if there is local storage has data then update local storage and fetch data
    localStorage.setItem("subreddits", JSON.stringify(subreddits));
    this.setState({ showInitialSetup: false }, ()=> this.getData(JSON.parse(localStorage.getItem("subreddits"))))      
  }

  handleChange(e) {
    let subreddits = this.state.subreddits;
    subreddits[e.target.name] = e.target.value; 

    this.setState({ subreddits }, ()=> console.log(this.state.subreddits));
  }

  addSubReddit() {
    let newSet = this.state.subreddits;
    newSet.push('');

    this.setState({ subreddits:  newSet });
  }

  render() {
    if(this.state.showInitialSetup) {
      return (
        <div className="start">
          <h2>Add your favourite subreddits</h2>
          {(this.state.subreddits).map((item, key)=>{
            return (
              <div className="new-sub__wrap">
                <label className="new-sub__label" >r/
                  <input name={key} className="new-sub__input" onChange={this.handleChange.bind(this)} value={this.state.subreddits[key]} />
                </label>
              </div>
            )
          })}

          <button className="btn btn--add"><FontAwesomeIcon onClick={()=> this.addSubReddit()}className="icon icon--add" icon="plus" /></button>
          <button className="btn btn--save"><FontAwesomeIcon onClick={()=>this.updateSubReddit(this.state.subreddits, 'add')} className="icon icon--save" icon="check" /></button>
        </div>
      )
    }
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
