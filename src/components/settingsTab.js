import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCog, faPlus, faCheck, faTimes);


class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedSubs: [],
      isOpen: false
    }
  }

  componentDidMount() {
    this.setState({ updatedSubs: this.props.subreddits});
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    return { updatedSubs: nextProps.subreddits }
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

    this.setState({ updatedSubs: updatedSubsCopy}, ()=> this.props.updateSubs(this.state.updatedSubs, 'delete'));    
  }

  displayInput(subreddit, key) {
    return (
      <div className="new-sub__wrap" key={key}>
        <label className="new-sub__label" >r/
          <input className="new-sub__input" name={key} value={this.state.updatedSubs[key]} onChange={this.handleChange.bind(this)}/>
        </label>
        <FontAwesomeIcon onClick={()=>this.deleteInput(key)} className="icon icon--remove" icon="times" />
      </div>
    )
  }

  saveSubs() {
    this.props.updateSubs(this.state.updatedSubs, 'add');
  }

  render() {
    if(this.state.isOpen) {
      return (
        <div className="new-sub">
          {this.state.updatedSubs.map(this.displayInput.bind(this))}
          <button className="btn btn--add" onClick={this.addInput.bind(this)}><FontAwesomeIcon className="icon icon--add" icon="plus" /></button>
          <button className="btn btn--save" onClick={()=>this.saveSubs()}><FontAwesomeIcon className="icon icon--save" icon="check" /></button>
          <button className="btn btn--close" onClick={()=>this.openSettings()}>close</button>
        </div>
      );      
    } else {
      return <button className="settings-btn" onClick={()=>this.openSettings()}><FontAwesomeIcon className="icon" icon="cog" />Settings</button>
    }
  }
}

export default SettingsTab;
