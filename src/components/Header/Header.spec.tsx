import Header from './Header';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('Basic Header Test', () => {
    const items = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const pageTitle = 'TITLE';
    const onMenuClick = jest.fn();

    const wrapper = mount(
      <Header items={items} onMenuClick={onMenuClick} pageTitle={pageTitle} />
    );

    const render = renderer.create(
      <Header items={items} onMenuClick={onMenuClick} pageTitle={pageTitle} />
    );

    expect(wrapper.find('.nav-header__title').text()).toBe(pageTitle);
    expect(
      wrapper
        .find('.nav-header__menu-item')
        .first()
        .text()
    ).toBe('a');

    expect(render.toJSON()).toMatchSnapshot();
  });
});
