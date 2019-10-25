import {
  FETCHING_TEAMS,
  FETCHED_TEAMS,
  ActionTypes,
  iTeamsState
} from '../_types';

const initialState: iTeamsState = {
  teams: [],
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
        fetching: false
      };
    }
    default:
      return state;
  }
}
