import React, { Component } from 'react';

import VideoIcon from 'react-feather/dist/icons/video';
import ImageIcon from 'react-feather/dist/icons/image';

import Overlay from './Overlay/index';

import './style.scss';

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
    const overlayResult = this.props.results[this.state.overlayIndex]
    return (
      <div>
        <div className="gallery">
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
        {
          Number.isInteger(this.state.overlayIndex) && 
            <Overlay 
              back={() => this.setState({ overlayIndex: null })}
              navbarOffset={this.props.navbarOffset } 
              image={overlayResult.thumbnail}
              title={overlayResult.title}
              type={overlayResult.type}
              description={overlayResult.description}
            />
        }
      </div>
    )
  }
}

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
  }

  render() {
    const active = this.state.hovered;
    return(
      <div
        onClick={() => this.props.setOverlay()}
        className='thumbnail'
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <img
          src={this.props.image}
        />
        { active && 
          <div
            className="info"
          >
            <div className='title'>{this.props.title}</div>
            {this.props.type === 'image' 
              ? <ImageIcon className='icon'/> 
              : <VideoIcon className='icon' />
            }
          </div>
        }
     </div>
    )
  }
}

export default Gallery;