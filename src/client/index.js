import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar/index.js';
import Gallery from './Gallery/index.js';

import { getNASACollection } from './api';
const NASA_COLLECTION_SIZE = 100;
const RESIZE_DELAY_MS = 25;

const ResultModel = function(item) {
  const { description, media_type, nasa_id, title, keywords } = item.data[0];
  const thumbnail =item.links[0].href;
  const href = item.href;
  return {
    type: media_type,
    nasaId: nasa_id,
    title, keywords, description, thumbnail, href
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOffset: null,
      errors: null,
      loading: null,
      query: null,
      totalHits: null,
      results: null
    };

    this.resizeTimeoutId = null; 
    this.resizeDelay = this.resizeDelay.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeDelay);

    const navbarContainer = document.getElementById('navbar-container');
    const navbarOffset = navbarContainer.clientHeight;

    this.setState({
      navbarOffset: navbarOffset
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeDelay);
  }

  resizeDelay() {
    clearInterval(this.resizeTimeoutId);
    this.resizeTimeoutId = setTimeout(() => {
      const navbarContainer = document.getElementById('navbar-container');
      const navbarOffset = navbarContainer.clientHeight;
      if(this.state.navbarOffset !== navbarOffset) {
        this.setState({ navbarOffset });
      }
    }, RESIZE_DELAY_MS)
  }

  async loadSearchResults(query) {
    this.setState({
      loading: true,
      query: query,
      totalHits: null,
      results: null,
    })

    try{
      const { collection } = await getNASACollection(query, 1);
      const results = collection.items.map((item) => new ResultModel(item));

      this.setState({
        loading: false,
        totalHits: collection.metadata.total_hits,
        results: results
      })
    }
    catch(err) {
      throw(err);
    }
  }

  async loadMoreSearchResults() {
    const { totalHits, loading, results, query } = this.state;
    if(!loading && totalHits !== results.length) {
      const nextPage = Math.floor(results.length / NASA_COLLECTION_SIZE);

      this.setState({
        loading: true
      })

      try {
        const { collection } = await getNASACollection(query, nextPage);
        const moreResults = collection.items.map((item) => new ResultModel(item));

        this.setState({
          loading: false,
          results: [...results.slice(), ...moreResults.slice()]
        })
      }
      catch(error) {
        this.setState({
          loading: false
        })
      }
    }
  }

  render() {
    return (
      <>
        <div id="navbar-container">
          <Navbar 
            search = {(query) => this.loadSearchResults(query)}
          />
        </div>
        <div
          style={{ 
            marginTop: this.state.navbarOffset + 'px',
          }}
        > 
          { this.state.results && 
            <Gallery
              query={this.state.query}
              totalHits={this.state.totalHits}
              navbarOffset={this.state.navbarOffset}
              results={this.state.results}
              loadMoreSearchResults={ () => this.loadMoreSearchResults()}
            />
          }
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
