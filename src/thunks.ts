import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fetchedTeams } from './redux-store/actions';
import { AppState } from './redux-store';
import { Team } from 'redux-store/_types';

export const thunkFetchTeams = (
  conference?: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  //const teams = await exampleAPI();
  const teams = [
    {
      id: 1,
      school: 'string',
      mascot: 'string',
      abbv: 'string',
      altNames: [''],
      conference: 'string',
      division: 'string',
      color: 'string',
      altColor: 'string'
    }
  ];
  dispatch(
    fetchedTeams({
      teams,
      fetching: false,
      conference: conference
    })
  );
};

function exampleAPI(): Team[] {
  return [
    {
      id: 1,
      school: 'string',
      mascot: 'string',
      abbv: 'string',
      altNames: [''],
      conference: 'string',
      division: 'string',
      color: 'string',
      altColor: 'string'
    }
  ];
}
