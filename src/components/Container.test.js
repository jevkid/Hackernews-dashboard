import React from 'react';
// const fetchMock = require('fetch-mock');
import fetchMock from 'fetch-mock';

import fetchTopStories from './Container';

import { shallow } from 'enzyme';
import Container from './Container';

describe("Container", () => {
  it("should render my component", () => {
    const wrapper = shallow(<Container />);
  });
});

describe('Fetch top stories', () => {

  it('made a successful request', () => {
    
    fetchMock.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', { hello: "world" });
    const response = fetchTopStories('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const result = response.json();

    expect(result.hello).toEqual("world");

  });

})