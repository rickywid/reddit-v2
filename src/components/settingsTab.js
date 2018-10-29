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

  deleteInput(id) {
    let updatedSubsCopy = this.state.updatedSubs;
    updatedSubsCopy.splice(id, 1);

    this.setState({ updatedSubs: updatedSubsCopy}, ()=> this.props.updateSubs(this.state.updatedSubs));    
  }

  displayInput(subreddit, key) {
    return (
      <div className="new-sub__wrap" key={key}>
        <label className="new-sub__label" >r/
          <input className="new-sub__input" name={key} value={this.state.updatedSubs[key]} onChange={this.handleChange.bind(this)}/>
        </label>
        <img onClick={()=>this.deleteInput(key)} src="https://i.imgur.com/N0Ho5Va.png" />
      </div>
    )
  }

  saveSubs() {
    this.props.updateSubs(this.state.updatedSubs);
  }

  render() {

    if(this.state.isOpen) {
      return (
        <div className="new-sub">
          {this.state.updatedSubs.map(this.displayInput.bind(this))}
          <button className="btn btn--add" onClick={this.addInput.bind(this)}>Add</button>
          <button className="btn btn--save" onClick={()=>this.saveSubs()}>Save</button>
          <button className="btn btn--close" onClick={()=>this.openSettings()}>close</button>
        </div>
      );      
    } else {
      return <button className="settings-btn" onClick={()=>this.openSettings()}>+ Add</button>
    }
  }
}

export default SettingsTab;
