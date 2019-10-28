import {
  iTeamsState,
  iConferencesState,
  FETCHING_CONFERENCES,
  FETCH_CONFERENCES,
  FETCHING_TEAMS,
  FETCHED_TEAMS,
  NETWORK_ERROR,
  ActionTypes,
  Error,
  iErrorState,
  FILTER_TEAMS,
  Team
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

export function filterTeams(filteredTeams: Team[]): ActionTypes {
  return {
    type: FILTER_TEAMS,
    payload: filteredTeams
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

export function networkError(error: iErrorState): Error {
  return {
    type: NETWORK_ERROR,
    payload: error
  };
}
