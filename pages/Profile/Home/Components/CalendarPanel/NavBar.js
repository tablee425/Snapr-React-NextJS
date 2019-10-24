import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton/index';

const NavBar = ({ onPreviousClick, onNextClick, className }) => (
  <div className={className}>
    <NavButton onClick={() => onPreviousClick()}>
      <NavArrow src="/static/icons/left-chevron.png" style={{ marginRight: 2 }} />
    </NavButton>

    <NavButton onClick={() => onNextClick()}>
      <NavArrow src="/static/icons/right-chevron.png" style={{ marginLeft: 2 }} />
    </NavButton>
  </div>
);

const NavButton = styled(IconButton)`
  && {
    width: 40px;
    height: 40px;
  }
`;

const NavArrow = styled.img`
  height: 19px;
`;

NavBar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  className: PropTypes.string,
};

export default NavBar;
