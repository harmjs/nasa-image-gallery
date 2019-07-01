import React, { Component } from 'react';
import './style.scss';

import NextIcon from 'react-feather/dist/icons/chevron-right';
import PreviousIcon from 'react-feather/dist/icons/chevron-left';
import BackIcon from 'react-feather/dist/icons/x';

export default class extends Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {
    const result = this.props.results[this.props.overlayIndex];

    return(
      <div id="overlay-container">
        <div
          className="main-content-container"
        >
          <div
            id="overlay"
          >
            <div id="overlay-back">
              <BackIcon 
                className='float-left overlay-icon'
                onClick={() => this.props.setOverlayIndex(null)}
              />
            </div>
            <img
              id='overlay-image'
              src={result.thumbnail}
            />
            <div id='overlay-navigation'>
              <PreviousIcon className='overlay-icon' />
              <div id='overlay-title'>{result.title}</div> 
              <NextIcon className='overlay-icon'/>
            </div>
            <div id='overlay-description'>{result.description}</div> 
          </div>
        </div>
      </div>
    )
  }
}

/*
<BackIcon
onClick={() => this.props.setOverlayIndex(null)}
/>
*/