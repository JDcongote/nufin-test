import Button from './Button';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Button', () => {
  it('Basic Button Test', () => {
    const onClick = () => {};
    const text = 'TEST_BUTTON';
    const context = { title: 'TEST' };
    const wrapper = mount(
      <Button context={context} onClick={onClick} text={text} />
    );
    const render = renderer.create(
      <Button context={context} onClick={onClick} text={text} />
    );

    const nodes = wrapper.find('.button');
    expect(nodes.text()).toBe(text);

    expect(render.toJSON()).toMatchSnapshot();
  });

  it('onCLick Test', () => {
    const onClick = jest.fn();
    const text = 'TEST_BUTTON';
    const context = { title: 'TEST' };
    const wrapper = mount(
      <Button context={context} onClick={onClick} text={text} />
    );

    const button = wrapper.find('.button');
    button.simulate('click');
    expect(onClick).toBeCalledWith(context);
  });
});
