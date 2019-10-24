import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    this.timer = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value && this.props.value !== nextProps.value) {
      this.setState({ value: '' });
    }
  }

  handleChange = e => {
    clearTimeout(this.timer);

    this.setState({ value: e.target.value });

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      this.triggerChange();
    }
  };

  triggerChange = () => {
    this.props.onChange(this.state.value);
  };

  render() {
    return (
      <Input
        placeholder="Search..."
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        className={this.props.className}
      />
    );
  }
}

const Input = styled.input`
  background-color: white;
  padding-left: 9px;
  padding-right: 9px;
  margin-right: 20px;
  height: 25px;
  width: 160px;
  border: solid 1px ${Colors.grey};
  border-radius: 15px;
  z-index: 1;
  &:focus {
    outline: 0;
  }

  ${Media.tablet`
    margin: 0 0 5px;
  `};
`;

SearchInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default SearchInput;
