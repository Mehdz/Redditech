// __tests__/AccountUserInfo-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AccountUserInfo from '../sources/components/Account/AccountUserInfo';

test('renders correctly', () => {
  const tree = renderer.create(<AccountUserInfo />).toJSON();
  expect(tree).toMatchSnapshot();
});