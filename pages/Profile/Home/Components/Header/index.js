import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DivRow, DivColumn, YellowButton, MobileNav } from '~/components';
import { pushRoute } from '~/utils/utils';
import { AuthRequest } from '~/utils/services';
import { Media } from '~/utils/constants';

import * as Styled from '../../../../Order/Download/Components/Header';
import SearchInput from '../SearchInput';

const Header = ({ onSearch, value, children }) => (
  <div>
    <MobileNav menus={[...options.left, ...options.right]} />

    <Styled.HeaderContainer>
      <Styled.TitleWrapper>
        <Styled.HeaderTitle>Home</Styled.HeaderTitle>
        {children}
        <MobileSearchInput value={value} onChange={onSearch} />
      </Styled.TitleWrapper>

      <Styled.ActionWrapper>
        <Styled.HeaderLeftPanel>
          <SearchInput value={value} onChange={onSearch} />
          {options.left.map(({ label, isHidden, ...props }) => (
            <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
              {label}
            </YellowButton>
          ))}
        </Styled.HeaderLeftPanel>

        <Styled.HeaderRightPanel>
          {options.right.map(({ label, isHidden, ...props }) => (
            <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
              {label}
            </YellowButton>
          ))}
        </Styled.HeaderRightPanel>
      </Styled.ActionWrapper>
    </Styled.HeaderContainer>
  </div>
);

const MobileSearchInput = styled(SearchInput)`
  display: none;
  ${Media.phone`
    display: flex;
    margin: 20px 0 0;
  `};
`;

const options = {
  left: [{ label: 'New Order', href: '/order' }],
  right: [
    { label: 'Edit Profile', href: '/profile' },
    { label: 'Log Out', onClick: AuthRequest.signOut },
    { label: 'Support', href: '/support' },
  ],
};

Header.propTypes = {
  children: PropTypes.any,
  onSearch: PropTypes.func,
  value: PropTypes.string,
};

export default Header;
