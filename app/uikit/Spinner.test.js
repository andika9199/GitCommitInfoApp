import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './Spinner';

it('Spinner successfully rendered', () => {
  const component = renderer.create(<Spinner />);
  expect(component).toMatchSnapshot();
});
