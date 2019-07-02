import React, { Component } from 'react';
import './style.scss';

import axios from 'axios';

import NextIcon from 'react-feather/dist/icons/chevron-right';
import PreviousIcon from 'react-feather/dist/icons/chevron-left';
import BackIcon from 'react-feather/dist/icons/x'

export default class extends Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }
  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }
  render() {
    const { results, overlayIndex } = this.props;
    const result = results[overlayIndex];
    const ContentComponent = (() => {
      switch(result.type) {
        case "image": return (
          <ImageContent
            key={overlayIndex}
            href={result.href}
          />
        )
        case "video": return (
          <VideoContent 
            key={overlayIndex}
            href={result.href}
          />
        )
      }
    })();
    
    const NextComponent = (() => {
      if(overlayIndex + 1 === results.length){
        return <div></div>
      }else{
        return (
          <NextIcon 
            className='overlay-icon'
            onClick={() => this.props.setOverlayIndex(overlayIndex + 1)}
          />
        )
      }
    })();

    const PreviousComponent = (() => {
      if(overlayIndex === 0){
        return <div></div>
      }else{
        return (
          <PreviousIcon 
            className='overlay-icon'
            onClick={() => this.props.setOverlayIndex(overlayIndex - 1)}
          />
        )
      }
    })();

    return(
      <div id="overlay-container">
        <div
          className="main-content-container"
        >
          <div
            id="overlay"
          >
            <div>
              <BackIcon 
                className='float-left overlay-icon'
                onClick={() => this.props.setOverlayIndex(null)}
              />
            </div>
            { ContentComponent }
            <div id='overlay-navigation'>
              { PreviousComponent }
              <div id='overlay-title'>{result.title}</div> 
              { NextComponent }
            </div>
            <div id='overlay-description'>{result.description}</div> 
          </div>
        </div>
      </div>
    )
  }
}

class ImageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null
    }
  }
  async load(){
    const { data } = await axios.get(this.props.href);
    const imageRegEx = /~orig.jpg|~large.jpg/;
    this.setState({
      src: data.find((src) => imageRegEx.test(src))
    })
  }
  componentDidMount() {
    this.load();
  }
  render() {
    if(this.state.src) {
      return(
        <img
          id='overlay-content'
          src={this.state.src}
        />
      )
    }else {
      return null;
    }
  }
}

class VideoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null
    }
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    try{
      const { data } = await axios.get(this.props.href);
      const videoRegEx = /~large.mp4/;

      this.setState({
        src: data.find((src) => videoRegEx.test(src))
      })
    }
    catch(err){
      throw(err);
    }
  }

  render() {
    if(this.state.src) {
      return (
        <video controls id="overlay-content">
          <source src={this.state.src} />
        </video>
      )
    }else {
      return null;
    }
  }
}

