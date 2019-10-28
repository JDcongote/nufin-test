import axios from 'axios';
import { Action } from 'redux';
import { Conference, Team } from 'redux-store/_types';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './redux-store';
import {
  fetchedConferences,
  fetchedTeams,
  fetchingConferences,
  fetchingTeams,
  networkError
} from './redux-store/actions';

/**The API was hacked during the development of this app (https://twitter.com/CFB_Data/status/1188197347618103298)
 * so most of the time it was down; I had to use this data as fallback */
// import fallbackTeams from './redux-store/fallback-teams.json';
// import fallbackConfs from './redux-store/fallback-conferences.json';

const apiUrl = 'https://api.collegefootballdata.com/';

/**
 * Returns teams fetched from the collegefootballdata api.
 * @param conference optional: the conference to fetch teams from, if left empty this will return teams beloning to no conference
 */
export const thunkFetchTeams = (
  conference?: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(fetchingTeams());
  const teams = await fetchTeams(conference);

  dispatch(
    fetchedTeams({
      teams,
      filteredTeams: teams,
      fetching: false,
      conference: conference
    })
  );
};

/**
 * Returns conferences fetched from the collegefootballdata api.
 */
export const thunkFetchConferences = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => async dispatch => {
  dispatch(fetchingConferences());
  const response = await fetchConferences();
  if (!response.isAxiosError) {
    dispatch(
      fetchedConferences({
        conferences: response,
        fetching: false
      })
    );
  } else {
    dispatch(networkError(response));
  }
};

/**
 * Axios fetch
 * @param conference
 */
function fetchTeams(conference?: string): Promise<Team[]> {
  return axios
    .get(`${apiUrl}teams`, { params: { conference } })
    .then(response => response.data);
}
/**
 * Axios fetch
 */
function fetchConferences(): Promise<Conference[]> {
  return axios
    .get(`${apiUrl}conferences`)
    .then(response => response.data)
    .catch(error => error);
}

/*function fetchConferences(): Conference[] {
  return fallbackConfs;
}

function fetchTeams(conference?: string): Team[] {
  return fallbackTeams;
}*/
