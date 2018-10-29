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
    let updatedSubsCopy = this.state.updatedSubs;
    updatedSubsCopy[e.target.name] = e.target.value;

    this.setState({ updatedSubs: updatedSubsCopy}, ()=>{
    })
  }

  addInput() {
    let updatedSubsCopy = this.state.updatedSubs;
    updatedSubsCopy.push("subreddit");

    this.setState({ updatedSubs: updatedSubsCopy});
  }

  deleteInput(key) {
    let updatedSubsCopy = this.state.updatedSubs;
    updatedSubsCopy.splice(key, 1);

    this.setState({ updatedSubs: updatedSubsCopy});
  }

  displayInput(subreddit, key) {
    return (
      <div key={key}>
        <label>r/
          <input name={key} value={this.state.updatedSubs[key]} onChange={this.handleChange.bind(this)}/>
        </label>
        <button onClick={()=>this.deleteInput(key)}>remove</button>
      </div>
    )
  }

  saveSubs() {
    this.props.updateSubs(this.state.updatedSubs);
  }

  render() {

    return (
      <div className={`settings-tab ${this.state.isOpen ? 'open' : ''}`}>
        <span onClick={()=>this.openSettings()} className="settings-tab__icon">O</span>
        {this.state.updatedSubs.map(this.displayInput.bind(this))}
        <button onClick={this.addInput.bind(this)}>Add</button>
        <button onClick={()=>this.saveSubs()}>Save</button>
      </div>
    );
  }
}

export default SettingsTab;
