import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from './SearchBar';

configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  it('Basic Search Bar Test', () => {
    const content = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const onSearch = jest.fn();
    const property = 'name';

    const render = renderer.create(
      <SearchBar content={content} onSearch={onSearch} property={property} />
    );
    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Search test', () => {
    const content = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const onSearch = val => {
      expect(val.length).toBeGreaterThan(0);
      expect(val.name).toBe('a');
    };
    const property = 'name';

    const wrapper = mount(
      <SearchBar content={content} onSearch={onSearch} property={property} />
    );
    wrapper.find('.search-bar__input').simulate('keydown', { which: 'a' });
  });
});
