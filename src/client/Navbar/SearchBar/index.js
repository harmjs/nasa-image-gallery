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
    this.inputRef = React.createRef();
    this.clear = this.clear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.search(this.state.value);
    this.clear(event);
  }

  clear(event) {
    event.preventDefault();
    this.inputRef.current.blur();
    this.setState({ value: '' });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className={classNames({
          'search-bar-container': true,
          'search-bar-container-active': this.state.active
        })}>
          <SearchIcon className="search-icons"/>
          <input
            ref={this.inputRef}
            onFocus={() => this.setState({ active: true }) }
            onBlur={() => this.setState({ active: false }) }
            placeholder="Search" 
            className="search-input"
            value={this.state.value}
            onChange={this.handleChange}
          />
          {
            this.state.value.length > 0 &&
            <ClearIcon className="search-icons" 
              onClick={this.clear}
            />
          }
        </label>
      </form>
    )
  }
}