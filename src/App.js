import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  Form, Input, Icon, Button, notification, message,
} from 'antd';
import PropTypes from 'prop-types';
import SubReddit from './components/subReddit';
import SettingsTab from './components/settingsTab';
import FetchReddit from './services/fetchReddit';
import { ReactComponent as UploadIcon } from './assets/icons/upload.svg';
import { ReactComponent as CubesIcon } from './assets/icons/cubes.svg';
import { ReactComponent as LayersIcon } from './assets/icons/layers.svg';
import { ReactComponent as PuzzleIcon } from './assets/icons/puzzle.svg';
import { ReactComponent as CircleIcon } from './assets/icons/circle.svg';

let id = 1;

library.add(faTimes);

const BodyWrapper = styled.div`
  overflow: hidden;
`;
const NavBar = styled.nav`
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background: #201f30;
  border-bottom: 1px solid #36344e;
  padding: 0.5rem 2rem;
  position: fixed;
  width: 100%;
  z-index: 1;

  @media (min-width: 900px) {
    padding: 0.5rem 4rem;
  }  
`;
const NavbarLogo = styled.div`
  display: flex;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  background: #24c7df6e;
  // border-radius: 5px;
  // box-shadow: 0 1px 7px 1px rgba(0,0,0,.4);
  margin-bottom: 3rem;
  flex: 1;
  display: flex;

  @media (min-width: 500px) {
    margin-bottom: 0;
  }  
`;
const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const RightColumn = styled.div`
  display: flex;
  flex: 1;
`;
const RightColumnInner = styled.div`
  margin: auto;
  align-items: center;
  padding: 3rem;

  @media (min-width: 500px) {
    padding: 14rem;
  }
`;
const SubredditSuggestions = styled.div`
  flex-grow: 1;
  flex-basis: 33%;
  padding: 0.5rem 0;
`;
const SubredditCategory = styled.p`
  color: #f60261;
  font-weight: bold;
  margin: 0;
`;
const SubredditList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;  
`;
const SubredditItem = styled.li`
  :hover {
    color: #111;
    cursor: pointer;
  }
`;

const SubsWrapper = styled.div``;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  position: fixed;
  bottom: 20px;
  right 20px;
}
`;

const UploadIconStyle = styled(UploadIcon)`
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const LayersIconStyle = styled(LayersIcon)`
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const CubesIconStyle = styled(CubesIcon)`
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const PuzzleIconStyle = styled(PuzzleIcon)`
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const CircleIconStyle = styled(CircleIcon)`
  height: 25px;
  cursor: pointer;
  margin-right: 0.5rem;
`;


const Main = styled.div`
  padding: 2rem;

  @media (min-width: 900px) {
    padding: 4rem;
  }  
`;

const LandingPage = styled.div`
  height: 100vh;
  display: flex;
  padding-top: 53px;

  flex-direction: column;
  width: auto;
  // margin: 0 auto;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  // padding: 1rem;
  background: white;
  // border-radius: 5px;
  justify-content: space-between;
  position: relative;
  flex: 1;
  
  @media (min-width: 900px) {
    flex-direction: row;
    // padding: 4rem;
    // border: 27px solid #250448;
    // width: 1200px;
  }  
`;
const FeaturesList = styled.ul`
  padding: 0;
  margin-top: 3rem;
`;
const FeaturesListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;

  svg {
    margin-right: 1rem;
  }

  p {
    margin: 0;
  }
`;
const openNotificationWithIcon = (type, label, sub, description) => {
  notification[type]({
    message: `${label}`,
    description: <div dangerouslySetInnerHTML={{ __html: `<p>${description}</p><a target="_blank" href='https://reddit.com/r/${sub}'>Preview</a>` }} />,
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
      invalidSubreddits: [],
      subredditsData: [], // JSON data
      showInitialSetup: true,
      sidebarIsOpen: false,
    };
  }

  componentDidMount = () => {
    // if there is already saved data in local storage, bypass initial screen
    // if local storage is empty or not items set then show initial screen
    if (JSON.parse(localStorage.getItem('subreddits')) !== null) {
      this.setState({ showInitialSetup: false }, () => this.getData());
    }
  }

  async getData() {
    const subs = JSON.parse(localStorage.getItem('subreddits'));
    const fetch = new FetchReddit();
    const data = await fetch.getData(subs);
    this.setState({ subredditsData: this.validateSubs(data) });

    if (this.state.invalidSubreddits.length) message.error('Some subreddits could not be loaded');
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
    id += 1;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    const { form } = this.props;
    const { subreddits } = this.state;
    const { validateFields } = form;

    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        let { names } = values;
        names = names.filter(name => name !== null || 'undefined');
        localStorage.setItem('subreddits', JSON.stringify(names));
        this.setState({
          subreddits: names,
          showInitialSetup: false,
        }, () => {
          this.getData(subreddits);
        });
      }
    });
  }

  validateSubs = (subs) => {
    const validSubs = subs.filter(sub => sub !== undefined);
    this.setState({
      invalidSubreddits: subs.filter(sub => sub === undefined),
    });
    return validSubs;
  }

  updateSubReddit = (updatedSubs, type) => {
    const {
      form: {
        setFieldsValue,
      },
    } = this.props;

    // if local storage is empty, show initial screen & reset state
    if (type === 'delete' && updatedSubs.length === 0) {
      localStorage.removeItem('subreddits');
      setFieldsValue({
        keys: [0],
      });
      this.setState({
        showInitialSetup: true,
        subreddits: [],
      });
      return;
    }

    // if local storage has data then update local storage and fetch data
    localStorage.setItem('subreddits', JSON.stringify(updatedSubs));

    this.setState({
      showInitialSetup: false,
    }, () => {
      this.getData(JSON.parse(localStorage.getItem('subreddits')));
    });
  }

  handleChange = (e) => {
    const { index, value } = e.target.value;

    this.setState((prevState) => {
      const state = { ...prevState };

      state.subreddits[index] = value;
      return state;
    });
  }

  displaySubs = () => {
    const { subredditsData } = this.state;
    return JSON.parse(localStorage.getItem('subreddits')).map((subreddit, key) => (
      <SubReddit
        key={subreddit}
        id={subreddit}
        data={subredditsData[key]}
        data2={JSON.parse(localStorage.getItem('subreddits'))}
      />
    ));
  }

  renderList = list => (
    <SubredditSuggestions key={`${list}-${Math.random()}`}>
      <SubredditCategory>{list.category_name}</SubredditCategory>
      <SubredditList>
        {list.subreddit.map((sub, key) => (
          <SubredditItem key={key} onClick={() => openNotificationWithIcon('info', sub.label, sub.sub, sub.description)}>{sub.sub}</SubredditItem>
        ))}
      </SubredditList>
    </SubredditSuggestions>
  );

  render = () => {
    const {
      form: {
        getFieldDecorator,
        getFieldValue,
      },
    } = this.props;
    const { form } = this.props;

    const { showInitialSetup } = this.state;

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map(k => (
      <Form.Item
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: 'Required',
          }],
        })(
          <Input placeholder="e.g: showerthoughts" style={{ width: '88%', marginRight: 8 }} />,
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
            style={{ fill: '#fdcb01' }}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <BodyWrapper id="top">
        <NavBar>
          <NavbarLogo>
            <CircleIconStyle />
            <p style={{ margin: 0 }}>dash</p>
          </NavbarLogo>
          {!showInitialSetup ? (
            <SettingsTab
              subreddits={JSON.parse(localStorage.getItem('subreddits'))}
              updateSubs={this.updateSubReddit}
              form={form}
            />
          ) : ''
          }
        </NavBar>

        {showInitialSetup ? (
          <LandingPage className="animated fadeIn">
            <Card>
              <CardInner>
                <h2 style={{ marginBottom: '2rem' }}>Let&apos;s Begin.</h2>
                <Form onSubmit={this.handleSubmit}>
                  {formItems}
                  <Form.Item style={{ display: 'inline-block', marginRight: '1rem' }}>
                    <Button type="dashed" onClick={this.add}>
                      <Icon type="plus" />
                      New
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ display: 'inline-block' }}>
                    <Button htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
                <small>
                  Are you new to Reddit? View their&nbsp;
                  <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">website</a>
                </small>
              </CardInner>
            </Card>
            <RightColumn>
              <RightColumnInner>
                <h2 style={{ fontWeight: 'bolder', fontSize: '32px' }}>Discover today&apos;s discussion</h2>
                <p>Stay up to date with the latest news and discussions by adding your favourite subreddits.</p>
                <FeaturesList>
                  <FeaturesListItem>
                    <LayersIconStyle />
                    <p>View your favourite subreddits</p>
                  </FeaturesListItem>
                  <FeaturesListItem>
                    <CubesIconStyle />
                    <p>Customize and manage your list</p>
                  </FeaturesListItem>
                  <FeaturesListItem>
                    <PuzzleIconStyle />
                    <p>Fast, easy and convenient</p>
                  </FeaturesListItem>
                </FeaturesList>
              </RightColumnInner>
            </RightColumn>
          </LandingPage>
        )
          : (
            <Main>
              <SubsWrapper>
                {this.displaySubs()}
              </SubsWrapper>
              <BottomWrapper>
                <a href="#top"><UploadIconStyle /></a>
              </BottomWrapper>
            </Main>
          )
        }
      </BodyWrapper>
    );
  }
}

App.propTypes = {
  form: PropTypes.shape({
    setFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
};

/*
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
*/

const AppWrapper = Form.create({ name: 'app' })(App);

export default AppWrapper;
