import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NoSSR from 'react-no-ssr';

import { YellowButton, DivRow, MobileNav } from '~/components';
import { pushRoute } from '~/utils/utils';
import { AuthRequest } from '~/utils/services';
import { Media } from '~/utils/constants';
import * as Styled from '../../../Download/Components/Header';

const Header = ({ order, user, navigatePossible }) => {
  const startTime = moment(order.startTime);
  const dateString = startTime.format('HHmm - dddd DD MMMM YYYY');

  options.left[0].isHidden = !navigatePossible;
  options.right[0].isHidden = !navigatePossible;

  return (
    <div>
      <MobileNav menus={[...options.left, ...options.right]} />

      <Styled.HeaderContainer>
        <Styled.TitleWrapper>
          <Styled.HeaderTitle>Review Order</Styled.HeaderTitle>

          <Styled.SubHeaderContainer>
            <Styled.SubHeader>Order #</Styled.SubHeader>
            <Styled.SubHeader style={{ marginLeft: 40 }}>{order.case}</Styled.SubHeader>
          </Styled.SubHeaderContainer>

          <NoSSR>
            <Styled.SubHeader style={{ fontSize: 16 }}>{dateString}</Styled.SubHeader>
          </NoSSR>
        </Styled.TitleWrapper>

        <Styled.ActionWrapper>
          <Styled.HeaderLeftPanel>
            {options.left.map(
              ({ label, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
                    {label}
                  </YellowButton>
                ),
            )}
          </Styled.HeaderLeftPanel>

          <Styled.HeaderRightPanel>
            <Styled.Avatar src={user.avatarLink} />
            {options.right.map(
              ({ label, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
                    {label}
                  </YellowButton>
                ),
            )}
          </Styled.HeaderRightPanel>
        </Styled.ActionWrapper>
      </Styled.HeaderContainer>
    </div>
  );
};

const options = {
  left: [{ label: 'New Order', href: '/order' }],
  right: [
    { label: 'Home', href: '/home' },
    { label: 'Log Out', onClick: AuthRequest.signOut },
    { label: 'Support', href: '/support' },
  ],
};

Header.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  navigatePossible: PropTypes.bool,
};

export default Header;
