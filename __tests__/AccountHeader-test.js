// __tests__/AccountHeader-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AccountHeader from '../sources/components/Account/AccountHeader';

test('renders correctly', () => {
  const tree = renderer.create(<AccountHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});