import {
  iTeamsState,
  iConferencesState,
  FETCHING_CONFERENCES,
  FETCH_CONFERENCES,
  FETCHING_TEAMS,
  FETCHED_TEAMS,
  ActionTypes
} from '../_types';

export function fetchingTeams(): ActionTypes {
  return {
    type: FETCHING_TEAMS
  };
}

export function fetchedTeams(teams: iTeamsState): ActionTypes {
  return {
    type: FETCHED_TEAMS,
    payload: teams
  };
}

export function fetchingConferences(): ActionTypes {
  return {
    type: FETCHING_CONFERENCES
  };
}

export function fetchedConferences(
  conferences: iConferencesState
): ActionTypes {
  return {
    type: FETCH_CONFERENCES,
    payload: conferences
  };
}
