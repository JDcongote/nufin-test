import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Filter, { tFilter } from './Filter';

configure({ adapter: new Adapter() });

describe('Filter', () => {
  it('Basic Filter Test', () => {
    const content = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const onFilter = jest.fn();
    const property = 'name';
    const filters: tFilter[] = [{ name: 'a', id: '1' }, { name: 'a', id: '2' }];

    const render = renderer.create(
      <Filter
        content={content}
        onFilter={onFilter}
        property={property}
        filters={filters}
      />
    );
    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Search test', () => {
    const content = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const onFilter = val => {
      expect(val.length).toBeGreaterThan(0);
      expect(val.name).toBe('a');
    };
    const property = 'name';
    const filters: tFilter[] = [{ name: 'a', id: '1' }, { name: 'a', id: '2' }];

    const wrapper = mount(
      <Filter
        content={content}
        onFilter={onFilter}
        property={property}
        filters={filters}
      />
    );
    wrapper
      .find('.filter__select')
      .find('option')
      .at(1)
      .simulate('click');
  });
});
