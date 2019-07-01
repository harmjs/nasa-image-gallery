import React, { Component } from 'react';

import VideoIcon from 'react-feather/dist/icons/video';
import ImageIcon from 'react-feather/dist/icons/image';


export default class Thumbnail extends Component {
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