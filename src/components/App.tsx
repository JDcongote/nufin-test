import React from 'react';
import { AppState } from '../redux-store';
import { fetchedTeams } from '../redux-store/actions/';
import { thunkFetchTeams } from '../thunks';
import '../styles/index.scss';
import { connect } from 'react-redux';

interface Props {
  thunkFetchTeams: any;
}

const mapStateToProps = (state: AppState) => ({
  teams: state.teamReducer
});

class App extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.thunkFetchTeams();
  }
  render() {
    return <div className="app"> </div>;
  }
}

export default connect(
  mapStateToProps,
  { fetchedTeams, thunkFetchTeams }
)(App);
