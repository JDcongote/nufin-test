import React from 'react';
import { Conference } from 'redux-store/_types';
import ConferenceItem from '../components/Conference/ConferenceItem';
import List from '../components/List';

type Props = {
  conferences: Conference[];
};

class ConferenceView extends React.PureComponent<Props> {
  createConferences() {
    return this.props.conferences.map(item => ({
      key: item.id,
      fragment: <ConferenceItem conference={item}></ConferenceItem>
    }));
  }
  render() {
    return (
      <React.Fragment>
        <h1>Conferences</h1>
        <List items={this.createConferences()}></List>
      </React.Fragment>
    );
  }
}

export default ConferenceView;
