import React from 'react';
import { connect } from 'react-redux';
import { ConferenceReducer } from 'redux-store/reducers/_conference-reducer';
import { TeamReducer } from 'redux-store/reducers/_team-reducer';
import { iConferencesState, iTeamsState, Team } from 'redux-store/_types';
import Button from '../components/Common/Button';
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

/**
 * Shows teams with their data
 */
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
    this.setState({ selectedTeam: team });
  }

  /**
   * when we deselect a team go back to the full list
   */
  onDeselectTeam() {
    this.setState({ selectedTeam: undefined });
  }

  /**
   * when the search component is used dispatch the filter action to save the
   * filtered items in the store
   * @param filteredTeams
   */
  onSearchTeam(filteredTeams: Team[]) {
    this.props.dispatch(filterTeams(filteredTeams));
  }

  /**
   * when the filter component is used dispatch the filter action to save the
   * filtered items in the store
   * @param filteredTeams
   */
  onFilterTeams(filteredTeams: Team[]) {
    this.props.dispatch(filterTeams(filteredTeams));
  }

  /**
   * build the representation of the team data for the components to use
   */
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
            highlightColor={item.color}
            button={
              <Button
                onClick={this.onSelectTeam.bind(this)}
                context={item}
                text="Details"
              ></Button>
            }
          ></Item>
        )
      };
    });
    return teams;
  }

  /**
   * Create the filter facets
   */
  createFilters(): tFilter[] {
    return this.props.conferenceStore.conferences.map(item => {
      return { id: item.abbreviation, name: item.name };
    });
  }

  render() {
    // if content not ready show loader
    if (this.state) {
      // set content and paging up
      let content = <List items={this.createTeams()}></List>;
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
          <div className="filter-utils">
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
          </div>

          {content}
        </React.Fragment>
      );
    } else {
      return <div>LOADER</div>;
    }
  }
}

export default connect(mapStateToProps)(TeamView);
