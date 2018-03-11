import React, { Component } from 'react';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      ids: this.props.data,
      isLoading: false,
      error: null
    }
  }

  fetchStories(ids) {
    const storiesArr = [];
    ids.map((id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => this.setState({ stories: [...this.state.stories, data]}))
        .catch(error => this.setState({ error, isLoading: false }))
      ))

    this.setState({isLoading: false })
  }

  componentDidMount() {
    if(this.state.ids.length > 0){
      this.fetchStories(this.state.ids)
    }
  }
  
  render() {
    const { stories, error, isLoading } = this.state;

    if (error) {
      return <div className="contain container"><div className="contain--alert">Sorry, an error has occured.</div></div>;
    }

    if (isLoading || stories.length < 1) {
      return <div className="contain container"><div className="contain--alert">Loading content...</div></div>;
    }

    // by, descendants, id, kids, score, time, title, type, url
    const blocks = stories
      .filter((item, index) => (index < 50))
      .map((item, index) => {
        return (
          <div className="block" key={item.id}>
            <div className="block--score">
              <span className="block--triangle"></span>
              <span className="block--num" key={item.score}>{item.score}</span>
            </div>
            <div className="block--content">
              <h4 className="block--title" key={item.title}><a href={item.url}>{item.title}</a> </h4>
              <span className="block--author">By {item.by} </span>
              {item.comment || item.text &&
                <p className="block--text">{item.comment || item.text}</p>
              }
              {item.url &&
                <div className="block--link">
                  <a href={item.url}>Read more...</a>
                </div>
              }
            </div>
          </div>
        );
      });
    
    return (
      <div className="wrapper">
        {blocks}
      </div>
    );
  }
};

export default Block;