import React, { Component } from 'react';

class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedSubs: [],
      isOpen: false
    }
  }

  componentDidMount() {
    this.setState({ updatedSubs: this.props.subreddits},()=>console.log(this.state.updatedSubs))
  }

  openSettings() {
    this.setState({ 
      updatedSubs: [],
      isOpen: !this.state.isOpen 
    });
  }

  handleChange(e) {
    console.log(this.state)
    let x = this.state.updatedSubs;
    x[e.target.name] = e.target.value;

    this.setState({ updatedSubs: x}, ()=>{
      console.log(this.state.updatedSubs)
    })
  }

  displayInput(subreddit, key) {
    return (
      <div key={key}>
        <label>r/
          <input name={key} value={this.state.updatedSubs[key]} onChange={this.handleChange.bind(this)}/>
        </label>
        <input type="checkbox" />
      </div>
    )
  }

  saveSubs() {
    console.log(this.props)
    this.props.updateSubs(this.state.updatedSubs);
  }

  render() {

    return (
      <div className={`settings-tab ${this.state.isOpen ? 'open' : ''}`}>
        <span onClick={()=>this.openSettings()} className="settings-tab__icon">O</span>
        {this.state.updatedSubs.map(this.displayInput.bind(this))}
        <button>Add</button>
        <button>Delete</button>
        <button onClick={()=>this.saveSubs()}>Save</button>
      </div>
    );
  }
}

export default SettingsTab;
