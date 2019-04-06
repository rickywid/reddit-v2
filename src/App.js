import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
// import { Button } from './assets/styled-components/button';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled, { css } from 'styled-components';
import { subreddits } from './data/data';


import {
  Form, Input, Icon, Button, notification
} from 'antd';

let id = 0;

library.add(faTimes);

const HeaderWrapper = styled.div`
  text-align: center;
`
const Card = styled.div`
  flex: 1;
`
const SubredditSuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  align-self: flex-start;
`
const SubredditSuggestions = styled.div`
  flex-grow: 1;
  flex-basis: 33%;
  padding: 0.5rem 0;
`
const SubredditCategory = styled.p`
  color: red;
  font-weight: bold;
`
const SubredditList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;  
`
const SubredditItem = styled.li`
  list-item: none;
  :hover {
    color: #111;
    cursor: pointer;
  }
`
const SubredditSuggestHeader = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  margin: 0 auto;
  margin-top: 6rem;
  background: #f9f9f9;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  padding: 2rem;
`

const openNotificationWithIcon = (type, label, sub, description) => {
  notification[type]({
    message: `${label}`,
    description: <div dangerouslySetInnerHTML={{__html: `<p>${description}</p><a target="_blank" href='https://reddit.com/r/${sub}'>Preview</a>`}} />
  });
};

class App extends Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    // this.addSubReddit = this.addSubReddit.bind(this);
    this.updateSubReddit = this.updateSubReddit.bind(this);

    this.state = {
      subreddits: [],
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

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        localStorage.setItem("subreddits", JSON.stringify(names));
        this.setState({ 
          subreddits: names,
          showInitialSetup: false
        }, ()=> { 
          this.getData(this.state.subreddits)
          }
        );
      }
    });
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
        subreddits: [] 
      });
    
    return;
    
    } 

    // if local storage has data then update local storage and fetch data
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

  // addSubReddit(sub) {

  //   this.setState({ subreddits: [...this.state.subreddits, sub]}, () => console.log(this.state.subreddits))
  // }

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

  renderList(list) {
    return (
      <SubredditSuggestions>
        <SubredditCategory>{list.category_name}</SubredditCategory>
        <SubredditList>
          {list.subreddit.map((sub, index) => {
            return (
              <SubredditItem key={`${sub}${index}`} onClick={() => openNotificationWithIcon('info', sub.label, sub.sub, sub.description)}>{sub.sub}</SubredditItem>
            )
          })}   
        </SubredditList>
      </SubredditSuggestions>
    )
  }

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', { initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'r/' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Required",
          }],
        })(
          <Input placeholder="e.g: showerthoughts" style={{ width: '60%', marginRight: 8 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <div style={{ padding: '2rem'}}>

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
          <SectionWrapper>
            <Card>
              <h2>Start adding some of your favourite subreddits</h2>
                  <Form onSubmit={this.handleSubmit}>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                      <Button type="dashed" onClick={this.add}>
                        <Icon type="plus" /> Add field
                      </Button>
                    </Form.Item>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                      <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                  </Form>
              <div>





              



              </div>
            </Card>
            <SubredditSuggestionsWrapper>
                <SubredditSuggestHeader>New Reddit? Explore some of the popular subreddits</SubredditSuggestHeader>
                {subreddits.map((list)=>this.renderList(list))}
            </SubredditSuggestionsWrapper>      
          </SectionWrapper>













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

const AppWrapper = Form.create({ name: 'app' })(App);

export default AppWrapper;
