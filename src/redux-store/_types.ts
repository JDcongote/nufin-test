// Standard Redux type initialization
export const FETCHING_CONFERENCES = 'FETCHING_CONFERENCES';
export const FETCH_CONFERENCES = 'FETCH_CONFERENCES';
export const FETCHING_TEAMS = 'FETCHING_TEAMS';
export const FETCHED_TEAMS = 'FETCHED_TEAMS';
export const FILTER_TEAMS = 'FILTER_TEAMS';
export const FETCH_TEAM_DETAIL = 'FETCH_TEAM_DETAIL';
export const FETCHING_TEAM_DETAIL = 'FETCHING_TEAM_DETAIL';
export const FETCH_BY_CONFERENCE_ONLY = 'FETCH_BY_CONFERENCE_ONLY';

export const NETWORK_ERROR = 'NETWORK_ERROR';

// state types for type checking
export type iTeamsState = {
  teams: Team[];
  filteredTeams: Team[];
  conference?: string;
  fetching: boolean;
};

export type iTeamDetailState = {
  teamDetail: RosterDetail[];
  fetching: boolean;
};

export type iConferencesState = {
  conferences: Conference[];
  fetching: boolean;
};

export type iErrorState = {
  reason: string;
  message: string;
};
// end state types

// actions
// conferences actions
type FetchingConferencesAction = {
  type: typeof FETCHING_CONFERENCES;
};

type FetchConferencesAction = {
  type: typeof FETCH_CONFERENCES;
  payload: iConferencesState;
};
// end conferences actions

// teams actions
type FetchingTeamsAction = {
  type: typeof FETCHING_TEAMS;
};
type FetchedTeamsAction = {
  type: typeof FETCHED_TEAMS;
  payload: iTeamsState;
};

type FetchByConferenceOnly = {
  type: typeof FETCH_BY_CONFERENCE_ONLY;
  payload: iTeamsState;
};

type FilterTeamsAction = {
  type: typeof FILTER_TEAMS;
  payload: Team[];
};

type FetchingTeamDetailAction = {
  type: typeof FETCHING_TEAM_DETAIL;
};

type FetchTeamDetailAction = {
  type: typeof FETCH_TEAM_DETAIL;
  payload: iTeamDetailState;
};
// end teams actions

// types

/**
 * represents a team, maps 1 to 1 with the api.
 */
export type Team = {
  id: number;
  school: string;
  mascot: string;
  abbreviation: string;
  altNames: string[];
  conference: string;
  division: string;
  color: string;
  altColor: string;
  logos: string[];
};

/**
 * Represents the team detail, maps 1 to 1 with the api.
 */
export type RosterDetail = {
  id: number;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  jersey: number;
  year: number;
  position: string;
  city: string;
  state: string;
  country: string;
};

/**
 * represents a conference, maps 1 to 1 with the api.
 */
export type Conference = {
  id: number;
  name: string;
  shortName: string;
  abbreviation: string;
};

/**
 * error type
 */
export type Error = {
  type: typeof NETWORK_ERROR;
  payload: iErrorState;
};

// export action types using typescript's union
export type ActionTypes =
  | FetchingConferencesAction
  | FetchConferencesAction
  | FetchingTeamsAction
  | FetchedTeamsAction
  | FilterTeamsAction
  | FetchByConferenceOnly
  | FetchingTeamDetailAction
  | FetchTeamDetailAction;
