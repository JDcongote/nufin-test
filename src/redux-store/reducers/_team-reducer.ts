import {
  ActionTypes,
  FETCHED_TEAMS,
  FETCHING_TEAMS,
  FETCHING_TEAM_DETAIL,
  FETCH_TEAM_DETAIL,
  FILTER_TEAMS,
  iTeamDetailState,
  iTeamsState
} from '../_types';

const initialState = {
  teams: [],
  filteredTeams: [],
  fetching: false,
  teamDetail: []
};

export function TeamReducer(
  state = initialState,
  action: ActionTypes
): iTeamsState {
  switch (action.type) {
    case FETCHING_TEAMS: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCHED_TEAMS: {
      const teams = [...state.teams, ...action.payload.teams];
      teams.sort((a, b) => {
        if (a.school < b.school) {
          return -1;
        }
        if (a.school > b.school) {
          return 1;
        }
        return 0;
      });
      return {
        teams: teams,
        filteredTeams: teams,
        fetching: false
      };
    }
    case FILTER_TEAMS: {
      return {
        teams: [...state.teams],
        filteredTeams: [...action.payload],
        fetching: false
      };
    }
    default:
      return state;
  }
}

const initialDetailState = {
  teamDetail: [],
  fetching: false
};

export function TeamDetailReducer(
  state = initialDetailState,
  action: ActionTypes
): iTeamDetailState {
  switch (action.type) {
    case FETCHING_TEAM_DETAIL: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_TEAM_DETAIL: {
      return {
        teamDetail: action.payload.teamDetail,
        fetching: false
      };
    }
    default:
      return state;
  }
}
