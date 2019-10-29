import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Team } from 'redux-store/_types';
import configureStore from '../../redux-store';
import TeamDetail from './TeamDetail';

configure({ adapter: new Adapter() });

describe('TeamDetail', () => {
  it('Basic TeamDetail Test', () => {
    const team: Team = {
      id: 103,
      school: 'Boston College',
      mascot: 'Eagles',
      abbreviation: 'BC',
      altNames: ['BC'],
      conference: 'ACC',
      division: 'Atlantic',
      color: '#88001a',
      altColor: '#a39161',
      logos: [
        'http://a.espncdn.com/i/teamlogos/ncaa/500/103.png',
        'http://a.espncdn.com/i/teamlogos/ncaa/500-dark/103.png'
      ]
    };
    const close = jest.fn();

    const render = renderer.create(
      <Provider store={configureStore()}>
        <TeamDetail team={team} close={close} />
      </Provider>
    );
    expect(render.toJSON()).toMatchSnapshot();
  });
});
