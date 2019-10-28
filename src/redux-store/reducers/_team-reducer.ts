import {
  FETCHING_TEAMS,
  FETCHED_TEAMS,
  FILTER_TEAMS,
  ActionTypes,
  iTeamsState
} from '../_types';

const initialState: iTeamsState = {
  teams: [],
  filteredTeams: [],
  fetching: false
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
      return {
        teams: [...state.teams, ...action.payload.teams],
        filteredTeams: [...state.teams, ...action.payload.teams],
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
