/**Standard Redux type initialization */
export const FETCHING_CONFERENCES = 'FETCHING_CONFERENCES';
export const FETCH_CONFERENCES = 'FETCH_CONFERENCES';
export const FETCHING_TEAMS = 'FETCHING_TEAMS';
export const FETCHED_TEAMS = 'FETCHED_TEAMS';
export const FILTER_TEAMS = 'FILTER_TEAMS';

export const NETWORK_ERROR = 'NETWORK_ERROR';

//states

export interface iTeamsState {
  teams: Team[];
  filteredTeams: Team[];
  conference?: string;
  fetching: boolean;
}

export interface iConferencesState {
  conferences: Conference[];
  fetching: boolean;
}

export interface iErrorState {
  reason: string;
  message: string;
}

//actions
//conferences
interface FetchingConferencesAction {
  type: typeof FETCHING_CONFERENCES;
}

interface FetchConferencesAction {
  type: typeof FETCH_CONFERENCES;
  payload: iConferencesState;
}

//teams
interface FetchingTeamsAction {
  type: typeof FETCHING_TEAMS;
}
interface FetchedTeamsAction {
  type: typeof FETCHED_TEAMS;
  payload: iTeamsState;
}

interface FilterTeamsAction {
  type: typeof FILTER_TEAMS;
  payload: Team[];
}

//types

export interface Team {
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
}

export interface Conference {
  id: number;
  name: string;
  shortName: string;
  abbreviation: string;
}

//export action types
export type ActionTypes =
  | FetchingConferencesAction
  | FetchConferencesAction
  | FetchingTeamsAction
  | FetchedTeamsAction
  | FilterTeamsAction;

export type Error = {
  type: typeof NETWORK_ERROR;
  payload: iErrorState;
};
