import React, { Component } from 'react';

import './style.scss';
import Thumbnail from './Thumbnail';
import Overlay from './Overlay/index.js';

const SCROLL_DELAY_MS = 50;
const SCROLL_PERCENTAGE_LOAD = 90;

//https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
function getScrollPercentage() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayIndex: null
    }

    this.scrollTimeoutId = null;
    this.scrollDelay = this.scrollDelay.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollDelay);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollDelay);
  }

  scrollDelay() {
    clearInterval(this.scrollTimeoutId);
    this.scrollTimeoutId = setTimeout(() => {
      const percentage = getScrollPercentage();
      if(percentage > SCROLL_PERCENTAGE_LOAD) {
        this.props.loadMoreSearchResults();
      }
    }, SCROLL_DELAY_MS);
  }

  render() {
    const active = Number.isInteger(this.state.overlayIndex);
    return (
      <div id="gallery"
        style={{
          overflow: active ? "hidden" : "auto"
        }}
      >
        <div className="main-content-container">
          <div id="messages">
            {this.props.totalHits} results for '{this.props.query}'
          </div>
          <div id="thumbnails">
            {this.props.results.map((result, index) => (
              <Thumbnail
                key={index} 
                image={result.thumbnail}
                title={result.title}
                type={result.type}
                setOverlay={() => this.setState({ overlayIndex: index })}
              /> 
            ))}
          </div>
        </div>
        { active && 
          <Overlay
            navbarOffset={this.props.navbarOffset}
            results={this.props.results}
            overlayIndex={this.state.overlayIndex}
            setOverlayIndex={(overlayIndex) => this.setState({ overlayIndex })}
          />
        }
      </div>
    )
  }
}

export default Gallery;