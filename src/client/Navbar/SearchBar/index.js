import React, { Component } from 'react';
import SearchIcon from 'react-feather/dist/icons/search';
import ClearIcon from 'react-feather/dist/icons/x';
import "./style.scss";

import classNames from 'classnames';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      active: false
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.value);
  }
  
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label className={classNames({
          'search-bar-container': true,
          'search-bar-container-active': this.state.active
        })}>
          <SearchIcon className="search-icons"/>
          <input 
            onFocus={() => this.setState({ active: true }) }
            onBlur={() => this.setState({ active: false }) }
            placeholder="Search" 
            className="search-input"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
          {
            this.state.value.length > 0 &&
            <ClearIcon className="search-icons" 
              onClick={() => this.setState({ value: ''})}
            />
          }
        </label>
      </form>
    )
  }
}