import React from 'react';
import { connect } from 'react-redux';
import { iTeamDetailState, RosterDetail, Team } from 'redux-store/_types';
import { fetchedTeamDetail } from '../../redux-store/actions/';
import { thunkFetchTeamDetail } from '../../thunks';
import Button from '../Common/Button';
import List, { ListItem } from '../Common/list';
import './TeamDetail.scss';

type TeamDetailProps = {
  team: Team;
  close: () => void;
  teamDetail: iTeamDetailState;
  thunkFetchTeamDetail: any;
  loading: boolean;
};
type TeamDetailState = {
  teamDetail: RosterDetail[];
  teamDetailReducer: iTeamDetailState;
  loading: boolean;
  scrolled: boolean;
};

const positionAbbreviations: any[string] = {
  QB: 'Quarterback',
  RB: 'Running Back',
  FB: 'Fullback',
  WR: 'Wide Receiver',
  TE: 'Tight End',
  OL: 'Offensive Lineman',
  C: 'Center',
  G: 'Guard',
  LG: 'Left Guard',
  RG: 'Right Guard',
  T: 'Tackle',
  LT: 'Left Tackle',
  RT: 'Right Tackle',
  K: 'Kicker',
  KR: 'Kick Returner',
  DL: 'Defensive Lineman',
  DE: 'Defensive End',
  DT: 'Defensive Tackle',
  NT: 'Nose Tackle',
  LB: 'Linebacker',
  ILB: 'Inside Linebacker',
  OLB: 'Outside Linebacker',
  MLB: 'Middle Linebacker',
  DB: 'Defensive Back',
  CB: 'Cornerback',
  FS: 'Free Safety',
  SS: 'Strong Safety',
  S: 'Safety',
  P: 'Punter',
  PR: 'Punt Returner'
};

/**
 * Link store state as props
 * @param state
 */
const mapStateToProps = (state: TeamDetailState) => ({
  teamDetail: state.teamDetailReducer,
  loading: state.teamDetailReducer.fetching
});

class TeamDetail extends React.PureComponent<TeamDetailProps, TeamDetailState> {
  componentDidMount() {
    this.props.thunkFetchTeamDetail(this.props.team.school);
  }

  handleClick() {
    this.props.close();
  }
  createPlayers(): ListItem[] {
    return this.props.teamDetail.teamDetail.map((item: RosterDetail) => ({
      key: item.first_name + item.last_name + item.id.toString(),
      fragment: (
        <div className="team-detail__player-card">
          <aside></aside>
          <table className="player-card__data">
            <tbody>
              <tr className="data__row">
                <td>Player:</td>
                <td>
                  {item.first_name} {item.last_name}
                </td>
              </tr>
              <tr className="data__row">
                <td>Weight:</td>
                <td>{item.weight} pounds</td>
              </tr>
              <tr className="data__row">
                <td>Height:</td>
                <td>{(item.height / 12).toFixed(1)} feet</td>
              </tr>
              <tr className="data__row">
                <td>Position:</td>
                <td>{positionAbbreviations[item.position]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }));
  }

  render() {
    let button = (
      <Button
        text={'Back'}
        floating={'bottom bottom-left'}
        context={this.props.team}
        onClick={this.handleClick.bind(this)}
      ></Button>
    );
    if (this.props.loading) {
      return <div>LOADING</div>;
    } else if (
      this.props.teamDetail &&
      this.props.teamDetail.teamDetail.length === 0
    ) {
      return (
        <React.Fragment>
          <div className="team-detail--empty">NO DATA</div>
          {button}
        </React.Fragment>
      );
    } else {
      return (
        <div className="team-detail">
          <h2 className="team-detail__title">
            {this.props.team.school} Roster
            <span
              className="title__highlight"
              style={{ backgroundColor: this.props.team.color }}
            ></span>
          </h2>
          <List items={this.createPlayers()}></List>
          {button}
        </div>
      );
    }
  }
}

// connect context provider to State store
export default connect(
  mapStateToProps,
  { fetchedTeamDetail, thunkFetchTeamDetail }
)(TeamDetail);
