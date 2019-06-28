import React, { Component } from 'react';
import './style.scss';

import BackIcon from 'react-feather/dist/icons/x';

export default class extends Component {
  render() {
    return(
      <div 
        id="overlay-container" 
       
        style={{
          marginTop: this.props.navbarOffset + 'px'
        }}>
          <div className="main-content-container">
            <BackIcon
              onClick={() => this.props.back()}
            />
            <div id="overlay">
              <img 
                src={this.props.image}
              />
            </div>
          </div>
      </div>
    )
  }
}