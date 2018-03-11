import React, { Component } from 'react';

import Block from './Block';

class Container extends Component {
	
	constructor(props) {
    super(props);

    this.state = {
      ids: [],
      isLoading: false,
      error: null
    };
  }
  
  fetchTopStories(url) {
    this.setState({ isLoading: true });
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ ids: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));   
  }


  componentDidMount() {
    // Fetch top story IDs
    this.fetchTopStories('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
  }

  render() {
    const { ids, error, isLoading } = this.state;

    // Display error or loading based on state
    if (error) {
      return <div className="contain container"> <div className="contain--alert">Sorry, an error has occured.</div></div>;
    }

    if (isLoading || ids.length < 1) {
      return <div className="contain container"> <div className="contain--alert">Getting top stories...</div></div>;
    }
    // If there are top IDs returned, pass them to the blocks to render the stories
    return (
      <div className="container-fluid">       	
         <Block data={ids} />
      </div>
    );
  }
};

export default Container;