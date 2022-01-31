// __tests__/AccountListSubreddit-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AccountListSubreddit from '../sources/components/Account/AccountListSubreddit';

test('renders correctly', () => {
  const tree = renderer.create(<AccountListSubreddit />).toJSON();
  expect(tree).toMatchSnapshot();
});