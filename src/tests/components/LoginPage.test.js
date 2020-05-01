import React from 'react';
import { LoginPage } from '../../components/LoginPage'
import { shallow } from 'enzyme';

test('should correctly render LoginPage', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});