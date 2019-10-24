import React from 'react';
import PropTypes from 'prop-types';
import { slide as BurgerMenu } from 'react-burger-menu';
import styled from 'styled-components';

import { Media } from '~/utils/constants';
import { getRoute, prefetchRoute, pushRoute } from '~/utils/utils';
import './BurgerMenu.scss';

class MobileNav extends React.Component {
  state = {
    isMenuOpen: false,
  };

  componentDidMount() {
    this.props.menus.forEach(({ href, as, prefetch }) => {
      if (prefetch) {
        prefetchRoute(as || href);
      }
    });
  }

  handleStateChange = state => {
    this.setState({ isMenuOpen: state.isOpen });
  };

  onMenuClick = ({ href, onClick }) => {
    this.setState({ isMenuOpen: false });
    if (onClick) {
      onClick();
    } else {
      pushRoute(href);
    }
  };

  render() {
    return (
      <ContentWrapper>
        <BurgerMenu id="slide" isOpen={this.state.isMenuOpen} onStateChange={this.handleStateChange} right>
          {this.props.menus.map(
            ({ label, isHidden, ...props }) =>
              !isHidden && (
                <Link key={label} onClick={() => this.onMenuClick(props)}>
                  {label}
                </Link>
              ),
          )}
        </BurgerMenu>
      </ContentWrapper>
    );
  }
}

const ContentWrapper = styled.div`
  display: none;

  ${Media.phone`
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `};
`;

const Link = styled.a`
  cursor: pointer;
`;

MobileNav.propTypes = {
  menus: PropTypes.array,
};

export default MobileNav;
