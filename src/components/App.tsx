import React from 'react';
import { connect } from 'react-redux';
import {
  Conference,
  iConferencesState,
  iTeamsState,
  iErrorState
} from 'redux-store/_types';
import { AppState } from '../redux-store';
import { fetchedConferences, fetchedTeams } from '../redux-store/actions/';
import '../styles/index.scss';
import { thunkFetchConferences, thunkFetchTeams } from '../thunks';
import ConferenceView from '../views/ConferenceView';
import TeamView from '../views/TeamView';
import Header from './Header/Header';

type Props = {
  thunkFetchTeams: any;
  thunkFetchConferences: any;
  teams: iTeamsState;
  conferences: iConferencesState;
  loading: boolean;
  error: iErrorState;
};

/**
 * Link store state as props
 * @param state
 */
const mapStateToProps = (state: AppState) => ({
  teams: state.teamReducer,
  conferences: state.conferenceReducer,
  error: state.appReducer,
  loading: state.teamReducer.fetching || state.conferenceReducer.fetching
});

/**
 * Main App component, I didn't think it necessary to include react-router, as this should be a pretty straightforward app
 * with not that much screens/pages
 */
class App extends React.PureComponent<Props> {
  state = {
    conferences: [],
    teams: [],
    page: 'teams',
    error: { message: '', reason: '' }
  };
  menuItems = [
    { name: 'Teams', id: 'teams' },
    { name: 'Conferences', id: 'conferences' }
  ];
  unloadedConferences: { [id: string]: boolean } = {};

  componentDidMount() {
    this.props.thunkFetchConferences();
  }

  /**
   * Given a collection of conferences, fetch all teams belonging to them.
   * @param conferences
   */
  fetchFirstTeams(conferences: Conference[]) {
    delete this.unloadedConferences[conferences[0].abbreviation];
    this.props.thunkFetchTeams(conferences[0].abbreviation);
  }

  fetchNextConferenceTeams() {
    debugger;
    const key = Object.keys(this.unloadedConferences)[0];
    delete this.unloadedConferences[key];
    this.props.thunkFetchTeams(key);
  }

  fetchTeamsByConference(conference: string) {}

  onTeamListSCroll(event: React.UIEvent<HTMLUListElement>) {
    if (
      event.target.scrollHeight - event.target.scrollTop < 1000 &&
      !this.props.loading
    ) {
      this.fetchNextConferenceTeams();
    }
  }

  /**
   * Update app after fetching teams
   * @param prevProps
   */
  componentDidUpdate(prevProps: Props) {
    if (
      this.props.conferences.conferences !== prevProps.conferences.conferences
    ) {
      this.props.conferences.conferences.forEach(
        conf => (this.unloadedConferences[conf.abbreviation] = true)
      );
      //TODO: perhaps load images as well when fetching teams?
      this.fetchFirstTeams(this.props.conferences.conferences);
      this.setState({ conferences: this.props.conferences.conferences });
    }

    if (this.props.teams.teams !== prevProps.teams.teams) {
      this.setState({ teams: this.props.teams.teams });
    }

    if (this.props.error !== prevProps.error) {
      this.setState({ error: this.props.error });
    }
  }

  changePage(item: any) {
    this.setState({ page: item.id });
  }

  render() {
    let content;
    if (this.props.loading && !this.state.error) {
      //TODO: create loader component
      content = <div>LOADING</div>;
    } else if (this.state.error.message) {
      //TODO: make pretty
      content = (
        <div className="app__error">
          A {this.state.error.message.toUpperCase()} HAS OCCURRED
        </div>
      );
    } else {
      content = (
        <React.Fragment>
          <Header
            items={this.menuItems}
            pageTitle={this.state.page}
            onMenuClick={this.changePage.bind(this)}
          ></Header>
          {this.state.page === 'teams' && (
            <TeamView onScroll={this.onTeamListSCroll.bind(this)}></TeamView>
          )}
          {this.state.page === 'conferences' && (
            <ConferenceView
              conferences={this.state.conferences}
            ></ConferenceView>
          )}
        </React.Fragment>
      );
    }
    return (
      <div className={this.state.error.message ? 'app app--errored' : 'app'}>
        {content}
      </div>
    );
  }
}

// connect context provider to State
export default connect(
  mapStateToProps,
  { fetchedTeams, fetchedConferences, thunkFetchTeams, thunkFetchConferences }
)(App);
