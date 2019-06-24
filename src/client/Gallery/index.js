import React, { Component } from 'react';

import VideoIcon from 'react-feather/dist/icons/video';
import ImageIcon from 'react-feather/dist/icons/image';

import './styles.scss';

const Gallery = ({ content }) => {
  const { currentChunk, chunks } = content;
  const chunk = chunks[currentChunk];

  return (
    <div className="gallery">
      {chunk.map((item, id) => (
        <Thumbnail 
          key={id}
          item={item}
        />
      ))}
    </div>
  )
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
        className='thumbnail'
        onMouseEnter={() => this.setState({hovered: true })}
        onMouseLeave={() => this.setState({hovered: false })}
      >
        <img
          src={this.props.item.thumbnail}

        />
        { active && 
          <div
            className="info"
          >
            <div className='title'>{this.props.item.title}</div>
            {this.props.item.type === 'image' 
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