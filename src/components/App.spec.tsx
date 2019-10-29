import { ConferenceReducer } from '../redux-store/reducers/_conference-reducer';
import { TeamReducer } from '../redux-store/reducers/_team-reducer';
import {
  FETCHED_TEAMS,
  FETCH_CONFERENCES,
  iConferencesState,
  iTeamsState
} from '../redux-store/_types';

const teams = [
  {
    id: 98,
    school: 'The Pitbulls',
    mascot: 'Little Pitbull',
    abbreviation: 'TP',
    altNames: [],
    conference: 'Kids League 1',
    division: 'Division 2',
    color: '#A10C02',
    altColor: '#28BAE2',
    logos: ['http://a.espncdn.com/i/teamlogos/ncaa/500/2309.png']
  },
  {
    id: 99,
    school: 'The Arsenal',
    mascot: 'Little Arsenal',
    abbreviation: 'TA',
    altNames: [],
    conference: 'Ultra League 1',
    division: 'Division 3',
    color: '#5C22AB',
    altColor: '#08342B',
    logos: ['http://a.espncdn.com/i/teamlogos/ncaa/500/2026.png']
  },
  {
    id: 100,
    school: 'Deathwish',
    mascot: 'Little Deathwish',
    abbreviation: 'D',
    altNames: [],
    conference: 'Super League 1',
    division: 'Division 2',
    color: '#0257DA',
    altColor: '#A02D68',
    logos: ['http://a.espncdn.com/i/teamlogos/ncaa/500/24.png']
  }
];

const conferences = [
  {
    id: 1,
    name: 'Kids League 1',
    shortName: 'K1',
    abbreviation: 'KL1'
  },
  {
    id: 2,
    name: 'Ultra League 1',
    shortName: 'U1',
    abbreviation: 'UL1'
  },
  {
    id: 3,
    name: 'Super League 1',
    shortName: 'S1',
    abbreviation: 'SL1'
  }
];

describe('App', () => {
  it('Fetch Conferences', () => {
    const initialState: iConferencesState = {
      conferences: [],
      fetching: false
    };
    const newState = ConferenceReducer(initialState, {
      type: FETCH_CONFERENCES,
      payload: { conferences: conferences, fetching: false }
    });
    expect(newState).toEqual({ conferences, fetching: false });
  });
  it('Fetch Teams', () => {
    const initialState: iTeamsState = {
      teams: [],
      filteredTeams: [],
      conference: '',
      fetching: false
    };
    const newState = TeamReducer(initialState, {
      type: FETCHED_TEAMS,
      payload: { filteredTeams: teams, teams: teams, fetching: false }
    });
    expect(newState).toEqual({ filteredTeams: teams, teams, fetching: false });
  });
});
