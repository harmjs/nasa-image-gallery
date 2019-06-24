import './style.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBar from './NavBar/index.js';
import Gallery from './Gallery/index.js';

import { Content } from './models';
import { getNASACollection } from './api';

import contentData from './contentData';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: true,
      error:  null,
      content: null
    };
  }

  componentDidMount() {
    this.setState({
      waiting: false,
      content: new Content('moon', contentData.collection)
    })
  }

  async loadNASAContent(setContent, query, page) {
    if(this.state.waiting) return;

    try {
      const { collection } = await getNASACollection(query, page);

      this.setState({
        waiting: false,
        content: setContent(collection)
      })
    }

    catch(error) {
      this.setState({
        waiting: false,
        error: error
      });
    }

    this.setState({
      waiting: true 
    })
  }

  render() {
    return (
      <div className='app'>
        <div className='navbar-container'>
          <NavBar 
            search = { (query, getContent) => this.loadNASAContent(
              (collection) => new Content(query).add(collection),
              query,
              0
            )}
          />
        </div>
        <div className='main-content-container'>
          { this.state.content && 
            <Gallery 
              content={ this.state.content }
              loadMoreContent={
                (page) => this.loadNASAContent(
                  (collection) => this.state.content.add(collection),
                  this.state.content.query,
                  page
                )
              }
            />
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
