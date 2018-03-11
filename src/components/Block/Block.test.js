import React from 'react';
import fetchMock from 'fetch-mock';

import fetchStories from '../Block';

import { shallow } from 'enzyme';
import Block from '../Block';

describe("Block", () => {
  it("should render the blocks", () => {
    const wrapper = shallow(<Block />);
  });
});

describe('Fetch story', () => {

  it('made a successful request', () => {
    
    fetchMock.get('https://hacker-news.firebaseio.com/v0/item/16545060.json?print=pretty', { hello: "world" });
    const response = fetchTopStories('https://hacker-news.firebaseio.com/v0/item/16545060.json?print=pretty');
    const result = response.json();

    expect(result.hello).toEqual("world");

  });

})