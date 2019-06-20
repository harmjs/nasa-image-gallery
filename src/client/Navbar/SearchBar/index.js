import React, { Component } from 'react';
import Search from 'react-feather/dist/icons/search';
import "./style.scss";
import { search } from '../../api';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    search(this.state.value);
  }
  
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label className="search-bar-container">
          <Search className="search-icon"/>
          <input 
            placeholder="Search" 
            className="search-input"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
        </label>
      </form>
    )
  }
}

