import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar/index.js';
import Gallery from './Gallery/index.js';

import { getNASACollection } from './testApi';
const NASA_COLLECTION_SIZE = 100;
const RESIZE_DELAY_MS = 25;

const Result = function(item) {
  const { description, media_type, nasa_id, title, keywords} = item.data[0];
  const thumbnail = item.links[0].href;

  return {
    type: media_type,
    nasaId: nasa_id,
    title, keywords, description,
    thumbnail
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
    this.loadSearchResults('moon');

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
      const { collection } = await getNASACollection(query, 0);
      const results = collection.items.map((item) => new Result(item));

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
        const moreResults = collection.items.map((item) => new Result(item));

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
      <div className='app'>
        <div id="navbar-container">
          <NavBar 
            search = {() => console.log('hit')}
          />
        </div>
        <div 
          className='main-content-container' 
          style={{ 
            marginTop: this.state.navbarOffset + 'px',
          }}
        >
          { this.state.results && 
            <Gallery 
              results={this.state.results}
              loadMoreSearchResults={ () => this.loadMoreSearchResults()}
              navbarOffset={this.state.navbarOffset}
            />
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
