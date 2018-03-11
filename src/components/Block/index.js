import React, { Component } from 'react';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      ids: this.props.data,
      isLoading: false,
      error: null,
      filter: 10
    }

    this.handleClick = this.handleClick.bind(this);
    this.expandDiv = this.expandDiv.bind(this);
  }

  // Use the ID's passed from the Container component to fetch the top stories and render them below
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

  // Display more top stories
  handleClick(e){
    e.preventDefault();
    const filter = this.state.filter + 10;
    this.setState({filter: filter});
  }

  // Toggle the "view more" for comments or text
  expandDiv(e){
    e.preventDefault();
    const element = this.refs.element;
    const link = this.refs.link;
    const linkText = document.getElementById('link').firstChild;

    link.classList.toggle('hidden');
    linkText.data = linkText.data == "View more..." ? "View less" : "View more...";

    element.classList.toggle('hidden');
    element.classList.toggle('expand');
  }

  componentDidMount() {
    // When story IDs have been passed to the component, fetch the top stories with them
    if(this.state.ids.length > 0){
      this.fetchStories(this.state.ids)
    }
  }
  
  render() {
    const { stories, error, isLoading } = this.state;

    // Display error or loading based on state
    if (error) {
      return <div className="contain container"><div className="contain--alert">Sorry, an error has occured.</div></div>;
    }

    if (isLoading || stories.length < 1) {
      return <div className="contain container"><div className="contain--alert">Loading content...</div></div>;
    }

    // If there are stories, show the blocks
    const blocks = stories
      .filter((item, index) => (index < this.state.filter))
      .map((item, index) => {
        return (
          <div className="block col-lg-2 col-md-4 col-xs-12" key={item.id}>
            <div className="block--score">
              <span className="block--triangle"></span>
              <span className="block--num" key={item.score}>{item.score}</span>
            </div>
            <div className="block--content">
              <h4 className="block--title" key={item.title}><a href={item.url}>{item.title}</a> </h4>
              <span className="block--author">By {item.by} </span>
              {item.comment || item.text &&
                <p ref="element" className="block--text">{item.comment || item.text}</p>
              }
              {item.comment || item.text && !item.url &&
                <div className="block--link">
                  <a ref="link" id="link" href="#" onClick={this.expandDiv}>View more...</a>
                </div>
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
        <div className="row">
          {blocks}
          {this.state.filter < 500 &&
            // Only display "View More" if there are more results to view
            <div className="block block--view-more col-lg-2 col-md-4 col-xs-12" onClick={this.handleClick}>
              <h2 className="block--view-more-link">View More</h2>
            </div>
          }
        </div>
      </div>
    );
  }
};

export default Block;