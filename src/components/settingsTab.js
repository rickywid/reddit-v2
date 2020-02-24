import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faPlus,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Drawer,
  Form,
  Icon,
  message,
  Dropdown,
  Menu,
} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

library.add(faCog, faPlus, faCheck, faTimes);

const ManageButton = styled(Button)`
  margin-right: 20px;
`;

class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.saveSubs = this.saveSubs.bind(this);

    this.state = {
      updatedSubs: [],
      visible: false,
    };
  }

  componentDidMount() {
    const { subreddits } = this.props;
    this.setState({ updatedSubs: subreddits });
  }

  static getDerivedStateFromProps(nextProps) {
    return { updatedSubs: nextProps.subreddits };
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange(e) {
    const { name, value } = e.target;

    this.setState((prevState) => {
      const state = { ...prevState };

      state.updatedSubs[name] = value;

      return state;
    });
  }

  addInput() {
    this.setState((prevState) => {
      const state = { ...prevState };

      state.updatedSubs = state.updatedSubs.push('');

      return state;
    });
  }

  deleteInput(id) {
    const { updateSubs } = this.props;
    this.setState((prevState) => {
      const state = { ...prevState };
      state.updatedSubs.splice(id, 1);
      updateSubs(state.updatedSubs, 'delete');

      return state;
    }, () => {
      message.success('Removed');
    });
  }

  displayInput(subreddit, key) {
    return (
      <div key={key} style={{ zIndex: 1, position: 'relative' }}>
        <input className="new-sub__input animated fadeIn" style={{ padding: '8px', marginBottom: '1rem', marginRight: '10px' }} name={key} value={subreddit} placeholder="subreddit" onChange={this.handleChange} required />
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.deleteInput(key)}
        />
      </div>
    );
  }

  saveSubs() {
    const { updatedSubs } = this.state;
    const { updateSubs } = this.props;
    this.setState({ visible: false }, () => {
      message.success('Updated');
      updateSubs(updatedSubs, 'add');
    });
  }

  render() {
    const { visible, updatedSubs } = this.state;

    const menu = (
      <Menu>
        {
        updatedSubs.map((sub, i) => (
          <Menu.Item key={i}>
            <a href={`#${sub}`}>{sub}</a>
          </Menu.Item>
        ))
        }
      </Menu>
    );

    return (
      <div style={{ lineHeight: 0 }}>
        <ManageButton className="manage-btn" type="primary" onClick={this.showDrawer}>
          Manage
        </ManageButton>
        <Dropdown overlay={menu}>
          <Button type="primary">
            My List
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Drawer
          title="Manage Subreddits"
          placement="right"
          closable
          onClose={this.onClose}
          visible={visible}
          width="auto"
          className="drawer"
        >
          {updatedSubs.map(this.displayInput.bind(this))}
          <Form.Item style={{ display: 'inline-block', marginRight: '1rem', zIndex: 1 }}>
            <Button type="dashed" onClick={this.addInput}>
              <Icon type="plus" />
              Add Subreddit
            </Button>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', zIndex: 1 }}>
            <Button type="primary" onClick={this.saveSubs}>Submit</Button>
          </Form.Item>
        </Drawer>
      </div>
    );
  }
}

SettingsTab.propTypes = {
  subreddits: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
    .isRequired,
  updateSubs: PropTypes.func.isRequired,
};

export default SettingsTab;
