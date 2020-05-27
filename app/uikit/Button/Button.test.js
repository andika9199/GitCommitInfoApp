import React from 'react';
import renderer from 'react-test-renderer';
import Button from './index';

it('Button successfully rendered', () => {
  const component = renderer.create(<Button />);
  expect(component).toMatchSnapshot();
});

it('Button successfully rendered but disabled', () => {
  const props = {
    disabled: true,
  };
  const component = renderer.create(<Button {...props} />);
  expect(component).toMatchSnapshot();
});
