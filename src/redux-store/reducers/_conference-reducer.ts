import {
  FETCHING_CONFERENCES,
  FETCH_CONFERENCES,
  ActionTypes,
  iConferencesState
} from '../_types';

const initialState: iConferencesState = {
  conferences: [],
  fetching: false
};

export function ConferenceReducer(
  state = initialState,
  action: ActionTypes
): iConferencesState {
  switch (action.type) {
    case FETCHING_CONFERENCES: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_CONFERENCES: {
      return {
        conferences: [...state.conferences, ...action.payload.conferences],
        fetching: false
      };
    }
    default:
      return state;
  }
}
