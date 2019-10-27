import React from 'react';
import { Team, Conference } from 'redux-store/_types';
import List, { ListItem } from '../components/List';
import Filtering from '../components/Search/Filtering';
import { PartialFacet } from '../components/Search/Filtering';
import SearchBar from '../components/Search/SearchBar';
import TeamItem from '../components/Team/TeamItem';
import TeamDetail from '../components/TeamDetail/TeamDetail';
import '../styles/components/TeamView.scss';

type Props = {
  teams: Team[];
  conferences: Conference[];
};
type State = {
  selectedTeam: Team | undefined;
  teams: ListItem[];
  scrolledList: boolean;
  facets: PartialFacet[];
};

class TeamView extends React.PureComponent<Props, State> {
  state = {
    selectedTeam: undefined,
    teams: [],
    facets: [],
    scrolledList: false
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.teams !== this.props.teams) {
      const teams = this.createTeams(this.props.teams);
      const facets = this.createFilterFacets();
      this.setState({ teams: teams, facets: facets });
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
    this.setState({ teams: filteredTeams });
  }

  createTeams(teamList: Team[]): ListItem[] {
    const teams = teamList.map(item => ({
      key: item.id.toString(),
      fragment: (
        <TeamItem team={item} select={this.onSelectTeam.bind(this)}></TeamItem>
      )
    }));

    return teams;
  }

  createFilterFacets(): PartialFacet[] {
    let confFacets = {
      id: 'Conferences',
      facets: this.props.conferences.map(item => {
        return {
          key: item.abbreviation + item.id,
          fragment: { name: item.name, id: item.abbreviation + item.id }
        };
      })
    };
    let divisionFacets = {
      id: 'Divisions',
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

  onScroll(event: React.UIEvent) {
    //this.setState(scroll)
  }

  render() {
    //if content not ready show loader
    if (this.state) {
      //set content and paging up
      let content = (
        <List items={this.state.teams} onScroll={this.onScroll}></List>
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
            content={this.props.teams}
            property="school"
          ></SearchBar>
          {content}
          <Filtering
            facetGroups={this.state.facets}
            content={this.props.teams}
          ></Filtering>
        </React.Fragment>
      );
    } else {
      return <div>LOADER</div>;
    }
  }
}

export default TeamView;
