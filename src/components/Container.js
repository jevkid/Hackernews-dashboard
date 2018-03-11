import React, { Component } from 'react';

import Block from './Block';

import '../styles/main.less';

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
    this.fetchTopStories('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
  }

  render() {
    const { ids, error, isLoading } = this.state;

    if (error) {
      return <div className="contain container"> <div className="contain--alert">Sorry, an error has occured.</div></div>;
    }

    if (isLoading || ids.length < 1) {
      return <div className="contain container"> <div className="contain--alert">Getting top stories...</div></div>;
    }

    return (
      <div className="container">
       	<div className="row">
       		<div className="col-xs-12">
         		<Block data={ids} />
         	</div>
       	</div>
      </div>
    );
  }
};

export default Container;