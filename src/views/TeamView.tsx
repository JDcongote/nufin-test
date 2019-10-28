import React from 'react';
import { connect } from 'react-redux';
import { ConferenceReducer } from 'redux-store/reducers/_conference-reducer';
import { TeamReducer } from 'redux-store/reducers/_team-reducer';
import { iConferencesState, iTeamsState, Team } from 'redux-store/_types';
import List, { ListItem } from '../components/List';
import Filtering, { tFacet } from '../components/Search/Filtering';
import SearchBar from '../components/Search/SearchBar';
import TeamItem from '../components/Team/TeamItem';
import TeamDetail from '../components/TeamDetail/TeamDetail';
import { filterTeams } from '../redux-store/actions';
import '../styles/components/TeamView.scss';

type Props = {
  teamStore: iTeamsState;
  conferenceStore: iConferencesState;
  dispatch: (fn: any) => void;
};
type State = {
  selectedTeam: Team | undefined;
  loading: boolean;
  conferenceReducer: typeof ConferenceReducer;
  teamReducer: typeof TeamReducer;
};

const mapStateToProps = (state: State) => ({
  teamStore: state.teamReducer,
  conferenceStore: state.conferenceReducer
});

class TeamView extends React.PureComponent<Props, State> {
  componentDidMount() {
    // reset filter state
    this.props.dispatch(filterTeams(this.props.teamStore.teams));
    this.setState({
      loading: true
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.teamStore.fetching !== this.props.teamStore.fetching) {
      this.setState({
        loading: false
      });
    }
  }

  /**
   * updates state when a team is selected
   */
  onSelectTeam(team: Team) {
    console.log('selected team: ' + team.school);
    this.setState({ selectedTeam: team });
  }

  onDeselectTeam() {
    this.setState({ selectedTeam: undefined });
  }

  onSearchTeam(filteredTeams: Team[]) {
    this.props.dispatch(filterTeams(filteredTeams));
  }

  onFilterTeams(filteredTeams: Team[]) {
    this.props.dispatch(filterTeams(filteredTeams));
  }

  createTeams(): ListItem[] {
    const teams = this.props.teamStore.filteredTeams.map(item => ({
      key: item.id.toString(),
      fragment: (
        <TeamItem team={item} select={this.onSelectTeam.bind(this)}></TeamItem>
      )
    }));
    return teams;
  }

  createFilterFacets(): tFacet[] {
    let confFacets = {
      id: 'conference',
      name: 'Conferences',
      facets: this.props.conferenceStore.conferences.map(item => {
        return {
          key: item.abbreviation + item.id,
          fragment: { name: item.name, id: item.abbreviation + item.id }
        };
      })
    };
    let divisionFacets = {
      id: 'division',
      name: 'Divisions',
      facets: [
        {
          key: 'Div1',
          fragment: { name: 'Division 1', id: 'Div1' }
        },
        {
          key: 'Div2',
          fragment: { name: 'Division 2', id: 'Div2' }
        }
      ]
    };
    return [confFacets, divisionFacets];
  }

  onScroll(event: React.UIEvent) {}

  render() {
    // if content not ready show loader
    if (this.state) {
      // set content and paging up
      let content = (
        <List items={this.createTeams()} onScroll={this.onScroll}></List>
      );
      if (this.state && this.state.selectedTeam) {
        content = (
          <TeamDetail
            team={this.state.selectedTeam}
            close={this.onDeselectTeam.bind(this)}
          ></TeamDetail>
        );
      }

      return (
        <React.Fragment>
          <SearchBar
            onSearch={this.onSearchTeam.bind(this)}
            content={this.props.teamStore.teams}
            property="school"
          ></SearchBar>

          {content}

          <Filtering
            facetGroups={this.createFilterFacets()}
            content={this.props.teamStore.filteredTeams}
            onFilter={this.onFilterTeams.bind(this)}
          ></Filtering>
        </React.Fragment>
      );
    } else {
      return <div>LOADER</div>;
    }
  }
}

export default connect(mapStateToProps)(TeamView);
