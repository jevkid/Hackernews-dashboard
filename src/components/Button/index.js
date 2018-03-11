import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="button" href={this.props.buttonLink}>{this.props.buttonText}</button>
    );
  }
};

export default Button;