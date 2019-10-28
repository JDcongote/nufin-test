import React from 'react';
import { connect } from 'react-redux';
import { ConferenceReducer } from 'redux-store/reducers/_conference-reducer';
import { TeamReducer } from 'redux-store/reducers/_team-reducer';
import { iConferencesState, iTeamsState, Team } from 'redux-store/_types';
import Item, { ItemData } from '../components/Common/Item';
import List, { ListItem } from '../components/Common/list';
import Filter, { tFilter } from '../components/Search/Filter';
import SearchBar from '../components/Search/SearchBar';
import TeamDetail from '../components/TeamDetail/TeamDetail';
import { filterTeams } from '../redux-store/actions';
import '../styles/components/TeamView.scss';

type Props = {
  teamStore: iTeamsState;
  conferenceStore: iConferencesState;
  dispatch: (fn: any) => void;
  onScroll: (event: React.UIEvent) => void;
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
    const teams = this.props.teamStore.filteredTeams.map(item => {
      const items: ItemData[] = [
        {
          id: 'school',
          name: item.school
        },
        {
          id: 'mascot',
          name: item.mascot
        },
        {
          id: 'conference',
          name: item.conference
        },
        {
          id: 'division',
          name: item.division
        }
      ];
      return {
        key: item.id.toString(),
        fragment: (
          <Item
            items={items}
            title={item.school}
            image={item.logos[0]}
            object={item}
            select={this.onSelectTeam.bind(this)}
          ></Item>
        )
      };
    });
    return teams;
  }

  createFilters(): tFilter[] {
    return this.props.conferenceStore.conferences.map(item => {
      return { id: item.abbreviation, name: item.name };
    });
  }

  render() {
    // if content not ready show loader
    if (this.state) {
      // set content and paging up
      let content = (
        <List items={this.createTeams()} onScroll={this.props.onScroll}></List>
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
          <Filter
            filters={this.createFilters()}
            onFilter={this.onSearchTeam.bind(this)}
            content={this.props.teamStore.teams}
            property="conference"
          ></Filter>

          {content}
        </React.Fragment>
      );
    } else {
      return <div>LOADER</div>;
    }
  }
}

export default connect(mapStateToProps)(TeamView);
