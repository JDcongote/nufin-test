import {
  ActionTypes,
  Error,
  FETCHED_TEAMS,
  FETCHING_CONFERENCES,
  FETCHING_TEAMS,
  FETCHING_TEAM_DETAIL,
  FETCH_CONFERENCES,
  FETCH_TEAM_DETAIL,
  FILTER_TEAMS,
  iConferencesState,
  iErrorState,
  iTeamDetailState,
  iTeamsState,
  NETWORK_ERROR,
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

export function fetchingTeamDetail(): ActionTypes {
  return {
    type: FETCHING_TEAM_DETAIL
  };
}

export function fetchedTeamDetail(teamDetail: iTeamDetailState): ActionTypes {
  return {
    type: FETCH_TEAM_DETAIL,
    payload: teamDetail
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
