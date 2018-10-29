import React, { Component } from 'react';

class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  openSettings() {
    console.log('calldded')
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { subreddits } = this.props;
    
    if(!subreddits) {
      return <div>...</div>
    }
    return (
      <div className={`settings-tab ${this.state.isOpen ? 'open' : ''}`}>
        <span onClick={()=>this.openSettings()} className="settings-tab__icon">O</span>
        {subreddits.map(subreddit=> <input value={subreddit}/>)}
        <button>Add</button>
        <button>Delete</button>
        <button>Save</button>
      </div>
    );
  }
}

export default SettingsTab;
