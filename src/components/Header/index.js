import React, { Component } from 'react';
import Button from '../Button';

class Header extends Component {
  render() {
    return (
    	<div className="header">
    		<div className="container-fluid inline-block">
  				<div className="header--logo">Y</div>
        	<h1> {this.props.text} </h1>
        	<div className="button--wrapper">
	        	<Button buttonText="new" buttonLink="https://news.ycombinator.com/newest"/>
	        	<Button buttonText="comments" buttonLink="https://news.ycombinator.com/newcomments"/>
	        	<Button buttonText="show" buttonLink="https://news.ycombinator.com/show"/>
	        	<Button buttonText="ask" buttonLink="https://news.ycombinator.com/ask"/>
	        	<Button buttonText="jobs" buttonLink="https://news.ycombinator.com/jobs"/>
	        	<Button buttonText="submit" buttonLink="https://news.ycombinator.com/submit"/>
        	</div>
        </div>
      </div>

    );
  }
};

export default Header;