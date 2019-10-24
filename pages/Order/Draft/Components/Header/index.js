import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import NoSSR from 'react-no-ssr';
import styled from 'styled-components';

import { DivRow, DivColumn, YellowButton, MobileNav } from '~/components';
import { AuthRequest } from '~/utils/services';
import { pushRoute } from '~/utils/utils';
import { Media } from '~/utils/constants';

import * as Styled from '../../../Download/Components/Header';

const Header = ({ order, user }) => {
  const startTime = moment(order.startTime);
  const dateString = startTime.format('HHmm - dddd DD MMMM YYYY');

  options.left[1] = { ...options.left[1], href: `/order/${order.id}` };

  return (
    <div>
      <MobileNav menus={[...options.left, ...options.right]} />

      <Styled.HeaderContainer>
        <Styled.TitleWrapper>
          <Styled.HeaderTitle>Draft Images</Styled.HeaderTitle>

          <Styled.SubHeaderContainer>
            <Styled.SubHeader>Order #</Styled.SubHeader>
            <Styled.SubHeader style={{ marginLeft: 40 }}>{order.case}</Styled.SubHeader>
          </Styled.SubHeaderContainer>

          <NoSSR>
            <Styled.SubHeader style={{ fontSize: 16 }}>{dateString}</Styled.SubHeader>
          </NoSSR>

          <Styled.SubHeaderContainer>
            <Styled.SubHeader>Address</Styled.SubHeader>
            <Styled.SubGreyHeader style={{ marginLeft: 30 }}>{order.address}</Styled.SubGreyHeader>
          </Styled.SubHeaderContainer>

          {order.product.indexOf('Photography') > -1 && (
            <Styled.SubHeaderContainer>
              <Styled.SubHeader>Photos</Styled.SubHeader>
              <Styled.SubGreyHeader style={{ marginLeft: 35 }}>
                {order.photographerToBeTaken.type === 0 ? 'PhotographersChoice' : 'SpecificPhotographers'}
              </Styled.SubGreyHeader>
            </Styled.SubHeaderContainer>
          )}
        </Styled.TitleWrapper>

        <Styled.ActionWrapper>
          <Styled.HeaderLeftPanel>
            {options.left.map(({ label, ...props }) => (
              <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
                {label}
              </YellowButton>
            ))}
          </Styled.HeaderLeftPanel>

          <Styled.HeaderRightPanel>
            <Styled.Avatar src={user.avatarLink} />
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

const options = {
  left: [{ label: 'Home', href: '/home' }, { label: 'Edit Order' }, { label: 'New Order', href: '/order' }],
  right: [{ label: 'Log Out', onClick: AuthRequest.signOut }, { label: 'Support', href: '/support' }],
};

Header.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
};

export default Header;
