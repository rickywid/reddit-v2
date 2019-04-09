import React, { Component } from 'react';
import fetchReddit from './services/fetchReddit';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
// import { Button } from './assets/styled-components/button';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { subreddits } from './data/data';
import { ReactComponent as RocketSVG } from './assets/icons/project.svg';
// import { ReactComponent as StarsSVG } from './assets/icons/falling-star.svg';

import {
  Form, Input, Icon, Button, notification
} from 'antd';

let id = 1;

library.add(faTimes);

const BodyWrapper = styled.div`
  padding: 1rem;
  overflow: hidden;
  
  @media (min-width: 500px) {
    padding: 2rem 4rem;  
  }
`

const NavBar = styled.nav`
  color: white;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
` 
const Card = styled.div`
  
  position: relative;
  background: #f60261;
  border-radius: 5px;
  box-shadow: 0 1px 7px 1px rgba(0,0,0,.4);
  margin-bottom: 3rem;
  flex-basis: 45%;

  @media (min-width: 500px) {
    margin-bottom: 0;
  }  
`
const CardHeader = styled.div`
  background: #250448 none repeat scroll 0% 0%;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px 0px rgba(0,0,0,.5);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  svg {
    height: 50px; 
    position: absolute;
    right: -49px;
    transform: rotate(-111deg); 
    top: 11px;

    @media (min-width: 500px) {
      right: 36px;
    }    
  }
`
const SubredditSuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
`
const SubredditSuggestions = styled.div`
  flex-grow: 1;
  flex-basis: 33%;
  padding: 0.5rem 0;
`
const SubredditCategory = styled.p`
  color: #f60261;
  font-weight: bold;
  margin: 0;
`
const SubredditList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;  
`
const SubredditItem = styled.li`
  :hover {
    color: #111;
    cursor: pointer;
  }
`
const SubredditSuggestHeader = styled.p`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`
const SubredditListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
`
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  padding: 1rem;
  background: white;
  border-radius: 5px;
  justify-content: space-between;
  
  @media (min-width: 900px) {
    flex-direction: row;
    padding: 4rem;
    border: 27px solid #250448;
      width: 1200px;
  }  
`
const SubsWrapper = styled.div`

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
        let { names } = values;
        names = names.filter(name=> name !== null || 'undefined');
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
      this.props.form.setFieldsValue({
        keys: [0],
      });
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

  renderList(list, key) {
    return (
      <SubredditSuggestions key={key}>
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

    getFieldDecorator('keys', {initialValue: [0]});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
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
          <Input placeholder="e.g: showerthoughts" style={{ width: '75%', marginRight: 8 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
            style={{fill: '#fdcb01'}}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <BodyWrapper>

        <NavBar>
          <p style={{margin: 0}}>reddit</p>
       
          {!this.state.showInitialSetup 
            ?           
            <SettingsTab  
              subreddits={JSON.parse(localStorage.getItem("subreddits"))} 
              updateSubs={this.updateSubReddit}
              form={this.props.form}
          /> : ""
        }
        </NavBar>

        {this.state.showInitialSetup 
          ? 
        <div className="animated fadeIn">
          <SectionWrapper style={{position: 'relative'}}>
            <Card>
              <CardHeader>
                <p className= "x" style={{fontWeight: 'bold', color: 'white', fontSize: '1.5rem', marginBottom: 0}}>Lets Get Started</p>
                <p style={{color: '#ccc', margin: 0, padding: 0, fontSize: 12}}>Start adding some of your favourite subreddits</p>
              </CardHeader>
                  <Form onSubmit={this.handleSubmit}>
                    {formItems}
                    <Form.Item style={{display: 'inline-block', marginRight: '1rem'}}>
                      <Button type="dashed" onClick={this.add}>
                        <Icon type="plus" /> Add Subreddit
                      </Button>
                    </Form.Item>
                    <Form.Item style={{display: 'inline-block'}}>
                      <Button htmlType="submit">Submit</Button>
                    </Form.Item>
                  </Form>
            </Card>
            <SubredditSuggestionsWrapper>
                <SubredditSuggestHeader>New to <a href="https://reddit.com">Reddit</a>? Explore some of the popular subreddits</SubredditSuggestHeader>
                <SubredditListWrapper>
                  {subreddits.map((list, index)=>this.renderList(list, index))}
                </SubredditListWrapper>
            </SubredditSuggestionsWrapper>
            <RocketSVG style={{position: 'absolute', right: -100, bottom: -50, height: 200, width: 'auto'}}/>    
          </SectionWrapper>
        </div>
          : 
        <div className="App">
          <SubsWrapper>
            {this.displaySubs()}
          </SubsWrapper>
        </div>
        }
      </BodyWrapper>
    )
  }
}

const AppWrapper = Form.create({ name: 'app' })(App);

export default AppWrapper;
