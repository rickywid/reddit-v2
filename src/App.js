import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
import { Button } from './assets/styled-components/button';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled, { css } from 'styled-components';

library.add(faTimes);

const HeaderWrapper = styled.div`
  text-align: center;
`
const Card = styled.div`
  text-align: center;
`

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

    return (
      <div>

        <nav>
          reddit
        </nav>

        {this.state.showInitialSetup 
          ? 
        <div className="animated fadeIn">
          <HeaderWrapper>
            <h1>Header Goes Over Here</h1>
            <h2>Subheader goes over here where you describe what your sites does</h2>
          </HeaderWrapper>
          <Card>
            <h2>Start adding some of your favourite subreddits</h2>
            {(this.state.subreddits).map((item, key)=>{
              return (
                <div>
                  <label>r/
                    <input  name={key}
                            onChange={this.handleChange} 
                            value={this.state.subreddits[key]} 
                    />
                  </label>
                </div>
              )
            })}
            <div>
              <Button primary onClick={this.addSubReddit}>
                      <FontAwesomeIcon icon="plus"/> Add subreddit
              </Button>
              <Button onClick={()=>this.updateSubReddit(this.state.subreddits, 'add')}>
                <FontAwesomeIcon className="icon icon--save" icon="check" /> Done
              </Button>
            </div>
          </Card>
        </div>
          : 
        <div className="App">
          <nav>
            <SettingsTab  subreddits={JSON.parse(localStorage.getItem("subreddits"))} 
                          updateSubs={this.updateSubReddit}
            />
          </nav>
          <div>
            {this.displaySubs()}
          </div>
        </div>
        }
      </div>
    )
  }
}

export default App;
