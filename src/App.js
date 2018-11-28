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

    this.handleChange = this.handleChange.bind(this);
    this.addSubReddit = this.addSubReddit.bind(this);
    this.updateSubReddit = this.updateSubReddit.bind(this);

    this.state = {
      subreddits: [''],
      subredditsData: [],
      showInitialSetup: true
    }
  }

  componentDidMount() {

    // if there is already saved data in local storage, bypass initial screen
    // if local storage is empty or not items set then show initial screen
    if(JSON.parse(localStorage.getItem("subreddits")) !== null) {

      this.setState({ showInitialSetup: false }, ()=>this.getData());

    };
  }

  async getData() {

    const subs = JSON.parse(localStorage.getItem("subreddits"));
    const fetch = new fetchReddit();
    const data = await fetch.getData(subs);

    this.setState({ subredditsData: data });
  }

  updateSubReddit(subreddits, type) {
    
    // if local storage is empty, show initial screen & reset state
    if(type === 'delete' && subreddits.length === 0) {
        
      localStorage.removeItem("subreddits");
      
      this.setState({ 
        showInitialSetup: true, 
        subreddits: [""] 
      });
    
    return;
    
    } 

    // if there is local storage has data then update local storage and fetch data
    localStorage.setItem("subreddits", JSON.stringify(subreddits));

    this.setState({ 
      showInitialSetup: false 
    }, () => {
      this.getData(JSON.parse(localStorage.getItem("subreddits")));
    });
  }

  handleChange(e) {

    const index = e.target.name;
    const value = e.target.value;

    this.setState( prevState => {
      
      const state = { ...prevState };

      state['subreddits'][index] = value;

      return state;
    })
  }

  addSubReddit() {

    this.setState( prevState => {

      const state = { ...prevState };

      state['subreddits'] = state['subreddits'].concat(['']);      

      return state;
    })
  }

  displaySubs() {
    return JSON.parse(localStorage.getItem("subreddits")).map((subreddit, key)=>{
      return <SubReddit 
                key={key} 
                id={key}
                data={this.state.subredditsData[key]} 
                data2={JSON.parse(localStorage.getItem("subreddits"))}
            />
    })    
  }

  render() {
    if(this.state.showInitialSetup) {
      return (
        <div className="start">
          <div className="start__content">
            <h2>Start adding some of your favourite subreddits</h2>
            {(this.state.subreddits).map((item, key)=>{
              return (
                <div className="start__newsub">
                  <label className="new-sub__label" >r/
                    <input  name={key} 
                            className="new-sub__input new-sub__input--start" 
                            onChange={this.handleChange} 
                            value={this.state.subreddits[key]} 
                    />
                  </label>
                </div>
              )
            })}
            <div className="button-wrap">
              <button className="btn btn--add" 
                      onClick={this.addSubReddit}
              >
                      <FontAwesomeIcon className="icon icon--add" icon="plus" />
              </button>
              <button className="btn btn--save" 
                      onClick={()=>this.updateSubReddit(this.state.subreddits, 'add')}
              >
                      <FontAwesomeIcon className="icon icon--save" icon="check" />
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        <nav>
          <SettingsTab  subreddits={JSON.parse(localStorage.getItem("subreddits"))} 
                        updateSubs={this.updateSubReddit}
          />
        </nav>
        <div className="subreddit-wrap">
          {this.displaySubs()}
        </div>
      </div>
    );
  }
}

export default App;
