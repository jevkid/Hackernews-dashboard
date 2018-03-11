import React from 'react';


import { shallow } from 'enzyme';
import Block from '../Button';

describe("Button", () => {
  it("should render the buttons", () => {
    const wrapper = shallow(<Button />);
  });
});
