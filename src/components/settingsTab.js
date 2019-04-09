import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Drawer, Form, Icon, message } from 'antd';

library.add(faCog, faPlus, faCheck, faTimes);


class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.saveSubs = this.saveSubs.bind(this);

    this.state = {
      updatedSubs: [],
      visible: false
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    console.log('close')
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {

    this.setState({ updatedSubs: this.props.subreddits});
  }

  static getDerivedStateFromProps(nextProps, prevProps) {

    return { updatedSubs: nextProps.subreddits }
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
    }, ()=>{
      message.success('Removed');
    });
  }

  displayInput(subreddit, key) {
    return (
      <div className="new-sub__wrap" key={key}>
          <input className="new-sub__input animated fadeIn" style={{padding: '8px', marginBottom: '1rem', marginRight: '10px'}} name={key} value={subreddit} placeholder="subreddit" onChange={this.handleChange} required/>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={this.deleteInput.bind(this, key)}
          />
      </div>
    )
  }

  saveSubs() {
    this.setState({ visible: false }, () => {
      message.success('Updated');
      this.props.updateSubs(this.state.updatedSubs, 'add');
    });
  }

  render() {


    return (
      <div style={{lineHeight: 0}}>
        <Button style={{position: 'fixed', top: 47, right: '4rem'}} type="primary" onClick={this.showDrawer}>
          Manage
        </Button>
        <Drawer
          title="Manage Subreddits"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={'auto'}
          className="drawer"
        >
          {this.state.updatedSubs.map(this.displayInput.bind(this))}
            <Form.Item style={{display: 'inline-block', marginRight: '1rem'}}>
              <Button type="dashed" onClick={this.addInput}>
                <Icon type="plus" /> Add Subreddit
              </Button>
            </Form.Item>
            <Form.Item style={{display: 'inline-block'}}>
              <Button type="primary" onClick={this.saveSubs}>Submit</Button>
            </Form.Item>          
        </Drawer>
      </div>        
    );      
  }
}

export default SettingsTab;
