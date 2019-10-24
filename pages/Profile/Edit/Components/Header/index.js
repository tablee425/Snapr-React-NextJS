import React from 'react';
import PropTypes from 'prop-types';

import { YellowButton, MobileNav } from '~/components';
import { pushRoute } from '~/utils/utils';
import { AuthRequest } from '~/utils/services';
import { Media } from '~/utils/constants';
import * as Styled from '../../../../Order/Download/Components/Header/index';

const Header = ({ onDeleteAccount, onDownloadData, isDownloading, isDeleting }) => {
  options.left[1] = { ...options.left[1], loading: isDownloading, onClick: onDownloadData };
  options.left[2] = { ...options.left[2], loading: isDeleting, onClick: onDeleteAccount };
  return (
    <div>
      <MobileNav menus={[...options.left, ...options.right]} />

      <Styled.HeaderContainer>
        <Styled.TitleWrapper>
          <HeaderTitle>Edit Profile</HeaderTitle>
        </Styled.TitleWrapper>

        <Styled.ActionWrapper>
          <Styled.HeaderLeftPanel>
            {options.left.map(({ label, loading, ...props }) => (
              <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)} loading={loading}>
                {label}
              </YellowButton>
            ))}
          </Styled.HeaderLeftPanel>

          <Styled.HeaderRightPanel>
            {options.right.map(({ label, ...props }) => (
              <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
                {label}
              </YellowButton>
            ))}
          </Styled.HeaderRightPanel>
        </Styled.ActionWrapper>
      </Styled.HeaderContainer>
    </div>
  );
};

const HeaderTitle = Styled.HeaderTitle.extend`
  ${Media.tablet`
    margin-bottom: 30px;
  `}
  ${Media.phone`
    margin-bottom: 10px;
  `}
`;

const options = {
  left: [{ label: 'New Order', href: '/order' }, { label: 'Download Data' }, { label: 'Delete Account' }],
  right: [
    { label: 'Home', href: '/home' },
    { label: 'Log Out', onClick: AuthRequest.signOut },
    { label: 'Support', href: '/support' },
  ],
};

Header.propTypes = {
  onDeleteAccount: PropTypes.func,
  onDownloadData: PropTypes.func,
  isDownloading: PropTypes.bool,
  isDeleting: PropTypes.bool,
};

export default Header;
