import {
  ActionTypes,
  FETCHING_CONFERENCES,
  FETCH_CONFERENCES,
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
      const conferences = [...state.conferences, ...action.payload.conferences];
      conferences.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return {
        conferences,
        fetching: false
      };
    }
    default:
      return state;
  }
}
