import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';
import Item from './Item';

configure({ adapter: new Adapter() });

function createButton() {
  const onClick = jest.fn();
  const text = 'TEST_BUTTON';
  const context = { title: 'TEST' };
  return <Button context={context} onClick={onClick} text={text} />;
}

describe('Item', () => {
  it('Basic Item Test', () => {
    const items = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
    const title = 'TITLE';
    const image = 'http://a.espncdn.com/i/teamlogos/ncaa/500-dark/2000.png';
    const button = createButton();
    const wrapper = mount(
      <Item items={items} title={title} image={image} button={button} />
    );

    const render = renderer.create(
      <Item items={items} title={title} image={image} button={button} />
    );

    const nodes = wrapper.find('.item-title');
    expect(nodes.text()).toBe(title);
    expect(wrapper.find('.logo-image').prop('src')).toBe(image);
    expect(render.toJSON()).toMatchSnapshot();
  });
});
