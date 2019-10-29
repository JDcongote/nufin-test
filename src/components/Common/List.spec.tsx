import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import List from './list';

configure({ adapter: new Adapter() });

describe('List', () => {
  it('Basic List test, only items', () => {
    const texts = ['a', 'b'];
    const items = [
      {
        key: 1,
        fragment: <div>a</div>
      },
      {
        key: 2,
        fragment: <div>b</div>
      }
    ];
    const wrapper = mount(<List items={items} />);
    const render = renderer.create(<List items={items} />);
    const nodes = wrapper.find('.list__item');
    nodes.forEach((node, i) => expect(node.text()).toBe(texts[i]));

    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Basic List test, no items', () => {
    const items = [];
    const wrapper = mount(<List items={items} />);
    const nodes = wrapper.find('.list__item');
    expect(nodes.length).toBe(0);
  });
});
