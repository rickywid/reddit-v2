import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCog, faPlus, faCheck, faTimes);


class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.saveSubs = this.saveSubs.bind(this);
    this.openSettings = this.openSettings.bind(this);

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

    this.setState({ isOpen: !this.state.isOpen });
  }

  handleChange(e) {

    const index = e.target.name;
    const value = e.target.value; 

    this.setState( prevState => {

      const state = { ...prevState };

      state['updatedSubs'][index] = value;

      return state;
    })
  }

  addInput() {

    this.setState( prevState => {

      const state = { ...prevState };

      state['updatedSubs'] = state['updatedSubs'].push('');

      return state;
    });
  }

  deleteInput(id) {

    this.setState( prevState => {

      const state = { ...prevState };

      state['updatedSubs'] = state['updatedSubs'].splice(id, 1);
  
      this.props.updateSubs(this.state.updatedSubs, 'delete')

      return state;
    });
  }

  displayInput(subreddit, key) {
    return (
      <div className="new-sub__wrap" key={key}>
        <label className="new-sub__label" >r/
          <input className="new-sub__input" name={key} value={subreddit} placeholder="subreddit" onChange={this.handleChange}/>
        </label>
        <FontAwesomeIcon onClick={this.deleteInput.bind(this, key)} className="icon icon--remove" icon="times" />
      </div>
    )
  }

  saveSubs() {
    this.setState({ isOpen: false });
    this.props.updateSubs(this.state.updatedSubs, 'add');
  }

  render() {
    if(this.state.isOpen) {
      return (
        <div className="new-sub">
          {this.state.updatedSubs.map(this.displayInput.bind(this))}
          <button className="btn btn--add" onClick={this.addInput}><FontAwesomeIcon className="icon icon--add" icon="plus" /></button>
          <button className="btn btn--save" onClick={this.saveSubs}><FontAwesomeIcon className="icon icon--save" icon="check" /></button>
          <button className="btn btn--close" onClick={this.openSettings}>close</button>
        </div>
      );      
    } else {
      return <button className="settings-btn" onClick={this.openSettings}><FontAwesomeIcon className="icon icon--cog" icon="cog" />Settings</button>
    }
  }
}

export default SettingsTab;
