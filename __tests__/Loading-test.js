// __tests__/Loading-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../sources/components/Loading';

test('renders correctly', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});