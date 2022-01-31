// __tests__/TouchableItem-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import TouchableItem from '../sources/components/Loading';

test('renders correctly', () => {
  const tree = renderer.create(<TouchableItem />).toJSON();
  expect(tree).toMatchSnapshot();
});